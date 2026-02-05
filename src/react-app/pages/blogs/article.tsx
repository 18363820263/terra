import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { useLanguage } from '@/locales/LanguageContext';
import { getArticleBySlug, formatDate } from '@/lib/blog';
import { useMemo } from 'react';
import { useSchemaMarkup } from '@/hooks/useSchemaMarkup';
import { generateOrganizationSchema, generateWebSiteSchema, generateBlogPostingSchema, type Schema } from '@/lib/schema';
import { useTDK } from '@/hooks/useTDK';

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { t, currentLanguage, translations } = useLanguage();

  const article = useMemo(() => {
    if (!slug) return undefined;
    return getArticleBySlug(slug);
  }, [slug]);

  // Add Schema markup for SEO
  const schemas = useMemo(() => {
    const baseSchemas: Schema[] = [
      generateOrganizationSchema(currentLanguage),
      generateWebSiteSchema(currentLanguage),
    ];

    if (article) {
      baseSchemas.push(
        generateBlogPostingSchema({
          headline: article.title,
          description: article.description,
          content: article.content,
          author: article.author,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt || article.publishedAt,
          keywords: article.tags,
          url: `https://terrazipay.com/blogs/${article.slug}`,
        }, currentLanguage)
      );
    }

    return baseSchemas;
  }, [currentLanguage, article]);

  useSchemaMarkup(schemas);

  // Set dynamic TDK based on article content
  const tdkConfig = useMemo(() => {
    if (!article) {
      // Fallback TDK for blog list page
      const tdk = (translations as any).tdk?.blogs;
      return {
        title: tdk?.title || 'Blog - TerraziPay',
        description: tdk?.description || 'Stay informed with the latest trends in stablecoin payments, blockchain technology, and the AI agent economy.',
        keywords: tdk?.keywords || 'TerraziPay blog, stablecoin payment, blockchain technology',
        ogUrl: 'https://terrazipay.com/blogs',
        ogImage: 'https://terrazipay.com/logo.png',
      };
    }

    // Dynamic TDK based on article
    const keywords = [
      ...article.tags,
      'TerraziPay',
      '稳定币支付',
      'stablecoin payment',
      '区块链',
      'blockchain',
      article.category,
    ].join(', ');

    return {
      title: `${article.title} | TerraziPay Blog`,
      description: article.description,
      keywords: keywords,
      ogTitle: article.title,
      ogDescription: article.description,
      ogUrl: `https://terrazipay.com/blogs/${article.slug}`,
      ogImage: article.coverImage ? `https://terrazipay.com${article.coverImage}` : 'https://terrazipay.com/logo.png',
      twitterTitle: article.title,
      twitterDescription: article.description,
      twitterImage: article.coverImage ? `https://terrazipay.com${article.coverImage}` : 'https://terrazipay.com/logo.png',
    };
  }, [article, translations]);

  useTDK(tdkConfig);

  if (!article) {
    return <Navigate to="/blogs" replace />;
  }

  // Parse markdown content to HTML (simple implementation)
  const renderContent = (content: string) => {
    let skipFirstH1 = true; // Flag to skip the first H1 (title)

    return content.split('\n').map((line, index) => {
      // Skip the first H1 heading (article title)
      if (line.startsWith('# ') && skipFirstH1) {
        skipFirstH1 = false;
        return null;
      }

      // Images - format: ![alt text](image-url)
      // Handle parentheses in URLs by matching everything between ]( and the last )
      const imageMatch = line.match(/^!\[([^\]]*)\]\((.+)\)$/);
      if (imageMatch) {
        const [, alt, src] = imageMatch;
        return (
          <img
            key={index}
            src={src}
            alt={alt}
            className="w-full rounded-lg my-8"
          />
        );
      }

      // Headers
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-2xl font-bold mt-8 mb-4">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-3xl font-bold mt-10 mb-6">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-4xl font-bold mt-12 mb-8">{line.replace('# ', '')}</h1>;
      }

      // Lists
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return <li key={index} className="ml-6 mb-2">{line.replace(/^[*-] /, '')}</li>;
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        return (
          <blockquote key={index} className="border-l-4 border-blue-600 pl-4 italic my-4 text-gray-700">
            {line.replace('> ', '')}
          </blockquote>
        );
      }

      // Horizontal rule
      if (line === '---') {
        return <hr key={index} className="my-8 border-gray-300" />;
      }

      // Bold text
      const boldText = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

      // Empty lines
      if (line.trim() === '') {
        return <br key={index} />;
      }

      // Regular paragraphs
      return <p key={index} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: boldText }} />;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex flex-col items-center">
        {/* Breadcrumb Navigation */}
        <div className="w-full max-w-[800px] mx-auto px-4 md:px-8 pt-32 pb-4">
          <BreadcrumbNav
            items={[
              {
                label: t('blogs'),
                path: '/blogs',
              },
              {
                label: article.title,
                path: `/blogs/${article.slug}`,
              },
            ]}
          />
        </div>

        {/* Article Header */}
        <div className="w-full max-w-[800px] mx-auto px-4 md:px-8 pb-8">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('backToBlogs') || 'Back to Blog'}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
              {article.category}
            </span>
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {article.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm border-t border-b border-gray-200 py-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.publishedAt, currentLanguage)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readingTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{article.author}</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="w-full max-w-[800px] mx-auto px-4 md:px-8 pb-16">
          <div className="prose prose-lg max-w-none">
            {renderContent(article.content)}
          </div>
        </article>

        {/* Article Footer */}
        <div className="w-full max-w-[800px] mx-auto px-4 md:px-8 pb-16">
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-600 font-medium">Tags:</span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-bold mb-2">{t('interestedInAgenticPay') || 'Interested in Agentic Pay?'}</h3>
            <p className="text-gray-700 mb-4">
              {t('joinWaitlistDescription') || 'Join our waitlist to be among the first to access TerraziPay when we launch.'}
            </p>
            <Link
              to="/cooperation"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {t('joinWaitlist') || 'Join Waitlist'}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
