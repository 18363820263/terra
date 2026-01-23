import type { Plugin } from 'vite';
import { generateOrganizationSchema, generateWebSiteSchema } from './src/worker/schema';

/**
 * Vite plugin to inject common Schema.org structured data into HTML at build time
 * Injects Organization and WebSite schemas that are common to all pages
 */
export function schemaInjectionPlugin(): Plugin {
  return {
    name: 'vite-plugin-schema-injection',
    transformIndexHtml(html) {
      // Generate common schemas that apply to all pages
      const language = 'en-US';
      const schemas = [
        generateOrganizationSchema(language),
        generateWebSiteSchema(language),
      ];

      // Create JSON-LD script tags
      const schemaScripts = schemas
        .map(
          (schema) =>
            `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`
        )
        .join('\n    ');

      // Inject Schema into the <head> section, replacing the comment
      const modifiedHtml = html.replace(
        '<!-- Schema.org structured data will be injected here by Cloudflare Worker -->',
        `<!-- Schema.org structured data (common schemas injected at build time) -->\n    ${schemaScripts}`
      );

      return modifiedHtml;
    },
  };
}
