/**
 * Organization Schema generator
 * Creates Schema.org Organization markup for the company
 */

import type { Organization, Language } from '../types';
import { ORGANIZATION_DATA } from '../data/organization';

export function generateOrganizationSchema(language: Language): Organization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORGANIZATION_DATA.name,
    legalName: ORGANIZATION_DATA.legalName,
    url: ORGANIZATION_DATA.url,
    logo: ORGANIZATION_DATA.logo,
    email: ORGANIZATION_DATA.email.business,
    inLanguage: language,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Business Inquiries',
        email: ORGANIZATION_DATA.email.business,
        availableLanguage: ['en', 'zh', 'es'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        email: ORGANIZATION_DATA.email.support,
        availableLanguage: ['en', 'zh', 'es'],
      },
    ],
    areaServed: ORGANIZATION_DATA.offices.map(office => office.countryName),
  };
}
