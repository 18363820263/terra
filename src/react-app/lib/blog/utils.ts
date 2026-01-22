/**
 * Blog utilities and helpers
 */

import type { BlogArticle } from './types';

/**
 * Calculate reading time based on word count
 * Average reading speed: 200 words per minute
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string, locale: string = 'en-US'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Parse markdown content to HTML
 * Converts markdown to proper HTML for Schema.org and display
 */
export function parseMarkdown(content: string): string {
  let html = content
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Lists
    .replace(/^\d+\.\s+(.*)$/gim, '<li>$1</li>')
    .replace(/^[-*]\s+(.*)$/gim, '<li>$1</li>')
    // Line breaks and paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  // Wrap list items in ul/ol tags
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // Wrap content in paragraphs if not already wrapped
  if (!html.startsWith('<h') && !html.startsWith('<p') && !html.startsWith('<ul')) {
    html = '<p>' + html + '</p>';
  }

  // Clean up any double-wrapped paragraphs
  html = html
    .replace(/<p><h/g, '<h')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
    .replace(/<p><ul>/g, '<ul>')
    .replace(/<\/ul><\/p>/g, '</ul>');

  return html;
}

/**
 * Generate article excerpt from content (plain text)
 */
export function generateExcerpt(content: string, maxLength: number = 150): string {
  const plainText = content.replace(/[#*`\[\]()]/g, '').trim();
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + '...';
}

/**
 * Sort articles by date (newest first)
 */
export function sortArticlesByDate(articles: BlogArticle[]): BlogArticle[] {
  return [...articles].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}
