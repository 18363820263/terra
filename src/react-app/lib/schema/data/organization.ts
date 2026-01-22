/**
 * Centralized organization data for Schema.org markup
 * Single source of truth for company information
 */

export const ORGANIZATION_DATA = {
  name: 'TerraPay',
  legalName: 'TerryPay',
  url: 'https://terrazipay.com',
  logo: 'https://terrazipay.com/logo.png',

  email: {
    business: 'payoffice@starbit.net.cn',
    support: 'support@starbit.net.cn',
  },

  offices: [
    {
      type: 'headquarters' as const,
      country: 'HK',
      countryName: 'Hong Kong',
      city: 'Hong Kong',
    },
    {
      type: 'branch' as const,
      country: 'US',
      countryName: 'United States',
      city: 'United States',
    },
    {
      type: 'branch' as const,
      country: 'MY',
      countryName: 'Malaysia',
      city: 'Malaysia',
    },
    {
      type: 'branch' as const,
      country: 'MX',
      countryName: 'Mexico',
      city: 'Mexico',
    },
  ],

  services: {
    coverage: '50+',
    currencies: '30+',
    paymentMethods: '20+',
    uptime: '99.9%',
  },

  socialMedia: {
    // Can be added later when available
    twitter: '',
    linkedin: '',
    facebook: '',
  },
} as const;

export type OfficeType = typeof ORGANIZATION_DATA.offices[number]['type'];
