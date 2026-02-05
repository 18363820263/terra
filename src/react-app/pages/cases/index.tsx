import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { ShoppingCart, Gamepad2, Users, Video, Cloud, Store } from "lucide-react";
import { useLanguage } from "@/locales/LanguageContext";
import { useMemo } from "react";
import { useSchemaMarkup } from "@/hooks/useSchemaMarkup";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schema";
import { useTDK } from "@/hooks/useTDK";
import { Banner2 } from "@/assets/imgs";

export default function Cases() {
    const { t, currentLanguage, translations } = useLanguage();

    // Add Schema markup for SEO
    const schemas = useMemo(() => [
        generateOrganizationSchema(currentLanguage),
        generateWebSiteSchema(currentLanguage),
    ], [currentLanguage]);

    useSchemaMarkup(schemas);

    // Set page-specific TDK
    const tdkConfig = useMemo(() => {
        const tdk = (translations as any).tdk?.cases;
        return {
            title: tdk?.title || 'Cases - TerraziPay',
            description: tdk?.description || 'Explore our success stories',
            keywords: tdk?.keywords || 'stablecoin payment cases',
            ogUrl: 'https://terrazipay.com/cases',
            ogImage: 'https://terrazipay.com/logo.png',
        };
    }, [translations]);

    useTDK(tdkConfig);

    const cases = [
        {
            icon: ShoppingCart,
            title: t('ecommerceCaseTitle'),
            industry: t('ecommerceCaseIndustry'),
            challengeDesc: t('ecommerceCaseChallengeDesc'),
            solutionDesc: t('ecommerceCaseSolutionDesc'),
            metrics: [
                { label: t('ecommerceCaseMetric1'), value: t('ecommerceCaseMetric1Value') },
                { label: t('ecommerceCaseMetric2'), value: t('ecommerceCaseMetric2Value') },
                { label: t('ecommerceCaseMetric3'), value: t('ecommerceCaseMetric3Value') },
            ],
            quote: t('ecommerceCaseQuote'),
            author: t('ecommerceCaseAuthor'),
            authorTitle: t('ecommerceCaseAuthorTitle'),
        },
        {
            icon: Gamepad2,
            title: t('gamingCaseTitle'),
            industry: t('gamingCaseIndustry'),
            challengeDesc: t('gamingCaseChallengeDesc'),
            solutionDesc: t('gamingCaseSolutionDesc'),
            metrics: [
                { label: t('gamingCaseMetric1'), value: t('gamingCaseMetric1Value') },
                { label: t('gamingCaseMetric2'), value: t('gamingCaseMetric2Value') },
                { label: t('gamingCaseMetric3'), value: t('gamingCaseMetric3Value') },
            ],
            quote: t('gamingCaseQuote'),
            author: t('gamingCaseAuthor'),
            authorTitle: t('gamingCaseAuthorTitle'),
        },
        {
            icon: Users,
            title: t('freelanceCaseTitle'),
            industry: t('freelanceCaseIndustry'),
            challengeDesc: t('freelanceCaseChallengeDesc'),
            solutionDesc: t('freelanceCaseSolutionDesc'),
            metrics: [
                { label: t('freelanceCaseMetric1'), value: t('freelanceCaseMetric1Value') },
                { label: t('freelanceCaseMetric2'), value: t('freelanceCaseMetric2Value') },
                { label: t('freelanceCaseMetric3'), value: t('freelanceCaseMetric3Value') },
            ],
            quote: t('freelanceCaseQuote'),
            author: t('freelanceCaseAuthor'),
            authorTitle: t('freelanceCaseAuthorTitle'),
        },
        {
            icon: Video,
            title: t('mcnCaseTitle'),
            industry: t('mcnCaseIndustry'),
            challengeDesc: t('mcnCaseChallengeDesc'),
            solutionDesc: t('mcnCaseSolutionDesc'),
            metrics: [
                { label: t('mcnCaseMetric1'), value: t('mcnCaseMetric1Value') },
                { label: t('mcnCaseMetric2'), value: t('mcnCaseMetric2Value') },
                { label: t('mcnCaseMetric3'), value: t('mcnCaseMetric3Value') },
            ],
        },
        {
            icon: Cloud,
            title: t('saasCaseTitle'),
            industry: t('saasCaseIndustry'),
            challengeDesc: t('saasCaseChallengeDesc'),
            solutionDesc: t('saasCaseSolutionDesc'),
            metrics: [
                { label: t('saasCaseMetric1'), value: t('saasCaseMetric1Value') },
                { label: t('saasCaseMetric2'), value: t('saasCaseMetric2Value') },
                { label: t('saasCaseMetric3'), value: t('saasCaseMetric3Value') },
            ],
        },
        {
            icon: Store,
            title: t('luxuryCaseTitle'),
            industry: t('luxuryCaseIndustry'),
            challengeDesc: t('luxuryCaseChallengeDesc'),
            solutionDesc: t('luxuryCaseSolutionDesc'),
            metrics: [
                { label: t('luxuryCaseMetric1'), value: t('luxuryCaseMetric1Value') },
                { label: t('luxuryCaseMetric2'), value: t('luxuryCaseMetric2Value') },
                { label: t('luxuryCaseMetric3'), value: t('luxuryCaseMetric3Value') },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="flex flex-col items-center">
                {/* Breadcrumb Navigation */}
                <section className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 pt-32 pb-4">
                    <BreadcrumbNav
                        items={[
                            {
                                label: t('cases'),
                                path: '/cases',
                            },
                        ]}
                    />
                </section>

                {/* Hero Banner */}
                <section className="relative w-full h-[320px]">
                    <img
                        src={Banner2}
                        alt="Cases background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4 md:px-8 lg:px-[120px]">
                        <div className="flex flex-col items-center gap-6 text-center max-w-[700px]">
                            <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                                {t('casesTitle')}
                            </h1>
                            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                                {t('casesSubtitle')}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content Section */}
                <section className="w-full max-w-[1200px] px-4 md:px-8 lg:px-0 py-16 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cases.map((caseItem, index) => {
                            const Icon = caseItem.icon;
                            return (
                                <article
                                    key={index}
                                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow p-8"
                                >
                                    {/* Industry Badge */}
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="p-3 rounded-xl bg-blue-50">
                                            <Icon className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">{caseItem.industry}</span>
                                            <h3 className="text-xl md:text-2xl font-medium text-gray-950">
                                                {caseItem.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Challenge & Solution */}
                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <h4 className="text-sm font-semibold text-red-600 mb-2">
                                                {t('ecommerceCaseChallenge')}
                                            </h4>
                                            <p className="text-gray-600 text-sm font-light leading-6">
                                                {caseItem.challengeDesc}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-green-600 mb-2">
                                                {t('ecommerceCaseSolution')}
                                            </h4>
                                            <p className="text-gray-600 text-sm font-light leading-6">
                                                {caseItem.solutionDesc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Metrics */}
                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        {caseItem.metrics.map((metric, idx) => (
                                            <div
                                                key={idx}
                                                className="text-center p-3 bg-gray-50 rounded-lg"
                                            >
                                                <div className="text-2xl font-medium text-blue-600">
                                                    {metric.value}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">{metric.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    {caseItem.quote && (
                                        <div className="border-l-4 border-gray-200 pl-4 py-2">
                                            <p className="text-gray-600 italic text-sm mb-2 font-light">
                                                {caseItem.quote}
                                            </p>
                                            <div className="text-xs text-gray-500">
                                                <div className="font-semibold text-gray-950">{caseItem.author}</div>
                                                <div className="font-light">{caseItem.authorTitle}</div>
                                            </div>
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
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
