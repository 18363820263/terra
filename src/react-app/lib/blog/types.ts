/**
 * Blog article types and interfaces
 */

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  coverImage?: string;
  readingTime: number; // in minutes
  language: 'zh-CN' | 'en-US' | 'zh-TW' | 'es-ES';
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface BlogMetadata {
  totalArticles: number;
  categories: BlogCategory[];
  tags: string[];
}
