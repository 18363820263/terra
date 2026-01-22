/**
 * BreadcrumbList Schema generator
 * Creates Schema.org BreadcrumbList markup for navigation
 */

import type { BreadcrumbList } from '../types';
import { ORGANIZATION_DATA } from '../data/organization';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbList {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${ORGANIZATION_DATA.url}${item.url}`,
    })),
  };
}
