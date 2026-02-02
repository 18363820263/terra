import { useLanguage } from "@/locales/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full">
      {/* Copyright Section */}
      <div className="bg-gray-50 h-32 flex flex-col items-center justify-center gap-0.5">
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
