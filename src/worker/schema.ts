/**
 * Server-side Schema.org generator for Cloudflare Worker
 * Pure functions without React dependencies
 */

const ORGANIZATION_DATA = {
  name: 'TerraPay',
  legalName: 'TerryPay',
  url: 'https://terrazipay.com',
  logo: 'https://terrazipay.com/logo.png',
  email: {
    business: 'payoffice@starbit.net.cn',
    support: 'support@starbit.net.cn',
  },
  offices: [
    { country: 'Hong Kong', countryName: 'Hong Kong' },
    { country: 'US', countryName: 'United States' },
    { country: 'MY', countryName: 'Malaysia' },
    { country: 'MX', countryName: 'Mexico' },
  ],
};

export function generateOrganizationSchema(language: string) {
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

export function generateWebSiteSchema(language: string) {
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

export function generateServiceSchema(language: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Cross-border Stablecoin Payment Services',
    description: 'Fast, secure and compliant end-to-end payment platform based on stablecoins such as USDT and USDC.',
    serviceType: 'Payment Processing',
    provider: generateOrganizationSchema(language),
    areaServed: ORGANIZATION_DATA.offices.map(office => office.countryName),
    inLanguage: language,
  };
}

export function generateProductSchema(language: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Agentic Pay',
    description: 'The payment layer for AI agents. Supporting instant stablecoin settlement, atomic ledgers, and full-chain traceability.',
    brand: generateOrganizationSchema(language),
    category: 'Financial Technology - AI Payments',
    url: `${ORGANIZATION_DATA.url}/agentic-pay`,
    inLanguage: language,
  };
}

export function generateContactPageSchema(language: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Us',
    url: `${ORGANIZATION_DATA.url}/cooperation`,
    inLanguage: language,
    mainEntity: generateOrganizationSchema(language),
  };
}

export function getSchemaForRoute(path: string, language: string = 'en-US'): object[] {
  const schemas: object[] = [
    generateOrganizationSchema(language),
    generateWebSiteSchema(language),
  ];

  // Add route-specific schemas
  if (path === '/' || path === '') {
    schemas.push(generateServiceSchema(language));
  } else if (path.startsWith('/agentic-pay')) {
    schemas.push(generateProductSchema(language));
  } else if (path.startsWith('/cooperation')) {
    schemas.push(generateContactPageSchema(language));
  }

  return schemas;
}
