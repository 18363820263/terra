/**
 * Schema.org structured data utilities
 * Central export point for all Schema generators
 */

export * from './types';
export * from './data/organization';

// Generator exports will be added as they are created
export { generateOrganizationSchema } from './generators/organization';
export { generateWebSiteSchema } from './generators/website';
export { generateServiceSchema } from './generators/service';
export { generateContactPageSchema } from './generators/contactPage';
export { generateProductSchema } from './generators/product';
export { generateBreadcrumbSchema } from './generators/breadcrumb';
export { generateFAQSchema } from './generators/faq';

/**
 * Helper function to create a JSON-LD script tag content
 */
export function createSchemaScript(schema: object): string {
  return JSON.stringify(schema, null, 2);
}

/**
 * Helper function to validate Schema.org context
 */
export function addSchemaContext<T extends { '@type': string }>(
  schema: T
): T & { '@context': string } {
  return {
    '@context': 'https://schema.org',
    ...schema,
  };
}
