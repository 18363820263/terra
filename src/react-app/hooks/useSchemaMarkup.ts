import { useEffect } from 'react';
import type { Schema } from '@/lib/schema/types';

/**
 * Custom hook to inject Schema.org structured data into the document head
 * Automatically cleans up when component unmounts or schemas change
 */
export function useSchemaMarkup(schemas: Schema | Schema[]) {
  useEffect(() => {
    const schemaArray = Array.isArray(schemas) ? schemas : [schemas];
    const scriptTags: HTMLScriptElement[] = [];

    // Inject each schema as a JSON-LD script tag
    schemaArray.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema, null, 2);
      document.head.appendChild(script);
      scriptTags.push(script);
    });

    // Cleanup function to remove script tags when component unmounts
    return () => {
      scriptTags.forEach((script) => {
        if (script.parentNode) {
          document.head.removeChild(script);
        }
      });
    };
  }, [schemas]);
}
