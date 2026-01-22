import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Bot, Zap, Shield, Globe, TrendingUp, CheckCircle } from "lucide-react";
import { useLanguage } from "@/locales/LanguageContext";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useSchemaMarkup } from "@/hooks/useSchemaMarkup";
import { generateOrganizationSchema, generateWebSiteSchema, generateProductSchema } from "@/lib/schema";

export default function AgenticPay() {
  const { t, currentLanguage } = useLanguage();

  // Add Schema markup for SEO
  const schemas = useMemo(() => [
    generateOrganizationSchema(currentLanguage),
    generateWebSiteSchema(currentLanguage),
    generateProductSchema({
      name: 'Agentic Pay',
      description: 'The payment layer for AI agents. Supporting instant stablecoin settlement, atomic ledgers, and full-chain traceability.',
      category: 'Financial Technology - AI Payments',
      url: 'https://terrazipay.com/agentic-pay',
    }, currentLanguage),
  ], [currentLanguage]);

  useSchemaMarkup(schemas);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <FloatingActions />

      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="relative w-full bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 py-20 md:py-32">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
          <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 flex flex-col items-center gap-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Bot className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">{t('agenticPayBadge')}</span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-[900px]">
              {t('agenticPayHero')}
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-[700px] leading-relaxed">
              {t('agenticPaySubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                to="/cooperation"
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                {t('joinWaitlist')}
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium border border-white/20 hover:bg-white/20 transition-colors"
              >
                {t('learnMore')}
              </Link>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('agenticPayProblemTitle')}
            </h2>
            <p className="text-lg text-gray-600 max-w-[700px] mx-auto">
              {t('agenticPayProblemDesc')}
            </p>
          </div>
        </section>

        {/* Solution Section */}
        <section className="w-full bg-gray-50 py-16 md:py-20">
          <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('agenticPaySolutionTitle')}
              </h2>
              <p className="text-lg text-gray-600 max-w-[700px] mx-auto">
                {t('agenticPaySolutionDesc')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={<Shield className="w-8 h-8 text-blue-600" />}
                title={t('kyaTitle')}
                description={t('kyaDesc')}
              />
              <FeatureCard
                icon={<Zap className="w-8 h-8 text-blue-600" />}
                title={t('instantSettlementTitle')}
                description={t('instantSettlementDesc')}
              />
              <FeatureCard
                icon={<CheckCircle className="w-8 h-8 text-blue-600" />}
                title={t('atomicLedgerTitle')}
                description={t('atomicLedgerDesc')}
              />
              <FeatureCard
                icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
                title={t('payAsYouGoTitle')}
                description={t('payAsYouGoDesc')}
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('agenticPayBenefitsTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard
              title={t('forAIAgents')}
              benefits={[
                t('instantPayments'),
                t('transparentPricing'),
                t('globalReach'),
              ]}
            />
            <BenefitCard
              title={t('forBusinesses')}
              benefits={[
                t('costControl'),
                t('usageTracking'),
                t('compliance'),
              ]}
            />
            <BenefitCard
              title={t('forDevelopers')}
              benefits={[
                t('easyIntegration'),
                t('flexibleAPIs'),
                t('documentation'),
              ]}
            />
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="w-full bg-gray-50 py-16 md:py-20">
          <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('agenticPayUseCasesTitle')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UseCaseCard
                title={t('aiToAICommerce')}
                description={t('aiToAICommerceDesc')}
              />
              <UseCaseCard
                title={t('agentWorkforce')}
                description={t('agentWorkforceDesc')}
              />
              <UseCaseCard
                title={t('apiBilling')}
                description={t('apiBillingDesc')}
              />
              <UseCaseCard
                title={t('crossBorderAI')}
                description={t('crossBorderAIDesc')}
              />
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('agenticPayRoadmapTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoadmapCard
              quarter="Q1 2026"
              title={t('betaLaunch')}
              items={[t('betaLaunchItem1'), t('betaLaunchItem2')]}
            />
            <RoadmapCard
              quarter="Q2 2026"
              title={t('publicRelease')}
              items={[t('publicReleaseItem1'), t('publicReleaseItem2')]}
            />
            <RoadmapCard
              quarter="Q3 2026"
              title={t('enterpriseFeatures')}
              items={[t('enterpriseFeaturesItem1'), t('enterpriseFeaturesItem2')]}
            />
            <RoadmapCard
              quarter="Q4 2026"
              title={t('globalExpansion')}
              items={[t('globalExpansionItem1'), t('globalExpansionItem2')]}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-gradient-to-br from-blue-600 to-purple-700 py-16 md:py-20">
          <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('agenticPayCTATitle')}
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-[600px] mx-auto">
              {t('agenticPayCTADesc')}
            </p>
            <Link
              to="/cooperation"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              {t('getStarted')}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Helper Components
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function BenefitCard({ title, benefits }: { title: string; benefits: string[] }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-600">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UseCaseCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function RoadmapCard({ quarter, title, items }: { quarter: string; title: string; items: string[] }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="text-blue-600 font-semibold mb-2">{quarter}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
