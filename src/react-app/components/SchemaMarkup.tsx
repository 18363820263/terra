import type { Schema } from '@/lib/schema/types';

interface SchemaMarkupProps {
  schema: Schema | Schema[];
}

/**
 * Component to render Schema.org structured data as JSON-LD
 * Can be used as an alternative to the useSchemaMarkup hook
 */
export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  const schemaArray = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemaArray.map((s, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(s, null, 2),
          }}
        />
      ))}
    </>
  );
}
