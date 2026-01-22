/**
 * Product Schema generator
 * Creates Schema.org Product markup
 */

import type { Product, Language } from '../types';
import { ORGANIZATION_DATA } from '../data/organization';
import { generateOrganizationSchema } from './organization';

interface ProductOptions {
  name: string;
  description: string;
  category?: string;
  url?: string;
}

export function generateProductSchema(
  options: ProductOptions,
  language: Language
): Product {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: options.name,
    description: options.description,
    brand: generateOrganizationSchema(language),
    category: options.category || 'Financial Technology',
    url: options.url || ORGANIZATION_DATA.url,
    inLanguage: language,
  };
}
