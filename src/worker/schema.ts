/**
 * Server-side Schema.org generator for Cloudflare Worker
 * Pure functions without React dependencies
 * All descriptions use HTML formatting for better Google search display
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
    logo: {
      '@type': 'ImageObject',
      url: ORGANIZATION_DATA.logo,
    },
    description: '<p>TerraPay is a leading <strong>cross-border stablecoin payment service provider</strong>, offering fast, secure, and compliant end-to-end payment solutions based on <strong>USDT</strong> and <strong>USDC</strong> stablecoins.</p>',
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
    alternateName: 'TerraZip',
    url: ORGANIZATION_DATA.url,
    description: '<p>Global <strong>stablecoin payment platform</strong> providing instant settlement, low fees, and 24/7 cross-border transactions for businesses worldwide.</p>',
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
    description: '<p>Fast, secure and compliant <strong>end-to-end payment platform</strong> based on stablecoins such as <strong>USDT</strong> and <strong>USDC</strong>.</p><ul><li>Instant settlement in seconds</li><li>Support for 50+ countries and regions</li><li>30+ currencies supported</li><li>20+ payment methods</li><li>99.9% system uptime</li></ul>',
    serviceType: 'Payment Processing',
    provider: generateOrganizationSchema(language),
    areaServed: ORGANIZATION_DATA.offices.map(office => office.countryName),
    inLanguage: language,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function generateProductSchema(language: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Agentic Pay',
    description: '<p>The <strong>payment layer for AI agents</strong>. Supporting instant stablecoin settlement, atomic ledgers, and full-chain traceability, providing a trusted transaction foundation for global AI agents.</p><h3>Key Features:</h3><ul><li><strong>KYA (Know Your Agent)</strong>: Identity verification and reputation system for AI agents</li><li><strong>Instant Settlement</strong>: Real-time stablecoin payments with blockchain confirmation</li><li><strong>Atomic Ledger</strong>: Guaranteed transaction atomicity for complex multi-party settlements</li><li><strong>Pay-as-you-go Pricing</strong>: Micro-transaction support with usage-based billing</li></ul>',
    brand: generateOrganizationSchema(language),
    category: 'Financial Technology - AI Payments',
    url: `${ORGANIZATION_DATA.url}/agentic-pay`,
    image: {
      '@type': 'ImageObject',
      url: ORGANIZATION_DATA.logo,
    },
    inLanguage: language,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/PreOrder',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function generateContactPageSchema(language: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Us - TerraPay',
    description: '<p>Get in touch with TerraPay for <strong>business cooperation</strong>, <strong>technical support</strong>, or partnership opportunities. We provide 24/7 customer service and respond within 2 hours.</p>',
    url: `${ORGANIZATION_DATA.url}/cooperation`,
    inLanguage: language,
    mainEntity: generateOrganizationSchema(language),
  };
}

export function generateAboutPageSchema(language: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About TerraPay',
    description: '<p>TerraPay, headquartered in <strong>Hong Kong</strong>, is a fintech company positioned with <strong>stablecoin payment solutions</strong>. We focus on providing next-generation cross-border payment and salary payment solutions based on stablecoins for merchants worldwide.</p><h3>Our Mission:</h3><p>Through blockchain technology, break the barriers of cross-border payments, providing faster, cheaper, and more transparent payment settlement services than traditional financial systems.</p>',
    url: `${ORGANIZATION_DATA.url}/about`,
    inLanguage: language,
    mainEntity: generateOrganizationSchema(language),
  };
}

export function generateBlogPageSchema(language: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'TerraPay Blog - Insights & Updates',
    description: '<p>Stay informed with the latest trends in <strong>stablecoin payments</strong>, <strong>blockchain technology</strong>, and the <strong>AI agent economy</strong>. Expert insights and industry updates from TerraPay.</p>',
    url: `${ORGANIZATION_DATA.url}/blogs`,
    inLanguage: language,
    publisher: generateOrganizationSchema(language),
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
  } else if (path.startsWith('/about')) {
    schemas.push(generateAboutPageSchema(language));
  } else if (path.startsWith('/blogs')) {
    schemas.push(generateBlogPageSchema(language));
  }

  return schemas;
}
