/**
 * Blog utilities for Cloudflare Worker
 * Pure JavaScript functions without React dependencies
 */

// Import article data - we'll need to make this available to Worker
// For now, we'll create a minimal interface and import function

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
  readingTime: number;
  language: string;
}

/**
 * Parse markdown content to HTML for display
 * Similar to React component's renderContent but pure JavaScript
 */
export function parseMarkdownToHTML(content: string): string {
  let skipFirstH1 = true; // Flag to skip the first H1 (title)
  const lines = content.split('\n');
  const htmlParts: string[] = [];

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];

    // Skip the first H1 heading (article title)
    if (line.startsWith('# ') && skipFirstH1) {
      skipFirstH1 = false;
      continue;
    }

    // Images - format: ![alt text](image-url)
    const imageMatch = line.match(/^!\[([^\]]*)\]\((.+)\)$/);
    if (imageMatch) {
      const [, alt, src] = imageMatch;
      htmlParts.push(`<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" class="w-full rounded-lg my-8" />`);
      continue;
    }

    // Headers
    if (line.startsWith('### ')) {
      const text = line.replace('### ', '');
      htmlParts.push(`<h3 class="text-2xl font-bold mt-8 mb-4">${escapeHtml(text)}</h3>`);
      continue;
    }
    if (line.startsWith('## ')) {
      const text = line.replace('## ', '');
      htmlParts.push(`<h2 class="text-3xl font-bold mt-10 mb-6">${escapeHtml(text)}</h2>`);
      continue;
    }
    if (line.startsWith('# ')) {
      const text = line.replace('# ', '');
      htmlParts.push(`<h1 class="text-4xl font-bold mt-12 mb-8">${escapeHtml(text)}</h1>`);
      continue;
    }

    // Lists
    if (line.startsWith('* ') || line.startsWith('- ')) {
      const text = line.replace(/^[*-] /, '');
      htmlParts.push(`<li class="ml-6 mb-2">${processBoldText(text)}</li>`);
      continue;
    }

    // Blockquotes
    if (line.startsWith('> ')) {
      const text = line.replace('> ', '');
      htmlParts.push(`<blockquote class="border-l-4 border-blue-600 pl-4 italic my-4 text-gray-700">${processBoldText(text)}</blockquote>`);
      continue;
    }

    // Horizontal rule
    if (line === '---') {
      htmlParts.push('<hr class="my-8 border-gray-300" />');
      continue;
    }

    // Empty lines
    if (line.trim() === '') {
      htmlParts.push('<br />');
      continue;
    }

    // Regular paragraphs
    htmlParts.push(`<p class="mb-4 leading-relaxed">${processBoldText(line)}</p>`);
  }

  return htmlParts.join('\n');
}

/**
 * Process bold text (**text**) in a line
 */
function processBoldText(text: string): string {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
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
 * Generate HTML for blog article page
 */
export function generateBlogArticleHTML(article: BlogArticle, locale: string = 'en-US'): string {
  const formattedDate = formatDate(article.publishedAt, locale);
  const contentHTML = parseMarkdownToHTML(article.content);
  
  // Generate tags HTML
  const tagsHTML = article.tags.slice(0, 3).map(tag => 
    `<span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">#${escapeHtml(tag)}</span>`
  ).join('\n            ');

  // Generate all tags HTML for footer
  const allTagsHTML = article.tags.map(tag =>
    `<span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer">#${escapeHtml(tag)}</span>`
  ).join('\n              ');

  const coverImageHTML = article.coverImage 
    ? `<img src="${escapeHtml(article.coverImage)}" alt="${escapeHtml(article.title)}" class="w-full rounded-lg mb-8" />`
    : '';

  return `<main class="flex flex-col items-center">
    <!-- Breadcrumb Navigation -->
    <div class="w-full max-w-[800px] mx-auto px-4 md:px-8 pt-32 pb-4">
      <nav class="flex items-center gap-2 text-sm text-gray-600">
        <a href="/blogs" class="hover:text-blue-600">Blogs</a>
        <span>/</span>
        <span class="text-gray-900">${escapeHtml(article.title)}</span>
      </nav>
    </div>

    <!-- Article Header -->
    <div class="w-full max-w-[800px] mx-auto px-4 md:px-8 pb-8">
      <a href="/blogs" class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors">
        <span>← Back to Blog</span>
      </a>

      <div class="flex flex-wrap items-center gap-2 mb-4">
        <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">${escapeHtml(article.category)}</span>
        ${tagsHTML}
      </div>

      <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
        ${escapeHtml(article.title)}
      </h1>

      <p class="text-xl text-gray-600 mb-8 leading-relaxed">
        ${escapeHtml(article.description)}
      </p>

      ${coverImageHTML}

      <div class="flex flex-wrap items-center gap-6 text-gray-500 text-sm border-t border-b border-gray-200 py-4">
        <div class="flex items-center gap-2">
          <span>📅</span>
          <span>${escapeHtml(formattedDate)}</span>
        </div>
        <div class="flex items-center gap-2">
          <span>⏱</span>
          <span>${article.readingTime} min read</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-medium">${escapeHtml(article.author)}</span>
        </div>
      </div>
    </div>

    <!-- Article Content -->
    <article class="w-full max-w-[800px] mx-auto px-4 md:px-8 pb-16">
      <div class="prose prose-lg max-w-none">
        ${contentHTML}
      </div>
    </article>

    <!-- Article Footer -->
    <div class="w-full max-w-[800px] mx-auto px-4 md:px-8 pb-16">
      <div class="border-t border-gray-200 pt-8">
        <div class="flex flex-wrap gap-2">
          <span class="text-gray-600 font-medium">Tags:</span>
          ${allTagsHTML}
        </div>
      </div>

      <div class="mt-12 p-6 bg-blue-50 rounded-lg">
        <h3 class="text-xl font-bold mb-2">Interested in Agentic Pay?</h3>
        <p class="text-gray-700 mb-4">
          Join our waitlist to be among the first to access TerraziPay when we launch.
        </p>
        <a href="/cooperation" class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Join Waitlist
        </a>
      </div>
    </div>
  </main>`;
}
