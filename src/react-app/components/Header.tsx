import { Link, useLocation } from "react-router-dom";
import { Globe, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/locales/LanguageContext";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { currentLanguage, setCurrentLanguage, t } = useLanguage();

  const isActive = (path: string) => currentPath === path;

  // 语言配置
  const languages = [
    { code: 'zh-CN', name: '简体中文' },
    { code: 'en-US', name: 'English' },
    { code: 'zh-TW', name: '繁體中文' },
    { code: 'es-ES', name: 'Español' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // 获取banner元素
      const banner = document.querySelector<HTMLElement>('section.relative.w-full');
      if (banner) {
        const bannerHeight = banner.offsetHeight;
        // 当滚动距离超过banner高度时，设置isScrolled为true
        setIsScrolled(window.scrollY > bannerHeight - (headerRef.current?.offsetHeight || 80));
      }
    };

    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll);
    // 初始化时检查一次
    handleScroll();

    // 清理事件监听
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]); // 当路径变化时重新初始化

  // 当路径变化时，滚动到页面顶部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  // 切换语言
  const changeLanguage = (language: string) => {
    setCurrentLanguage(language as any);
    setIsLanguageOpen(false);
  };

  return (
    <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/50' : 'bg-black/10'} backdrop-blur`}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[120px] h-20 flex items-center justify-end gap-2 relative">
        <nav className="flex items-start gap-4 md:gap-6 lg:gap-10">
          <Link
            to="/"
            className={`text-sm relative md:text-base font-normal leading-6 transition-colors ${isActive("/") ? "text-white" : "text-white/70 hover:text-white"}`}
          >
            <span>{t('home')}</span>
            {isActive("/") && (
              <div className="absolute bottom-[-28px] w-full flex justify-center">
                <div className=" w-6 h-1 bg-white" />
              </div>
            )}
          </Link>
          <Link
            to="/cooperation"
            className={`text-sm relative md:text-base font-normal leading-6 transition-colors ${isActive("/cooperation") ? "text-white" : "text-white/70 hover:text-white"}`}
          >
            {t('cooperation')}
            {isActive("/cooperation") && (
              <div className="absolute bottom-[-28px] w-full flex justify-center">
                <div className=" w-6 h-1 bg-white" />
              </div>
            )}
          </Link>
          <Link
            to="/about"
            className={`text-sm relative md:text-base font-normal leading-6 transition-colors ${isActive("/about") ? "text-white" : "text-white/70 hover:text-white"}`}
          >
            {t('about')}
            {isActive("/about") && (
              <div className="absolute bottom-[-28px] w-full flex justify-center">
                <div className=" w-6 h-1 bg-white" />
              </div>
            )}
          </Link>
        </nav>

        {/* Language switcher - outside nav for proper positioning */}
        <div className="relative ml-10">
          <button
            className="hidden md:flex items-center gap-3 text-white/70 hover:text-white transition-colors"
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          >
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span className="text-sm md:text-base font-normal leading-6">
                {languages.find(lang => lang.code === currentLanguage)?.name || '中文'}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Language dropdown */}
          {isLanguageOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white backdrop-blur-sm rounded-lg shadow-lg p-3 z-50">
              {languages.map((lang) => (
                <button 
                  key={lang.code}
                  className={`flex relative border-b border-gray-100 last:border-b-0 items-center gap-3 px-4 py-2 text-sm md:text-base text-nowrap font-normal leading-6 transition-colors w-full justify-start ${currentLanguage === lang.code ? 'text-[#2563EB]' : 'text-black/70 hover:text-[#2563EB]/80 hover:bg-white/10'}`}
                  onClick={() => changeLanguage(lang.code)}
                >
                  <span>{lang.name}</span>
                  {currentLanguage === lang.code && (
                    <span className="active-block absolute top-[50%] translate-y-[-50%] translate-x-[-12px] left-0 w-[3px] h-[12px] bg-[#2563EB]"></span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
