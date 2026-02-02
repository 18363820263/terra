import React from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useLanguage } from '@/locales/LanguageContext';
import { useMemo } from 'react';
import { useSchemaMarkup } from '@/hooks/useSchemaMarkup';
import { generateBreadcrumbSchema } from '@/lib/schema/generators/breadcrumb';

interface BreadcrumbNavItem {
  label: string;
  path: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbNavItem[];
  className?: string;
}

/**
 * Breadcrumb navigation component with Schema.org structured data
 * Automatically includes home page as the first item
 */
export function BreadcrumbNav({ items, className }: BreadcrumbNavProps) {
  const { t } = useLanguage();

  // Build breadcrumb items with home page
  const breadcrumbItems = useMemo(() => {
    const homeItem: BreadcrumbNavItem = {
      label: t('home'),
      path: '/',
    };
    return [homeItem, ...items];
  }, [items, t]);

  // Generate Schema.org BreadcrumbList structured data
  const breadcrumbSchema = useMemo(() => {
    return generateBreadcrumbSchema(
      breadcrumbItems.map((item) => ({
        name: item.label,
        url: item.path,
      }))
    );
  }, [breadcrumbItems]);

  // Inject Schema.org markup
  useSchemaMarkup(breadcrumbSchema);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          return (
            <React.Fragment key={item.path}>
              {isLast ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={item.path}>{item.label}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
