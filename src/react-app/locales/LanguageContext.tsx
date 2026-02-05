import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { zhCN } from './zh-CN';
import { enUS } from './en-US';
import { zhTW } from './zh-TW';
import { esES } from './es-ES';

export type Language = 'zh-CN' | 'en-US' | 'zh-TW' | 'es-ES';

export type TranslationKeys = keyof typeof zhCN;

export type Translations = Partial<typeof zhCN>;

interface LanguageContextType {
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
  t: (key: TranslationKeys) => string | any;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // 从localStorage获取语言偏好，默认中文
  // 在 SSR 环境中，localStorage 不存在，使用默认值
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      return (savedLanguage as Language) || 'en-US';
    }
    return 'en-US'; // SSR 默认使用英文
  });

  // 获取当前语言的翻译
  const getTranslations = (language: Language): Translations => {
    switch (language) {
      case 'en-US':
        return enUS;
      case 'zh-TW':
        return zhTW;
      case 'es-ES':
        return esES;
      case 'zh-CN':
      default:
        return zhCN;
    }
  };

  const translations = getTranslations(currentLanguage);

  // 翻译函数
  const t = (key: TranslationKeys): string | any => {
    return translations[key] || zhCN[key] || key;
  };

  // 当语言变化时，保存到localStorage（仅在浏览器环境中）
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', currentLanguage);
    }
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
