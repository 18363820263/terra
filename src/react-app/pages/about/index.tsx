import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { Lightbulb, Sun, Gem, Heart, Star, MapPin } from "lucide-react";
import { AboutCover, AboutFuture, AboutMap, Banner2 } from "@/assets/imgs";
import { useLanguage } from "@/locales/LanguageContext";
import { useMemo } from "react";
import { useSchemaMarkup } from "@/hooks/useSchemaMarkup";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schema";

export default function About() {
  const { t, currentLanguage } = useLanguage();

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
                label: t('about'),
                path: '/about',
              },
            ]}
          />
        </section>

        {/* Hero Banner */}
        <section className="relative w-full h-[320px] overflow-hidden">
          <img
            src={Banner2}
            alt="About background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-4 md:px-8 lg:px-[120px] pt-[120px]">
            <div className="w-full max-w-[1200px] flex flex-col items-center gap-6">
              <h1 className="text-white text-3xl md:text-4xl font-medium leading-tight text-center">
                {t('aboutUs')}
              </h1>
              <div className="h-px w-full bg-white/20" />
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                <ValueItem icon={Lightbulb} label={t('innovation')} />
                <Divider />
                <ValueItem icon={Sun} label={t('passion')} />
                <Divider />
                <ValueItem icon={Gem} label={t('professionalism')} />
                <Divider />
                <ValueItem icon={Heart} label={t('integrity')} />
                <Divider />
                <ValueItem icon={Star} label={t('enterprise')} />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="w-full max-w-[1200px] px-4 md:px-8 lg:px-0 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
            {/* Left - Image */}
            <div className="w-full lg:w-[680px] flex-shrink-0 relative">
              <div className="w-full h-full min-h-[320px] lg:h-[488px]  overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-50 -z-10" />
                <img
                  src={AboutCover}
                  alt="TerraziPay Building"
                  className="w-full h-full rounded-2xl object-cover relative"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div className="flex-1 flex flex-col gap-8 lg:gap-10">
              <ContentBlock
                title={t('whatIsTerragogo')}
                content={t('whatIsTerragogoDesc')}
              />
              <ContentBlock
                title={t('blockchainNetworkSupport')}
                content={t('blockchainNetworkSupportDesc')}
              />
              <ContentBlock
                title={t('transactionScale')}
                content={t('transactionScaleDesc')}
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full bg-gray-50 py-12 md:py-16">
          <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
              <StatItem value={t('dailyTransactionCount')} label={t('dailyTransactions')} />
              <StatItem value={t('merchantCount')} label={t('merchants')} />
              <StatItem value={t('serviceTeamCount')} label={t('serviceTeam')} />
              <StatItem value="50+" label={t('statsGlobalCoverage')} />
              <StatItem value="4+" label={t('branches')} />
            </div>
          </div>
        </section>

        {/* Core Advantages Section */}
        <section className="w-full max-w-[1200px] px-4 md:px-8 lg:px-0 py-16 md:py-20">
          <div className="flex flex-col items-center gap-10">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-950 text-center">
              {t('coreAdvantages')}
            </h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AdvantageCard
                icon={<ShieldCheckIcon />}
                title={t('complianceSecurity')}
                description={t('complianceSecurityDesc')}
              />
              <AdvantageCard
                icon={<LightningIcon />}
                title={t('efficientStable')}
                description={t('efficientStableDesc')}
              />
              <AdvantageCard
                icon={<GlobeIcon />}
                title={t('globalCoverageAbout')}
                description={t('globalCoverageAboutDesc')}
              />
              <AdvantageCard
                icon={<ZeroIcon />}
                title={t('zeroThresholdAccess')}
                description={t('zeroThresholdAccessDesc')}
              />
              <AdvantageCard
                icon={<RmbIcon />}
                title={t('costClarity')}
                description={t('costClarityDesc')}
              />
              <AdvantageCard
                icon={<FlexibleIcon />}
                title={t('flexibleSettlement')}
                description={t('flexibleSettlementDesc')}
              />
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="w-full bg-gray-900 relative overflow-hidden">
          <img
            src={AboutFuture}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 lg:px-0 py-12 md:py-16 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-3 rounded-full bg-blue-600" />
                <h3 className="text-white text-base font-semibold">{t('vision')}</h3>
              </div>
              <p className="text-white/70 text-base font-light leading-6">
                {t('visionDesc')}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-3 rounded-full bg-blue-600" />
                <h3 className="text-white text-base font-semibold">{t('mission')}</h3>
              </div>
              <p className="text-white/70 text-base font-light leading-6">
                {t('missionDesc')}
              </p>
            </div>
            <QuoteIcon />
          </div>
        </section>

        {/* Global Layout Section */}
        <section className="w-full max-w-[1200px] px-4 md:px-8 lg:px-0 py-16 md:py-20">
          <div className="flex flex-col items-center gap-12 md:gap-16">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-950 text-center">
              {t('globalLayout')}
            </h2>
            <div className="w-full flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                <LocationItem
                  title={t('hongKongHeadquarters')}
                  address={t('hongKongAddress')}
                />
                <LocationItem title={t('usOffice')} address={t('usAddress')} />
                <LocationItem title={t('malaysiaOffice')} address={t('malaysiaAddress')} />
                <LocationItem title={t('mexicoOffice')} address={t('mexicoAddress')} />
              </div>
              <div className="w-full lg:w-[489px] flex-shrink-0">
                <img
                  src={AboutMap}
                  alt="Global map"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Helper Components
