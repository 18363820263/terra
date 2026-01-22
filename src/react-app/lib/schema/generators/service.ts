/**
 * Service Schema generator
 * Creates Schema.org Service markup for payment services
 */

import type { Service, Language } from '../types';
import { ORGANIZATION_DATA } from '../data/organization';
import { generateOrganizationSchema } from './organization';

interface ServiceOptions {
  name: string;
  description: string;
  serviceType?: string;
}

export function generateServiceSchema(
  options: ServiceOptions,
  language: Language
): Service {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: options.name,
    description: options.description,
    serviceType: options.serviceType || 'Financial Service',
    provider: generateOrganizationSchema(language),
    areaServed: ORGANIZATION_DATA.offices.map(office => office.countryName),
    inLanguage: language,
  };
}
