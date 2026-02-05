import { useLanguage } from "@/locales/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { path: '/agentic-pay', label: t('agenticPay') },
    { path: '/blogs', label: t('blogs') },
    { path: '/cooperation', label: t('cooperation') },
    { path: '/about', label: t('about') },
  ];

  return (
    <footer className="w-full">
      {/* Quick Links Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-[120px] py-8 md:py-12">
          <h3 className="text-gray-900 text-sm md:text-base font-medium mb-4 md:mb-6">
            {t('quickLinks')}
          </h3>
          <nav className="flex flex-wrap gap-4 md:gap-6 lg:gap-8">
            {quickLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="text-gray-600 hover:text-gray-900 text-sm md:text-base font-light transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-50 py-8 md:py-10 flex flex-col items-center justify-center gap-0.5">
        <div className="flex items-start justify-center gap-1">
          <span className="text-gray-950 text-center text-xs font-light leading-[18px]">
            {t('serviceHotline')}
          </span>
          <span className="text-gray-950 text-center text-xs font-light leading-[18px]">
            {t('wechat')}
          </span>
        </div>
        <p className="text-gray-400 text-center text-xs font-light leading-[18px]">
          {t('copyright')}
        </p>
        <p className="text-gray-400 text-center text-xs font-light leading-[18px]">
          {t('businessLicense')}
        </p>
      </div>
    </footer>
  );
}
