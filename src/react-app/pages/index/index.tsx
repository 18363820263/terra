import { ChevronRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Announcement from "@/components/Announcement";
import FloatingActions from "@/components/FloatingActions";
import { Banner1, IndexCalc, IndexGlobal, IndexSaler, IndexSecurity, IndexSpeed } from "@/assets/imgs";
import { SecurityCard } from "@/components/SecurityCard";
import { SecurityIcon, SpeedIcon, GlobeIcon, ProductCard, CaseStudyCard, AdvantageCard, StoryCard, PartnerLogo } from "./components";
import { EncryptionIcon, IconArrowDown, IconArrowLeftFill, IconArrowRight, IconArrowRightFill, IconArrowUp, IconBolt, IconEarth, IconEco, IconEye, IconGame, IconMCN, IconStore, IconWallet, MonitorIcon, SeparationIcon, SignatureIcon } from "./components/Icons";
import { useLanguage } from "@/locales/LanguageContext";
import { Partner } from "./components/Partner";
import { Link } from "react-router-dom";
import { ClampedContentWithTooltip } from "@/components/ClampedContentWithTooltip";
import { useSchemaMarkup } from "@/hooks/useSchemaMarkup";
import { generateOrganizationSchema, generateWebSiteSchema, generateServiceSchema } from "@/lib/schema";

export default function Index() {
  const [activeTab, setActiveTab] = useState("security");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const { t, currentLanguage } = useLanguage();

  // Add Schema markup for SEO
  const schemas = useMemo(() => [
    generateOrganizationSchema(currentLanguage),
    generateWebSiteSchema(currentLanguage),
    generateServiceSchema({
      name: 'Cross-border Stablecoin Payment Services',
      description: 'Fast, secure and compliant end-to-end payment platform based on stablecoins such as USDT and USDC.',
      serviceType: 'Payment Processing',
    }, currentLanguage),
  ], [currentLanguage]);

  useSchemaMarkup(schemas);

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 轮播配置
  const gap = 24; // 卡片间距
  const cards = [
    {
      icon: <IconMCN />,
      title: t('mcnAgency'),
      description: t('mcnAgencyDesc'),
      metric1: "+200%",
      metric1Label: t('entrepreneurEarnings'),
      metric2: "+90%",
      metric2Label: t('settlementEfficiency')
    },
    {
      icon: <IconEco />,
      title: t('crossBorderEcommerce'),
      description: t('crossBorderEcommerceDesc'),
      metric1: "+400%",
      metric1Label: t('transactionGrowth'),
      metric2: "+40%",
      metric2Label: t('paymentSuccessRate')
    },
    {
      icon: <IconGame />,
      title: t('gameEntertainment'),
      description: t('gameEntertainmentDesc'),
      metric1: "+200%",
      metric1Label: t('rechargeConversionRate'),
      metric2: "+90%",
      metric2Label: t('userSatisfaction')
    },
    {
      icon: <IconStore />,
      title: t('offlineStores'),
      description: t('offlineStoresDesc'),
      metric1: "130%",
      metric1Label: t('foreignCustomers'),
      metric2: "99.99%",
      metric2Label: t('paymentSuccessRate')
    }
  ];

  // 根据屏幕宽度确定显示的卡片数量
  const getVisibleCards = () => {
    if (windowWidth >= 1200) return 3;
    if (windowWidth >= 768) return 2;
    return 1;
  };

  // 计算滑动距离，确保最后一个卡片的右边不会离开视口
  const calculateSlideDistance = (index: number) => {
    const visibleCards = getVisibleCards();
    let cardWidth = 300; // 基础卡片宽度

    // 根据屏幕宽度调整卡片宽度
    if (windowWidth >= 1200) cardWidth = 350;
    else if (windowWidth >= 768) cardWidth = 320;
    else if (windowWidth >= 640) cardWidth = 300;
    else cardWidth = 280;

    const maxSlideIndex = cards.length - visibleCards;
    // 如果超过最大可滑动索引，滑动距离固定
    if (index >= maxSlideIndex) {
      return maxSlideIndex * (cardWidth + gap);
    }
    return index * (cardWidth + gap);
  };

  const tabContents = {
    security: {
      title: t('security'),
      icon: <SecurityIcon />,
      description: t('securityTitle'),
      img: IndexSecurity,
      points: t('securityPoints')
    },
    speed: {
      title: t('speed'),
      icon: <SpeedIcon />,
      description: t('speedTitle'),
      img: IndexSpeed,
      points: t('speedPoints')
    },
    global: {
      title: t('global'),
      icon: <GlobeIcon />,
      description: t('globalTitle'),
      img: IndexGlobal,
      points: t('globalPoints')
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Announcement />
      <FloatingActions />

      <main className="flex flex-col items-center gap-16 md:gap-24 lg:gap-[120px]">
        {/* Hero Banner */}
        <section className="relative w-full h-[500px] md:h-[640px]">
          <img
            src={Banner1}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4 md:px-8 lg:px-[120px] pt-32 md:pt-[240px] pb-20 md:pb-[204px]">
            <div className="flex flex-col items-center gap-8 md:gap-12 max-w-full">
              <div className="flex flex-col items-center gap-2 md:gap-4">
                <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-[72px] text-center px-4">
                  {t('heroTitle')}
                </h1>
                <p className="text-white/70 text-base md:text-lg lg:text-xl font-light leading-relaxed md:leading-[30px] text-center px-4">
                  {t('heroSubtitle')}
                </p>
              </div>
              <button
                className=" rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Link className="text-white flex items-center justify-center gap-2 md:gap-3  px-8 md:px-16 h-12 md:h-14" to="/cooperation">
                  <span className="text-white text-base md:text-xl font-medium leading-[30px]">
                    {t('more')}
                  </span>
                  <IconArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </Link>
              </button>
            </div>
          </div>
        </section>

        {/* Global Coverage Stats */}
        <section className="w-full max-w-[1200px] px-4 flex flex-col items-center gap-10">
          <h2 className="text-gray-950 text-2xl md:text-3xl lg:text-4xl font-medium leading-tight md:leading-[54px] text-center">
            {t('globalCoverage')}
          </h2>
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 border-t border-b border-gray-200 py-8 md:py-12">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-gray-950 text-3xl md:text-4xl font-medium leading-tight md:leading-[54px]">
                50+
              </span>
              <span className="text-gray-400 text-sm md:text-base font-light leading-6 text-center">
                {t('regions')}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-gray-950 text-3xl md:text-4xl font-medium leading-tight md:leading-[54px]">
                30+
              </span>
              <span className="text-gray-400 text-sm md:text-base font-light leading-6 text-center">
                {t('currencies')}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-gray-950 text-3xl md:text-4xl font-medium leading-tight md:leading-[54px]">
                20+
              </span>
              <span className="text-gray-400 text-sm md:text-base font-light leading-6 text-center">
                {t('paymentMethods')}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-gray-950 text-3xl md:text-4xl font-medium leading-tight md:leading-[54px]">
                99.9%
              </span>
              <span className="text-gray-400 text-sm md:text-base font-light leading-6 text-center">
                {t('uptime')}
              </span>
            </div>
          </div>
        </section>

        {/* Why Choose Terrapay */}
        <section className="w-full flex flex-col items-center gap-10">
          <div className="w-full max-w-[1200px] flex flex-col items-center gap-3">
            <h2 className="text-gray-950 text-4xl font-medium leading-[54px] text-center">
              {t('whyChoose')}
            </h2>
            <p className="text-gray-400 text-base font-light leading-6 text-center">
              {t('whyChooseSubtitle')}
            </p>
          </div>

          <div className="w-full flex flex-col items-center gap-10">
            {/* Tabs */}
            <div className="flex items-start gap-20 flex-wrap justify-center">
              {
                Object.keys(tabContents).map((key) => (
                  <div
                    key={key}
                    className="flex flex-col items-center gap-2 px-8 cursor-pointer"
                    onClick={() => setActiveTab(key)}
                  >
                    <span className={activeTab === key ? "text-[#2563EB]" : "text-gray-400"}>
                      {tabContents[key].icon}
                    </span>
                    <span className={`text-2xl font-medium leading-9 ${activeTab === key ? "text-gray-950" : "text-gray-400"}`}>
                      {tabContents[key].title}
                    </span>
                  </div>
                ))
              }
            </div>

            {/* Why Choose Content */}
            <div className="w-full bg-gray-50 flex items-center">
              <div className="w-full max-w-[1200px] m-auto flex flex-col lg:flex-row gap-6 lg:gap-12">
                <div className="flex-1 min-w-0 flex flex-col items-start gap-6 md:gap-8 min-h-[440px] p-6 md:p-10 lg:p-14">
                  <h3 className="text-gray-950 h-[70px] text-xl md:text-2xl font-medium leading-relaxed md:leading-9">
                    <ClampedContentWithTooltip className="line-clamp-2" content={tabContents[activeTab].description} />
                  </h3>
                  <div className="flex flex-1 flex-col items-start gap-2.5">
                    {tabContents[activeTab].points.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-3 rounded-full bg-blue-600 mt-1.5" />
                        <span className="text-gray-950 text-sm md:text-base font-light leading-6">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="flex items-center justify-center gap-2 px-6 h-10 rounded-full border border-gray-950 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <span className="text-gray-950 text-sm md:text-base font-normal leading-6">
                      {t('more')}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-950" />
                  </button>
                </div>
                <div className="relative">
                  <div className="inset-0 flex items-center justify-center">
                    <img className="h-full lg:min-h-[440px]" src={tabContents[activeTab].img} alt="Security" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security System */}
        <section className="w-full max-w-[1200px] px-4 flex flex-col items-center gap-10">
          <div className="w-full flex flex-col items-start gap-3">
            <h2 className="w-full text-gray-950 text-4xl font-medium leading-[54px] text-center">
              {t('securitySystem')}
            </h2>
            <p className="w-full text-gray-400 text-base font-light leading-6 text-center">
              {t('securitySystemSubtitle')}
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <SecurityCard
              icon={<MonitorIcon />}
              title={t('kytMonitoring')}
              description={t('kytMonitoringDesc')}
            />
            <SecurityCard
              icon={<EncryptionIcon />}
              title={t('endToEndEncryption')}
              description={t('endToEndEncryptionDesc')}
            />
            <SecurityCard
              icon={<SignatureIcon />}
              title={t('multiSignature')}
              description={t('multiSignatureDesc')}
            />
            <SecurityCard
              icon={<SeparationIcon />}
              title={t('coldStorage')}
              description={t('coldStorageDesc')}
            />
          </div>
        </section>

        {/* Product Ecosystem */}
        <section className="w-full max-w-[1200px] px-4 flex flex-col items-center gap-10">
          <div className="w-full flex flex-col items-start gap-3">
            <h2 className="w-full text-gray-950 text-4xl font-medium leading-[54px] text-center">
              {t('productEcosystem')}
            </h2>
            <p className="w-full text-gray-400 text-base font-light leading-6 text-center">
              {t('productEcosystemSubtitle')}
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductCard
              title={t('settlementSystem')}
              subtitle={t('settlementSystemSubtitle')}
              description={t('settlementSystemDesc')}
              image={IndexCalc}
            />
            <ProductCard
              title={t('aiAgentPayment')}
              subtitle={t('aiAgentPaymentSubtitle')}
              description={t('aiAgentPaymentDesc')}
              image={IndexCalc}
            />
          </div>
        </section>

        {/* Success Stories */}
        <section className="w-full relative h-[760px]">
          <div className="absolute inset-0">
            <div className="h-[360px] bg-gray-950" />
            <div className="h-[400px] bg-gray-50" />
          </div>
          <div className="relative max-w-[1200px] mx-auto px-4 pt-20 flex flex-col items-center gap-10">
            <div className="w-full max-w-[640px] flex flex-col items-start gap-3">
              <h2 className="w-full text-white text-4xl font-medium leading-[54px] text-center">
                {t('successStories')}
              </h2>
              <p className="w-full text-white/50 text-base font-light leading-6 text-center">
                {t('successStoriesSubtitle')}
              </p>
            </div>

            <div className="w-full relative">
              <div className=" flex overflow-hidden">
                <div
                  className="flex gap-6 transition-transform duration-500 ease-out"
                  style={{
                    // 使用calculateSlideDistance函数计算滑动距离，确保最后一个卡片的右边不会离开右侧
                    transform: `translateX(-${calculateSlideDistance(currentSlide)}px)`
                  }}
                >
                  {cards.map((card, index) => (
                    <CaseStudyCard
                      key={index}
                      icon={card.icon}
                      title={card.title}
                      description={card.description}
                      metric1={card.metric1}
                      metric1Label={card.metric1Label}
                      metric2={card.metric2}
                      metric2Label={card.metric2Label}
                    />
                  ))}
                </div>
              </div>
              <div className="arrow-container">
                {currentSlide !== 0 && (<div className=" absolute top-1/2 -translate-y-1/2 left-1 lg:left-[-50px]">
                  <span
                    className="cursor-pointer text-black/50 hover:text-[#2563eb]"
                    onClick={() => setCurrentSlide((prev) => (prev === 0 ? cards.length - 1 : prev - 1))}
                  ><IconArrowLeftFill /></span>
                </div>)}
                {currentSlide == 0 && (<div className=" absolute top-1/2 -translate-y-1/2 lg:right-[-50px]">
                  <span
                    className="cursor-pointer text-black/50 hover:text-[#2563eb]"
                    onClick={() => setCurrentSlide((prev) => (prev === cards.length - 1 ? 0 : prev + 1))}
                  ><IconArrowRightFill /></span>
                </div>)}
              </div>
            </div>

            {/* Carousel control */}
            <div className="flex items-center gap-2">
              {[1, 2].map((_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-gray-400' : 'bg-gray-200'}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Stablecoin Advantages */}
        <section className="w-full max-w-[1200px] px-4 flex flex-col items-center gap-10">
          <div className="w-full max-w-[640px] flex flex-col items-start gap-3">
            <h2 className="w-full text-gray-950 text-4xl font-medium leading-[54px] text-center">
              {t('stablecoinAdvantages')}
            </h2>
            <p className="w-full text-gray-400 text-base font-light leading-6 text-center">
              {t('stablecoinAdvantagesSubtitle')}
            </p>
          </div>

          <div className="w-full flex flex-col items-start gap-6">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              <AdvantageCard
                title={t('improveCashFlow')}
                icon={<IconWallet />}
                description={t('improveCashFlowDesc')}
                comparison={[
                  { label: t('traditionalPayment'), value: t('threeToFiveDays') },
                  { label: t('stablecoinPayment'), value: t('instantSettlement') },
                ]}
              />
              <AdvantageCard
                title={t('reduceCost')}
                icon={<IconArrowDown />}
                description={t('reduceCostDesc')}
                comparison={[{ label: t('transactionFee'), value: t('save80') }]}
              />
              <AdvantageCard
                title={t('globalExpansion')}
                icon={<IconEarth />}
                description={t('globalExpansionDesc')}
                comparison={[
                  { label: t('country'), value: "50+" },
                  { label: t('currency'), value: "20+" },
                ]}
              />
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              <AdvantageCard
                title={t('riskManagement')}
                icon={<IconBolt />}
                description={t('riskManagementDesc')}
                comparison={[{ label: t('securityGuarantee'), value: t('save9999') }]}
              />
              <AdvantageCard
                title={t('improveUserExperience')}
                icon={<IconArrowUp />}
                description={t('improveUserExperienceDesc')}
                comparison={[{ label: t('paymentSuccessRate'), value: "+50%" }]}
              />
              <AdvantageCard
                title={t('dataInsights')}
                icon={<IconEye />}
                description={t('dataInsightsDesc')}
                comparison={[{ label: t('realTimeDashboard'), value: "" }]}
              />
            </div>
          </div>
        </section>

        {/* Merchant Stories */}
        <section className="w-full max-w-[1200px] px-4 flex flex-col items-center gap-10">
          <div className="w-full max-w-[640px] flex flex-col items-start gap-3">
            <h2 className="w-full text-gray-950 text-4xl font-medium leading-[54px] text-center">
              {t('merchantStories')}
            </h2>
          </div>

          <div className="w-full flex items-center gap-6">
            <div className="flex-1 relative h-[343px] rounded-2xl overflow-hidden bg-gray-50">
              <img
                src={IndexSaler}
                alt="Merchant story"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute top-8 left-10 flex items-start gap-6">
                <div className="w-1.5 h-20 rounded-full bg-white" />
                <div className="flex flex-col items-start">
                  <span className="text-white/70 text-2xl font-light leading-9">
                    {t('famousMerchantStories_title')}
                  </span>
                  <span className="text-white text-4xl font-medium leading-[54px]">
                    {t('famousMerchantStories_description')}
                  </span>
                </div>
              </div>
            </div>
            {/* <StoryCard title={t('story1')} />
            <StoryCard title={t('story2')} /> */}
          </div>
        </section>

        {/* Financial Partners */}
        <section className="w-full flex flex-col items-center gap-10 pb-20">
          <div className="w-full max-w-[800px] flex flex-col items-start gap-3">
            <h2 className="w-full text-gray-950 text-4xl font-medium leading-[54px] text-center">
              {t('financialPartners')}
            </h2>
          </div>

          <div className="w-full relative">
            <Partner />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

