/**
 * BlogPosting Schema generator
 * Creates Schema.org BlogPosting/Article markup for blog articles
 */

import type { Language } from '../types';
import { ORGANIZATION_DATA } from '../data/organization';
import { generateOrganizationSchema } from './organization';
import { parseMarkdown } from '@/lib/blog/utils';

interface BlogPostingOptions {
  headline: string;
  description: string;
  content: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  keywords?: string[];
  url: string;
}

export function generateBlogPostingSchema(
  options: BlogPostingOptions,
  language: Language
) {
  // Convert markdown content to HTML for Schema
  const articleBody = parseMarkdown(options.content);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: options.headline,
    description: options.description,
    articleBody: articleBody,
    author: {
      '@type': 'Organization',
      name: options.author,
    },
    publisher: generateOrganizationSchema(language),
    datePublished: options.datePublished,
    dateModified: options.dateModified || options.datePublished,
    image: options.image || ORGANIZATION_DATA.logo,
    keywords: options.keywords?.join(', '),
    url: options.url,
    inLanguage: language,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': options.url,
    },
  };
}
