/**
 * SSR rendering script executed after Vite build completes.
 * Uses Vite's build API to create an SSR bundle, then uses it to render.
 */

import { getSchemaForRoute } from '../src/worker/schema';
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const routes = [
  '/',
  '/agentic-pay',
  '/about',
  '/cooperation',
  '/blogs',
];

async function main() {
  console.log('🚀 Starting SSR rendering...');
  const distDir = join(process.cwd(), 'dist/client');
  const indexHtmlPath = join(distDir, 'index.html');

  if (!existsSync(indexHtmlPath)) {
    console.log('⏭️  Skipping SSR - index.html not found');
    return;
  }

  // Check if SSR bundle already exists (built by Vite)
  const ssrDistDir = join(process.cwd(), 'dist/ssr');
  const ssrEntryPath = join(ssrDistDir, 'entry-server.js');
  
  const rootDir = process.cwd();
  const ssrEntryInput = join(rootDir, 'src/react-app/entry-server.tsx');

  // Only build SSR bundle if it doesn't exist
  if (!existsSync(ssrEntryPath)) {
    console.log('📦 SSR bundle not found, building...');
    mkdirSync(ssrDistDir, { recursive: true });

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

    console.log('✅ SSR bundle built successfully');
  } else {
    console.log('✅ Using existing SSR bundle');
  }

  try {
    
    // Load the built SSR module
    // Convert to file:// URL for ESM import (required on Windows)
    const ssrEntryUrl = pathToFileURL(ssrEntryPath).href;
    console.log(`📥 Loading SSR module from ${ssrEntryPath}...`);
    const { render } = await import(ssrEntryUrl);
    console.log('✅ SSR module loaded');

    const indexHtml = readFileSync(indexHtmlPath, 'utf-8');

    let successCount = 0;
    let failCount = 0;
    
    for (const route of routes) {
      try {
        console.log(`🎨 Rendering route: ${route}`);
        const language = 'en-US';
        const schemas = getSchemaForRoute(route, language);

        // Create JSON-LD script tags
        const schemaScripts = schemas
          .map(
            (schema) =>
              `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`
          )
          .join('\n    ');

        // Replace the build-time injected schemas with route-specific schemas
        let htmlWithSchemas = indexHtml.replace(
          /<!-- Schema\.org structured data \(common schemas injected at build time\) -->[\s\S]*?(?=<script type="module")/,
          `<!-- Schema.org structured data (route: ${route}) -->\n    ${schemaScripts}\n    `
        );

        // Server-side render the React app for this route
        console.log(`  → Calling render function for ${route}...`);
        const appHtml = render(route);
        console.log(`  → Render completed, HTML length: ${appHtml?.length || 0}`);
        
        // If SSR returned empty string, log warning but don't skip - use fallback HTML
        if (!appHtml || appHtml.trim().length === 0) {
          console.warn(`⚠️  SSR returned empty HTML for ${route}, this route will use static fallback`);
          throw new Error(`SSR returned empty HTML for ${route}`);
        }
        
        const finalHtml = htmlWithSchemas.replace(
          '<div id="root"></div>',
          `<div id="root">${appHtml}</div>`
        );

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

        // Write the modified HTML
        writeFileSync(outputPath, finalHtml, 'utf-8');
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
    
    // Exit with success code even if some routes failed (fallback will handle it)
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