function ValueItem({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-white/70" />
      <span className="text-white/70 text-sm md:text-base font-light leading-6">
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-4 bg-white/20 hidden md:block" />;
}

function ContentBlock({ title, content }: { title: string; content: string }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-gray-950 text-xl md:text-2xl font-medium leading-9">
        {title}
      </h3>
      <p className="text-gray-400 text-sm md:text-base font-light leading-6">
        {content}
      </p>
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-blue-600 text-3xl md:text-4xl font-medium leading-tight text-center">
        {value}
      </div>
      <div className="text-gray-400 text-sm md:text-base font-light leading-6 text-center">
        {label}
      </div>
    </div>
  );
}

function AdvantageCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center gap-6 p-8 md:p-10 rounded-2xl bg-gray-50">
      {icon}
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-gray-950 text-lg md:text-2xl font-medium leading-9 text-center">
          {title}
        </h3>
        <p className="text-gray-400 text-sm md:text-base font-light leading-6 text-center">
          {description}
        </p>
      </div>
    </div>
  );
}

function LocationItem({ title, address }: { title: string; address: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 pt-2">
        <MapPin className="w-6 h-6 text-blue-600" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-gray-950 text-xl md:text-2xl font-medium leading-9">
          {title}
        </h3>
        <p className="text-gray-400 text-sm md:text-base font-light leading-6">
          {address}
        </p>
      </div>
    </div>
  );
}

