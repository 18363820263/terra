/**
 * SSR rendering script executed after Vite build completes.
 * Uses Vite's build API to create an SSR bundle, then uses it to render.
 */

import { getSchemaForRoute } from '../src/worker/schema';
import { BLOG_ARTICLES } from '../src/react-app/lib/blog/articles';
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const baseRoutes = [
  '/',
  '/agentic-pay',
  '/about',
  '/cooperation',
  '/blogs',
  '/cases',
];

// Blog article detail routes: /blogs/:slug
const blogArticleRoutes = BLOG_ARTICLES.map((article) => `/blogs/${article.slug}`);

const routes = [...baseRoutes, ...blogArticleRoutes];

async function main() {
  console.log('🚀 Starting SSR rendering...');
  const distDir = join(process.cwd(), 'dist/client');
  const indexHtmlPath = join(distDir, 'index.html');

  if (!existsSync(indexHtmlPath)) {
    console.log('⏭️  Skipping SSR - index.html not found');
    return;
  }

  const ssrDistDir = join(process.cwd(), 'dist/ssr');
  const ssrEntryPath = join(ssrDistDir, 'entry-server.js');
  
  const rootDir = process.cwd();
  const ssrEntryInput = join(rootDir, 'src/react-app/entry-server.tsx');

  // Always (re)build SSR bundle so routes and components stay in sync
  console.log('📦 Building SSR bundle...');
  mkdirSync(ssrDistDir, { recursive: true });

  // Avoid infinite recursion: when we call Vite.build() here, the same
  // multiPageSchemaPlugin will run again. We set SKIP_SSR=1 so that
  // the plugin does NOT spawn this SSR script recursively.
  const prevSkipSSR = process.env.SKIP_SSR;
  process.env.SKIP_SSR = '1';
  try {
    await build({
      root: rootDir,
      build: {
        ssr: true,
        outDir: ssrDistDir,
        emptyOutDir: true,
        rollupOptions: {
          input: ssrEntryInput,
        },
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': join(rootDir, 'src/react-app'),
        },
      },
      ssr: {
        noExternal: [
          'react',
          'react-dom',
          'react-router-dom',
          '@tanstack/react-query',
          'react-hook-form',
          'sonner',
          '@hookform/resolvers',
        ],
        optimizeDeps: {
          include: ['react', 'react-dom', 'react-router-dom'],
        },
      },
      assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif', '**/*.webp'],
    });
  } finally {
    if (prevSkipSSR === undefined) {
      delete process.env.SKIP_SSR;
    } else {
      process.env.SKIP_SSR = prevSkipSSR;
    }
  }

  console.log('✅ SSR bundle built successfully');

  try {
    
    // Load the built SSR module
    // Convert to file:// URL for ESM import (required on Windows)
    const ssrEntryUrl = pathToFileURL(ssrEntryPath).href;
    console.log(`📥 Loading SSR module from ${ssrEntryPath}...`);
    const { render } = await import(ssrEntryUrl);
    console.log('✅ SSR module loaded');

    let successCount = 0;
    let failCount = 0;
    
    for (const route of routes) {
      try {
        console.log(`🎨 Rendering route: ${route}`);
        const language = 'en-US';

        // Read fresh indexHtml for each route to avoid template pollution
        const indexHtml = readFileSync(indexHtmlPath, 'utf-8');

        // If this is a blog detail route, attach article info so we can generate BlogPosting schema
        let articleForRoute:
          | {
              title: string;
              description: string;
              content: string;
              author: string;
              publishedAt: string;
              updatedAt?: string;
              tags: string[];
              coverImage?: string;
              slug: string;
            }
          | undefined;

        if (route.startsWith('/blogs/')) {
          const slug = route.replace('/blogs/', '');
          const found = BLOG_ARTICLES.find((a) => a.slug === slug);
          if (found) {
            articleForRoute = {
              title: found.title,
              description: found.description,
              content: found.content,
              author: found.author,
              publishedAt: found.publishedAt,
              updatedAt: found.updatedAt,
              tags: found.tags,
              coverImage: found.coverImage,
              slug: found.slug,
            };
          }
        }

        const schemas = getSchemaForRoute(route, language, articleForRoute);

        // Create JSON-LD script tags
        const schemaScripts = schemas
          .map(
            (schema) =>
              `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`
          )
          .join('\n    ');

        // Replace the build-time injected schemas with route-specific schemas
        // Try multiple patterns to handle different build states
        let htmlWithSchemas = indexHtml.replace(
          /<!-- Schema\.org structured data \(route: [^)]*\) -->[\s\S]*?(?=<script type="module")/,
          `<!-- Schema.org structured data (route: ${route}) -->\n    ${schemaScripts}\n    `
        );
        // Fallback: if no route-specific schema found, try common schema pattern
        if (htmlWithSchemas === indexHtml) {
          htmlWithSchemas = indexHtml.replace(
            /<!-- Schema\.org structured data \(common schemas injected at build time\) -->[\s\S]*?(?=<script type="module")/,
            `<!-- Schema.org structured data (route: ${route}) -->\n    ${schemaScripts}\n    `
          );
        }
        
        // Server-side render the React app for this route
        console.log(`  → Calling render function for ${route}...`);
        const appHtml = render(route);
        console.log(`  → Render completed, HTML length: ${appHtml?.length || 0}`);
        // Debug: check if SSR returned correct content for /cases
        if (route === '/cases') {
          const hasCasesContent = appHtml.includes('Success Stories') && 
                                  (appHtml.includes('case-avatar') || appHtml.includes('shangwu'));
          if (!hasCasesContent) {
            console.warn(`  ⚠️  SSR for /cases may have returned wrong content (contains homepage instead)`);
            console.warn(`  → First 200 chars: ${appHtml.substring(0, 200)}`);
          }
        }
        
        // If SSR returned empty string, log warning but don't skip - use fallback HTML
        if (!appHtml || appHtml.trim().length === 0) {
          console.warn(`⚠️  SSR returned empty HTML for ${route}, this route will use static fallback`);
          throw new Error(`SSR returned empty HTML for ${route}`);
        }
        
        // Replace #root content - handle both empty and populated root divs
        let finalHtml: string;
        if (htmlWithSchemas.includes('<div id="root"></div>')) {
          // Empty root div
          finalHtml = htmlWithSchemas.replace(
            '<div id="root"></div>',
            `<div id="root">${appHtml}</div>`
          );
        } else {
          // Root div already has content (from previous route processing) - replace entire content
          // Find the root div start and end positions more reliably by counting div tags
          const rootStart = htmlWithSchemas.indexOf('<div id="root">');
          if (rootStart === -1) {
            console.warn(`⚠️  Could not find <div id="root"> in HTML for route ${route}`);
            finalHtml = htmlWithSchemas;
          } else {
            // Find the matching closing </div> by counting div tags
            let depth = 0;
            let pos = rootStart + '<div id="root">'.length;
            let rootEnd = -1;
            
            while (pos < htmlWithSchemas.length) {
              if (htmlWithSchemas.substring(pos, pos + 4) === '<div') {
                depth++;
                pos = htmlWithSchemas.indexOf('>', pos) + 1;
              } else if (htmlWithSchemas.substring(pos, pos + 6) === '</div>') {
                if (depth === 0) {
                  rootEnd = pos + 6;
                  break;
                }
                depth--;
                pos += 6;
              } else {
                pos++;
              }
            }
            
            if (rootEnd === -1) {
              // Fallback: if we can't find the matching closing tag, replace up to </body>
              const bodyIndex = htmlWithSchemas.indexOf('</body>');
              if (bodyIndex !== -1) {
                rootEnd = bodyIndex;
              } else {
                console.warn(`⚠️  Could not find matching </div> for <div id="root"> in route ${route}`);
                finalHtml = htmlWithSchemas;
              }
            }
            
            if (rootEnd !== -1) {
              finalHtml = htmlWithSchemas.substring(0, rootStart) + 
                          `<div id="root">${appHtml}</div>` + 
                          htmlWithSchemas.substring(rootEnd);
            } else {
              finalHtml = htmlWithSchemas;
            }
          }
          
          // Verify replacement was successful
          if (route === '/cases' && !finalHtml.includes(appHtml.substring(0, 100))) {
            console.warn(`⚠️  Root div replacement verification failed for route ${route}`);
          }
        }

        // Determine output path
        let outputPath: string;
        if (route === '/') {
          outputPath = indexHtmlPath; // Overwrite the main index.html
        } else {
          // Create directory for the route
          const routeDir = join(distDir, route);
          mkdirSync(routeDir, { recursive: true });
          outputPath = join(routeDir, 'index.html');
        }

        // For non-root routes: inject build timestamp so wrangler sees changed content and uploads (fixes "No updated asset files")
        const htmlToWrite =
          route === '/'
            ? finalHtml
            : finalHtml.replace('</html>', `\n<!-- build:${new Date().toISOString()} -->\n</html>`);
        writeFileSync(outputPath, htmlToWrite, 'utf-8');
        console.log(`✓ Generated ${outputPath} with route-specific Schema and SSR HTML`);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to render route ${route}:`, error);
        if (error instanceof Error) {
          console.error(`   Error: ${error.message}`);
        }
        failCount++;
        // Continue with other routes even if one fails
      }
    }
    
    console.log(`\n📊 SSR Summary: ${successCount} routes succeeded, ${failCount} routes failed`);
    
    if (failCount > 0) {
      console.warn(`⚠️  Some routes failed SSR rendering. Failed routes will use static HTML fallback.`);
    }

    // Ensure route-specific index.html files exist for Worker/Pages (SEO + "View Source")
    const subRoutes = ['/about', '/cooperation', '/agentic-pay', '/blogs', '/cases'];
    const missing = subRoutes.filter((r) => !existsSync(join(distDir, r.slice(1), 'index.html')));
    if (missing.length > 0) {
      console.error(`❌ Missing route HTML for deploy: ${missing.join(', ')}`);
      process.exit(1);
    }
    
    console.log('✅ SSR rendering completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ SSR build/rendering failed:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    // Exit with error code to trigger fallback in plugin
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('❌ SSR rendering failed:', err);
  if (err instanceof Error) {
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
  }
  // Exit with error code to trigger fallback in plugin
  process.exit(1);
});
