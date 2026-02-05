import { useEffect } from 'react';

export interface TDKConfig {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

/**
 * Custom hook to manage page TDK (Title, Description, Keywords) and Open Graph meta tags
 * Automatically updates document head meta tags when component mounts or config changes
 * Safe for SSR - only runs in browser environment
 */
export function useTDK(config: TDKConfig) {
  useEffect(() => {
    // Skip in SSR environment (document doesn't exist)
    if (typeof document === 'undefined') {
      return;
    }

    // Update title
    document.title = config.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', config.description);
    updateMetaTag('keywords', config.keywords);

    // Open Graph meta tags
    updateMetaTag('og:title', config.ogTitle || config.title, 'property');
    updateMetaTag('og:description', config.ogDescription || config.description, 'property');
    updateMetaTag('og:type', 'website', 'property');
    if (config.ogImage) {
      updateMetaTag('og:image', config.ogImage, 'property');
    }
    if (config.ogUrl) {
      updateMetaTag('og:url', config.ogUrl, 'property');
    }

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image', 'property');
    updateMetaTag('twitter:title', config.twitterTitle || config.title, 'property');
    updateMetaTag('twitter:description', config.twitterDescription || config.description, 'property');
    if (config.twitterImage) {
      updateMetaTag('twitter:image', config.twitterImage, 'property');
    }
    if (config.ogUrl) {
      updateMetaTag('twitter:url', config.ogUrl, 'property');
    }
  }, [config]);
}
