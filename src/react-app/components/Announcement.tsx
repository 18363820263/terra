import { Volume2, ChevronRight } from "lucide-react";
import { useLanguage } from "@/locales/LanguageContext";

export default function Announcement() {
  const { t } = useLanguage();
  return (
    <div className="hidden lg:block absolute top-[592px] left-0 right-0 z-40 bg-black/40 backdrop-blur-sm">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[120px] h-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-white" />
          <span className="text-white text-sm md:text-base font-light leading-6">
            {t('latestNews')}
          </span>
        </div>
        <button className="flex items-center justify-center gap-3 hover:opacity-80 transition-opacity">
          <span className="text-white text-sm md:text-base font-light leading-6">
            {t('moreNews')}
          </span>
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
