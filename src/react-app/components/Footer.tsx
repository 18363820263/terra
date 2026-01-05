import { useLanguage } from "@/locales/LanguageContext";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full">
      {/* CTA Section */}
      <div className="bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/f4218c37bce4d13e67ea84546fb539b500868111?width=640"
            alt=""
            className="w-full h-full object-cover rotate-90"
          />
        </div>
        <div className="relative max-w-[1200px] mx-auto py-12 md:py-[72px]">
          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col md:flex-row justify-between items-start w-full gap-10 md:gap-4">
              <div className="flex flex-col items-center gap-4 flex-1">
                <div className="flex flex-col items-center w-full">
                  <div className="flex items-center justify-center opacity-40 drop-shadow-md">
                    <span className="text-white text-center text-4xl md:text-5xl font-semibold leading-[72px] h-[36px] overflow-hidden">
                      1
                    </span>
                  </div>
                  <div className="h-px w-full bg-white/20" />
                </div>
                <p className="text-white text-base md:text-xl font-normal leading-[30px] text-center">
                  {t('footerStep1')}
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 flex-2">
                <div className="flex flex-col items-center w-full">
                  <div className="flex items-center justify-center opacity-40 drop-shadow-md">
                    <span className="text-white text-center text-4xl md:text-5xl font-semibold leading-[72px] h-[36px] overflow-hidden">
                      2
                    </span>
                  </div>
                  <div className="h-px w-full bg-white/20" />
                </div>
                <p className="text-white text-base md:text-xl font-normal leading-[30px] text-center text-nowrap">
                  {t('footerStep2')}
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 flex-1">
                <div className="flex flex-col items-center w-full">
                  <div className="flex items-center justify-center opacity-40 drop-shadow-md">
                    <span className="text-white text-center text-4xl md:text-5xl font-semibold leading-[72px] h-[36px] overflow-hidden">
                      3
                    </span>
                  </div>
                  <div className="h-px w-full bg-white/20" />
                </div>
                <p className="text-white text-base md:text-xl font-normal leading-[30px] text-center">
                  {t('footerStep3')}
                </p>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 px-6 h-12 rounded-lg bg-blue-600 shadow-[inset_-1px_-2px_2px_0_#1051DE] hover:bg-blue-700 transition-colors">
              <Link className="text-white text-xl font-normal leading-[30px]" to="/cooperation">
                {t('contact')}
              </Link>
            </button>
          </div>
        </div>
      </div>

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
