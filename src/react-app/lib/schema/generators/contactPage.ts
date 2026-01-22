/**
 * ContactPage Schema generator
 * Creates Schema.org ContactPage markup
 */

import type { ContactPage, Language } from '../types';
import { ORGANIZATION_DATA } from '../data/organization';
import { generateOrganizationSchema } from './organization';

export function generateContactPageSchema(language: Language): ContactPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Us',
    url: `${ORGANIZATION_DATA.url}/cooperation`,
    inLanguage: language,
    mainEntity: generateOrganizationSchema(language),
  };
}
