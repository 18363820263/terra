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
    description: `<p>Fast, secure and compliant <strong>end-to-end payment platform</strong> based on stablecoins such as <strong>USDT</strong> and <strong>USDC</strong>.</p>

<h3>Global Coverage</h3>
<ul>
<li>Support for <strong>50+ countries and regions</strong></li>
<li><strong>30+ currencies</strong> supported</li>
<li><strong>20+ payment methods</strong></li>
<li><strong>99.9% system uptime</strong></li>
<li>No geographical restrictions, globally accessible</li>
<li>Real-time exchange rate conversion for multiple currencies</li>
<li>Localized payment experience</li>
</ul>

<h3>Security & Compliance</h3>
<ul>
<li><strong>KYT Implementation</strong>: Real-time transaction monitoring and risk identification</li>
<li><strong>End-to-end encryption</strong>: AES-256 military-grade encryption for data transmission protection</li>
<li><strong>Multi-signature</strong>: Multi-level private key authorization mechanism to prevent single point of failure and internal risks</li>
<li><strong>ISO 27001</strong>: International Information Security Management System Certification</li>
<li><strong>Cold-Hot Storage Separation</strong>: 95% of funds stored in cold storage accounts, 5% in hot wallet accounts</li>
</ul>

<h3>Fast Settlement</h3>
<ul>
<li>Based on blockchain technology, providing stablecoin payment secondary confirmation services</li>
<li><strong>User payment</strong>: Block secondary confirmation</li>
<li><strong>Merchant settlement</strong>: T+1 working day to account</li>
<li><strong>24/7 uninterrupted service</strong></li>
<li>Instant settlement in seconds, not days</li>
</ul>

<h3>Product Ecosystem</h3>
<ul>
<li><strong>Settlement System</strong>: Stablecoin Payment Settlement - Provide convenient stablecoin payment solutions for merchants</li>
<li><strong>AI Agent Payment</strong>: Agent-as-a-Service Platform - Plug-and-play payment modules for developers</li>
</ul>`,
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
    description: `<p>Get in touch with TerraPay for <strong>business cooperation</strong>, <strong>technical support</strong>, or partnership opportunities.</p>

<h3>Response Time</h3>
<ul>
<li><strong>Response within 2 hours</strong></li>
<li>Customer Service Manager will respond to your inquiry</li>
<li><strong>7×24 hours online support</strong></li>
</ul>

<h3>Contact Information</h3>
<ul>
<li><strong>Business Cooperation</strong>: ${ORGANIZATION_DATA.email.business}</li>
<li><strong>Technical Support</strong>: ${ORGANIZATION_DATA.email.support}</li>
</ul>

<h3>Quick Access</h3>
<ul>
<li>Merchant Onboarding</li>
<li>API Documentation</li>
<li>Partnership Opportunities</li>
</ul>

<h3>Application Process</h3>
<p>Please fill in your real situation in the application form. We will contact you as soon as possible after receiving your application. Our team will help you:</p>
<ul>
<li>Understand your business requirements</li>
<li>Provide customized payment solutions</li>
<li>Guide you through the integration process</li>
<li>Offer ongoing technical support</li>
</ul>`,
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
    description: `<p>TerraPay, headquartered in <strong>Hong Kong</strong>, is a fintech company positioned with <strong>stablecoin payment solutions</strong>. We focus on providing next-generation cross-border payment and salary payment solutions based on stablecoins for merchants worldwide.</p>

<h3>What is TerraPay?</h3>
<p>We are targeting the trillion-dollar global cross-border B2B payment market and all future on-chain enterprise financial services. TerraPay provides enterprise-grade stablecoin payment infrastructure to help businesses leverage blockchain technology.</p>

<h3>Blockchain Network Support</h3>
<p>You can choose mainstream blockchain networks to receive stablecoins according to your needs. Currently supporting:</p>
<ul>
<li><strong>Ethereum (ETH)</strong></li>
<li><strong>TRON</strong></li>
<li><strong>BNB Chain (BSC)</strong></li>
<li><strong>Solana</strong></li>
<li><strong>Polygon</strong></li>
<li><strong>Arbitrum</strong></li>
</ul>

<h3>Transaction Scale</h3>
<p>TerraPay has provided cross-border settlement services in emerging markets for global enterprise users. The platform's annual transaction volume has <strong>exceeded 1 billion</strong>, and it has been maintaining a steady upward trend.</p>

<h3>Core Values</h3>
<ul>
<li><strong>Innovation</strong>: Continuously explore the boundaries of blockchain technology</li>
<li><strong>Passion</strong>: Dedicated to transforming global payments</li>
<li><strong>Professionalism</strong>: Expert team with deep industry knowledge</li>
<li><strong>Integrity</strong>: Transparent and trustworthy operations</li>
<li><strong>Enterprise</strong>: Building the future of digital finance</li>
</ul>

<h3>Our Mission</h3>
<p>Through blockchain technology, break the barriers of cross-border payments, providing <strong>faster</strong>, <strong>cheaper</strong>, and more <strong>transparent</strong> payment settlement services than traditional financial systems.</p>

<h3>Global Offices</h3>
<ul>
<li><strong>Hong Kong Headquarters</strong>: International Finance Centre, Central</li>
<li><strong>USA Branch</strong>: New York, United States</li>
<li><strong>Malaysia Branch</strong>: Kuala Lumpur, Malaysia</li>
<li><strong>Mexico Branch</strong>: Mexico City, Mexico</li>
</ul>`,
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
