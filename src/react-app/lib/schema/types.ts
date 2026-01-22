/**
 * TypeScript interfaces for Schema.org structured data types
 * Based on https://schema.org specifications
 */

export type Language = 'zh-CN' | 'en-US' | 'zh-TW' | 'es-ES';

export interface Thing {
  '@context'?: string;
  '@type': string;
  '@id'?: string;
  name?: string;
  description?: string;
  url?: string;
  image?: string | string[];
  inLanguage?: Language;
}

export interface Organization extends Thing {
  '@type': 'Organization';
  legalName?: string;
  logo?: string | ImageObject;
  email?: string;
  telephone?: string;
  address?: PostalAddress | PostalAddress[];
  location?: Place | Place[];
  contactPoint?: ContactPoint | ContactPoint[];
  sameAs?: string[];
  foundingDate?: string;
  numberOfEmployees?: string;
  areaServed?: string | string[];
}

export interface WebSite extends Thing {
  '@type': 'WebSite';
  potentialAction?: SearchAction;
}

export interface SearchAction {
  '@type': 'SearchAction';
  target?: {
    '@type': 'EntryPoint';
    urlTemplate: string;
  };
  'query-input'?: string;
}

export interface Service extends Thing {
  '@type': 'Service';
  provider?: Organization;
  serviceType?: string;
  areaServed?: string | string[];
  offers?: Offer;
  aggregateRating?: AggregateRating;
}

export interface Product extends Thing {
  '@type': 'Product';
  brand?: Organization;
  offers?: Offer;
  aggregateRating?: AggregateRating;
  category?: string;
}

export interface Offer {
  '@type': 'Offer';
  price?: string;
  priceCurrency?: string;
  availability?: string;
  url?: string;
}

export interface AggregateRating {
  '@type': 'AggregateRating';
  ratingValue: string;
  reviewCount: string;
  bestRating?: string;
  worstRating?: string;
}

export interface ContactPage extends Thing {
  '@type': 'ContactPage';
  mainEntity?: Organization;
}

export interface WebPage extends Thing {
  '@type': 'WebPage';
  mainEntity?: Thing;
  breadcrumb?: BreadcrumbList;
}

export interface Place extends Thing {
  '@type': 'Place';
  address?: PostalAddress;
  geo?: GeoCoordinates;
  telephone?: string;
}

export interface PostalAddress {
  '@type': 'PostalAddress';
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

export interface GeoCoordinates {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}

export interface ContactPoint {
  '@type': 'ContactPoint';
  contactType: string;
  email?: string;
  telephone?: string;
  areaServed?: string | string[];
  availableLanguage?: string | string[];
}

export interface BreadcrumbList {
  '@type': 'BreadcrumbList';
  itemListElement: ListItem[];
}

export interface ListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

export interface FAQPage extends Thing {
  '@type': 'FAQPage';
  mainEntity: Question[];
}

export interface Question {
  '@type': 'Question';
  name: string;
  acceptedAnswer: Answer;
}

export interface Answer {
  '@type': 'Answer';
  text: string;
}

export interface ImageObject {
  '@type': 'ImageObject';
  url: string;
  width?: number;
  height?: number;
}

export type Schema =
  | Organization
  | WebSite
  | Service
  | Product
  | ContactPage
  | WebPage
  | Place
  | BreadcrumbList
  | FAQPage;