// SVG Icons from Figma
function ShieldCheckIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.8521 19.6339C33.9334 19.7102 33.9366 19.8383 33.8592 19.9185L23.3205 30.8476C23.2406 30.9305 23.1073 30.9289 23.0294 30.8442L16.1339 23.3491C16.0596 23.2684 16.0642 23.1429 16.1441 23.0679L18.8321 20.5437C18.9017 20.4783 19.0079 20.4713 19.0855 20.5269L23.0485 23.3668C23.122 23.4195 23.2218 23.4162 23.2917 23.3589L30.912 17.1117C30.9897 17.0481 31.1025 17.0519 31.1757 17.1206L33.8521 19.6339Z"
        fill="url(#paint0_linear_shield)"
      />
      <path
        d="M36 14.1105L24 11.0636L12 14.1105V27.2746C12 29.2652 12.9875 31.1261 14.6357 32.2423L24 38.5841L33.3643 32.2423C35.0125 31.1261 36 29.2652 36 27.2746V14.1105ZM40 27.2746C40 30.5923 38.3544 33.6944 35.6074 35.5548L25.6826 42.2765C24.6666 42.9646 23.3334 42.9646 22.3174 42.2765L12.3926 35.5548C9.64556 33.6944 8 30.5923 8 27.2746V13.3332C8.00015 11.9609 8.93162 10.7637 10.2617 10.4259L23.2617 7.12419L23.4443 7.08415C23.8116 7.01492 24.1884 7.01492 24.5557 7.08415L24.7383 7.12419L37.7383 10.4259C39.0684 10.7637 39.9999 11.9609 40 13.3332V27.2746Z"
        fill="#09090B"
      />
      <defs>
        <linearGradient
          id="paint0_linear_shield"
          x1="31.5238"
          y1="19.3865"
          x2="25.165"
          y2="26.1581"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2563EB" stopOpacity="0.1" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36 14C36 12.8954 35.1046 12 34 12H14C12.8954 12 12 12.8954 12 14V34C12 35.1046 12.8954 36 14 36H34C35.1046 36 36 35.1046 36 34V14ZM40 34C40 37.3137 37.3137 40 34 40H14C10.6863 40 8 37.3137 8 34V14C8 10.6863 10.6863 8 14 8H34C37.3137 8 40 10.6863 40 14V34Z"
        fill="#09090B"
      />
      <path
        d="M22.9744 25.7213L22.0847 32.3672C22.0587 32.5614 22.2985 32.6733 22.4306 32.5286L29.7461 24.5204C29.8542 24.402 29.7861 24.2109 29.6276 24.1876L26.7699 23.767C26.6362 23.7473 26.5601 23.6034 26.6191 23.4818L29.8695 16.784C29.9317 16.6559 29.8438 16.5057 29.7017 16.4971L21.6798 16.0109C21.5776 16.0047 21.4872 16.0767 21.4704 16.1777L20.0327 24.8189C20.0146 24.9274 20.0876 25.0302 20.1961 25.0488L22.81 25.4977C22.9161 25.5159 22.9887 25.6147 22.9744 25.7213Z"
        fill="url(#paint0_linear_lightning)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_lightning"
          x1="25"
          y1="16"
          x2="25"
          y2="26.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2563EB" stopOpacity="0.1" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.5833 32.4156V35.6143C30.5833 35.7764 30.7661 35.8712 30.8986 35.7778L35.1468 32.7832C35.16 32.7739 35.172 32.7631 35.1826 32.7509L38.2822 29.1837C38.3378 29.1197 38.347 29.0276 38.3052 28.9539L36.6195 25.9832C36.5738 25.9028 36.479 25.8642 36.3902 25.8897L33.462 26.7322C33.3841 26.7546 33.3005 26.7278 33.2501 26.6644L31.5507 24.5254C31.5182 24.4845 31.471 24.4579 31.4191 24.4514L28.0048 24.0216C27.9063 24.0092 27.8136 24.0709 27.7871 24.1665L27.0138 26.9503C27.0047 26.9829 27.0041 27.0173 27.0119 27.0502L27.815 30.4228C27.8268 30.4724 27.8571 30.5156 27.8997 30.5436L30.4932 32.2484C30.5495 32.2854 30.5833 32.3482 30.5833 32.4156Z"
        fill="url(#paint0_linear_globe)"
      />
      <path
        d="M11.0105 23.2325L11.5523 14.0232C11.5563 13.9539 11.596 13.8917 11.6571 13.8588L18.7697 10.029C18.8048 10.0101 18.8447 10.0021 18.8844 10.0061L29.7186 11.0895C29.8559 11.1032 29.9384 11.2487 29.8797 11.3736L27.0323 17.4312C27.0115 17.4755 26.9751 17.5107 26.9301 17.5299L23.5907 18.9611C23.5335 18.9856 23.491 19.0353 23.4756 19.0956L22.7415 21.9757C22.7374 21.9918 22.7353 22.0084 22.7353 22.0251V25.5551C22.7353 25.6135 22.7098 25.6689 22.6655 25.7069L20.8431 27.269C20.8024 27.3039 20.7493 27.321 20.6959 27.3164L17.0832 27.0071C17.0299 27.0026 16.9808 26.9769 16.9466 26.9359L14.5474 24.0569C14.5168 24.0202 14.4741 23.9956 14.4269 23.9877L11.177 23.4415C11.0763 23.4246 11.0045 23.3345 11.0105 23.2325Z"
        fill="url(#paint1_linear_globe)"
      />
      <rect
        x="9"
        y="9"
        width="30"
        height="30"
        rx="15"
        stroke="#09090B"
        strokeWidth="4"
      />
      <defs>
        <linearGradient
          id="paint0_linear_globe"
          x1="28.375"
          y1="24"
          x2="33.875"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2563EB" stopOpacity="0.1" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_globe"
          x1="14.6578"
          y1="14.8431"
          x2="19.475"
          y2="28.1833"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ZeroIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 31C22.0598 31 20.5714 30.4067 19.5349 29.22C18.5116 28.0334 18 26.2991 18 24.0171C18 21.7237 18.5116 19.9837 19.5349 18.7971C20.5714 17.599 22.0598 17 24 17C25.9402 17 27.4219 17.599 28.4452 18.7971C29.4817 19.9837 30 21.7237 30 24.0171C30 26.2991 29.4817 28.0334 28.4452 29.22C27.4219 30.4067 25.9402 31 24 31ZM24 28.022C24.7176 28.022 25.2625 27.6854 25.6346 27.0122C26.0199 26.339 26.2126 25.3407 26.2126 24.0171C26.2126 22.6822 26.0199 21.6781 25.6346 21.0049C25.2625 20.3203 24.7176 19.978 24 19.978C23.2824 19.978 22.7309 20.3203 22.3455 21.0049C21.9734 21.6781 21.7874 22.6822 21.7874 24.0171C21.7874 25.3407 21.9734 26.339 22.3455 27.0122C22.7309 27.6854 23.2824 28.022 24 28.022Z"
        fill="url(#paint0_linear_zero)"
      />
      <path
        d="M37 24C37 16.8203 31.1797 11 24 11C16.8203 11 11 16.8203 11 24C11 31.1797 16.8203 37 24 37V41C14.6112 41 7 33.3888 7 24C7 14.6112 14.6112 7 24 7C33.3888 7 41 14.6112 41 24C41 33.3888 33.3888 41 24 41V37C31.1797 37 37 31.1797 37 24Z"
        fill="#09090B"
      />
      <defs>
        <linearGradient
          id="paint0_linear_zero"
          x1="24"
          y1="17"
          x2="24"
          y2="23.7626"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2563EB" stopOpacity="0.1" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function RmbIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 11C12.8954 11 12 11.8954 12 13L12 35C12 36.1046 12.8954 37 14 37L34 37C35.1046 37 36 36.1046 36 35L36 13C36 11.8954 35.1046 11 34 11L14 11ZM34 7C37.3137 7 40 9.68629 40 13L40 35C40 38.3137 37.3137 41 34 41L14 41C10.6863 41 8 38.3137 8 35L8 13C8 9.68629 10.6863 7 14 7L34 7Z"
        fill="#09090B"
      />
      <path
        d="M30.4397 17.0803C30.528 17.1465 30.5459 17.2719 30.4796 17.3602L28.365 20.1801C28.2661 20.3119 28.3602 20.5001 28.525 20.5001H30.8C30.9105 20.5001 31 20.5896 31 20.7001V24.3001C31 24.4105 30.9105 24.5001 30.8 24.5001H26.7C26.5895 24.5001 26.5 24.5896 26.5 24.7001V25.3001C26.5 25.4105 26.5895 25.5001 26.7 25.5001H30.8C30.9105 25.5001 31 25.5896 31 25.7001V29.3001C31 29.4105 30.9105 29.5001 30.8 29.5001H26.7C26.5895 29.5001 26.5 29.5896 26.5 29.7001V32.8001C26.5 32.9105 26.4105 33.0001 26.3 33.0001H22.7C22.5895 33.0001 22.5 32.9105 22.5 32.8001V29.7001C22.5 29.5896 22.4105 29.5001 22.3 29.5001H18.2C18.0895 29.5001 18 29.4105 18 29.3001V25.7001C18 25.5896 18.0895 25.5001 18.2 25.5001H22.3C22.4105 25.5001 22.5 25.4105 22.5 25.3001V24.7001C22.5 24.5896 22.4105 24.5001 22.3 24.5001H18.2C18.0895 24.5001 18 24.4105 18 24.3001V20.7001C18 20.5896 18.0895 20.5001 18.2 20.5001H20.475C20.6398 20.5001 20.7339 20.3119 20.635 20.1801L18.5204 17.3602C18.4541 17.2719 18.472 17.1465 18.5603 17.0803L21.4396 14.9199C21.528 14.8536 21.6533 14.8715 21.7196 14.9599L24.34 18.4537C24.42 18.5604 24.58 18.5604 24.66 18.4537L27.2804 14.9599C27.3467 14.8715 27.472 14.8536 27.5604 14.9199L30.4397 17.0803Z"
        fill="url(#paint0_linear_rmb)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_rmb"
          x1="24.5"
          y1="14.7999"
          x2="24.5"
          y2="26.5001"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2563EB" stopOpacity="0.1" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FlexibleIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31 35C31 36.5371 31.5788 37.9384 32.5293 39H15.4707C16.4212 37.9384 17 36.5371 17 35H31ZM37.2832 29.0068C37.1893 29.0025 37.0949 29 37 29C35.6342 29 34.3756 29.4571 33.3672 30.2256L26.0918 17.624C27.4064 17.1349 28.5016 16.1981 29.1953 14.999L37.2832 29.0068ZM18.8037 14.999C19.4972 16.1981 20.5929 17.1347 21.9072 17.624L14.6318 30.2256C13.6235 29.4574 12.3655 29 11 29C10.9047 29 10.81 29.0024 10.7158 29.0068L18.8037 14.999Z"
        fill="#09090B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 6C27.3137 6 30 8.68629 30 12C30 13.0929 29.7059 14.1165 29.1953 14.999L37.2832 29.0068C37.1893 29.0025 37.0949 29 37 29C40.3137 29 43 31.6863 43 35C43 38.3137 40.3137 41 37 41C35.2234 41 33.6279 40.2271 32.5293 39H15.4707C14.3721 40.2271 12.7766 41 11 41C7.68629 41 5 38.3137 5 35C5 31.6863 7.68629 29 11 29C10.9047 29 10.81 29.0024 10.7158 29.0068L18.8037 14.999C18.2933 14.1166 18 13.0927 18 12C18 8.68629 20.6863 6 24 6ZM37 33C35.8954 33 35 33.8954 35 35C35 36.1046 35.8954 37 37 37C38.1046 37 39 36.1046 39 35C39 33.8954 38.1046 33 37 33ZM11 33C9.89543 33 9 33.8954 9 35C9 36.1046 9.89543 37 11 37C12.1046 37 13 36.1046 13 35C13 33.8954 12.1046 33 11 33ZM33.3662 30.2246L26.0918 17.624C25.4404 17.8664 24.7359 18 24 18C23.2638 18 22.5589 17.8666 21.9072 17.624L14.6318 30.2256C16.0705 31.3217 17 33.0518 17 35H31C31 33.0521 31.928 31.3207 33.3662 30.2246ZM24 10C22.8954 10 22 10.8954 22 12C22 13.1046 22.8954 14 24 14C25.1046 14 26 13.1046 26 12C26 10.8954 25.1046 10 24 10Z"
        fill="#09090B"
      />
      <path
        d="M23.8304 22.2731C23.9087 22.1472 24.0919 22.1472 24.1701 22.2731L29.8725 31.4443C29.9553 31.5776 29.8595 31.7499 29.7026 31.7499H18.298C18.1411 31.7499 18.0453 31.5776 18.1281 31.4443L23.8304 22.2731Z"
        fill="url(#paint0_linear_flexible)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_flexible"
          x1="24.0003"
          y1="21.9999"
          x2="24.0003"
          y2="32.4999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2563EB" stopOpacity="0.1" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg
      className="absolute right-0 top-0 opacity-10"
      width="136"
      height="136"
      viewBox="0 0 136 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.1">
        <path
          d="M113.9 79C98.6 79 78.2 73.963 78.2 38.7043V-12.9247C78.2 -19.2209 82.0556 -23.0842 88.4 -22.9986H108.8C115.175 -22.9986 119 -19.2209 119 -13.0657V28.6304C119 34.9266 115.175 38.7043 108.8 38.7043C103.7 38.7043 103.7 38.7043 103.7 43.7413V48.7782C103.7 53.8152 108.8 58.8522 113.9 58.8522C119 58.8522 119 58.8925 119 64.0453V73.963C119 79 119 79 113.9 79Z"
          fill="white"
        />
        <path
          d="M52.7 79C37.4 79 17 73.963 17 38.7043V-12.9247C17 -19.2209 20.8607 -23.0842 27.2 -22.9986H47.6C53.975 -22.9986 57.8 -19.2209 57.8 -13.0657V28.6304C57.8 34.9266 53.975 38.7043 47.6 38.7043H43.775C43.775 50.0375 42.5 58.8522 57.8 58.8522V73.963C57.8 79 57.8 79 52.7 79Z"
          fill="white"
        />
      </g>
    </svg>
  );
}
