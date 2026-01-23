import type { Plugin } from 'vite';
import { getSchemaForRoute } from './src/worker/schema';
import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

/**
 * Vite plugin to generate separate HTML files for each route with route-specific Schema
 */
export function multiPageSchemaPlugin(): Plugin {
  const routes = [
    '/',
    '/agentic-pay',
    '/about',
    '/cooperation',
    '/blogs',
  ];

  return {
    name: 'vite-plugin-multi-page-schema',

    closeBundle() {
      // After the build is complete, generate route-specific HTML files
      const distDir = join(process.cwd(), 'dist/client');
      const indexHtmlPath = join(distDir, 'index.html');

      // Read the built index.html
      const indexHtml = readFileSync(indexHtmlPath, 'utf-8');

      // Generate HTML for each route
      routes.forEach((route) => {
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
        const modifiedHtml = indexHtml.replace(
          /<!-- Schema\.org structured data \(common schemas injected at build time\) -->[\s\S]*?(?=<script type="module")/,
          `<!-- Schema.org structured data (route: ${route}) -->\n    ${schemaScripts}\n    `
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
        writeFileSync(outputPath, modifiedHtml, 'utf-8');
        console.log(`✓ Generated ${outputPath} with route-specific Schema`);
      });
    },
  };
}
