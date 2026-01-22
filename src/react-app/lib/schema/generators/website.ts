/**
 * WebSite Schema generator
 * Creates Schema.org WebSite markup with SearchAction
 */

import type { WebSite, Language } from '../types';
import { ORGANIZATION_DATA } from '../data/organization';

export function generateWebSiteSchema(language: Language): WebSite {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ORGANIZATION_DATA.name,
    url: ORGANIZATION_DATA.url,
    inLanguage: language,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${ORGANIZATION_DATA.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
