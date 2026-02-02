import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { useLanguage } from "@/locales/LanguageContext";
import { Link } from "react-router-dom";
import { BLOG_ARTICLES, formatDate, sortArticlesByDate } from "@/lib/blog";
import { useMemo } from "react";
import { useSchemaMarkup } from "@/hooks/useSchemaMarkup";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schema";
import { Banner2 } from "@/assets/imgs";

export default function Blogs() {
  const { t, currentLanguage } = useLanguage();

  const articles = useMemo(() => {
    return sortArticlesByDate(BLOG_ARTICLES);
  }, []);

  // Add Schema markup for SEO
  const schemas = useMemo(() => [
    generateOrganizationSchema(currentLanguage),
    generateWebSiteSchema(currentLanguage),
  ], [currentLanguage]);

  useSchemaMarkup(schemas);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <FloatingActions />

      <main className="flex flex-col items-center">
        {/* Breadcrumb Navigation */}
        <section className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 pt-32 pb-4">
          <BreadcrumbNav
            items={[
              {
                label: t('blogs'),
                path: '/blogs',
              },
            ]}
          />
        </section>

        {/* Hero Banner */}
        <section className="relative w-full h-[320px]">
          <img
            src={Banner2}
            alt="Blog background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4 md:px-8 lg:px-[120px]">
            <div className="flex flex-col items-center gap-6 text-center max-w-[700px]">
              <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                {t('blogTitle')}
              </h1>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                {t('blogSubtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">{t('noArticlesYet')}</p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="w-full bg-gray-50 py-16 md:py-20">
          <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('blogCTATitle')}
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-[600px] mx-auto">
              {t('blogCTADesc')}
            </p>
            <a
              href="/cooperation"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {t('contact')}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Article Card Component
function ArticleCard({ article }: { article: typeof BLOG_ARTICLES[0] }) {
  const { currentLanguage } = useLanguage();

  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
      {article.coverImage && (
        <Link to={`/blogs/${article.slug}`} className="block w-full h-48 bg-gray-100 overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(article.publishedAt, currentLanguage)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{article.readingTime} min</span>
          </div>
        </div>

        <Link to={`/blogs/${article.slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer">
            {article.title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          <Link
            to={`/blogs/${article.slug}`}
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Read More
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
