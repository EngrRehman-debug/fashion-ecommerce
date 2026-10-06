/**
 * Metadata and schema.org helpers shared by every page.
 *
 * Open Graph images come from each route's opengraph-image.tsx file, which
 * Next.js wires into the page metadata automatically.
 */

import type { Metadata } from "next";
import {
  fromPrice,
  getCategory,
  type Product,
} from "./catalog";
import { DEFAULT_LOCALE, LOCALE_TAG, OG_LOCALE, type Locale } from "./i18n/config";
import { getTranslator } from "./i18n/translator";
import {
  ADMIN_WHATSAPP,
  BRAND_NAME,
  COMPANY_NO,
  SITE_URL,
  absoluteUrl,
} from "./site";

/** Both languages share one URL, so the canonical path is the same for each. */
export function pageMetadata({
  title,
  description,
  path,
  locale = DEFAULT_LOCALE,
}: {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: BRAND_NAME,
      locale: OG_LOCALE[locale],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* ---------------------------------------------------------------- schema */

export const ORG_ID = `${SITE_URL}/#organization`;

export function organizationSchema(locale: Locale = DEFAULT_LOCALE) {
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": ORG_ID,
    name: BRAND_NAME,
    legalName: `${BRAND_NAME} (${COMPANY_NO})`,
    url: SITE_URL,
    logo: absoluteUrl("/images/logo.webp"),
    image: absoluteUrl("/images/logo.webp"),
    description: getTranslator(locale).m.site.description,
    telephone: `+${ADMIN_WHATSAPP}`,
    currenciesAccepted: "MYR",
    paymentAccepted: "QR payment",
    address: { "@type": "PostalAddress", addressCountry: "MY" },
    areaServed: "Worldwide",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: `+${ADMIN_WHATSAPP}`,
      availableLanguage: ["English", "Malay"],
    },
    sameAs: [`https://wa.me/${ADMIN_WHATSAPP}`],
  };
}

export function websiteSchema(locale: Locale = DEFAULT_LOCALE) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BRAND_NAME,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    inLanguage: LOCALE_TAG[locale],
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/shop?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/** WebPage-type schema for content pages (AboutPage, ContactPage, FAQPage…). */
export function webPageSchema({
  type = "WebPage",
  name,
  description,
  path,
  locale = DEFAULT_LOCALE,
  extra = {},
}: {
  type?: string;
  name: string;
  description: string;
  path: string;
  locale?: Locale;
  extra?: Record<string, unknown>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": ORG_ID },
    inLanguage: LOCALE_TAG[locale],
    ...extra,
  };
}

export function productSchema(product: Product, locale: Locale = DEFAULT_LOCALE) {
  const t = getTranslator(locale);
  const base = getCategory(product.category)!;
  const category = t.category(base);
  const url = absoluteUrl(`/shop/${product.slug}`);
  const priced = category.options.filter((o) => o.price !== null);
  const offers = priced.length
    ? {
        "@type": "AggregateOffer",
        priceCurrency: "MYR",
        lowPrice: fromPrice(base),
        highPrice: Math.max(...priced.map((o) => o.price as number)),
        offerCount: priced.length,
        availability: "https://schema.org/InStock",
        url,
        seller: { "@id": ORG_ID },
      }
    : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: t.m.product.metaDescription(
      product.name,
      t.motif(product.motif),
      t.colour(product.colour),
      category.name,
      null
    ),
    image: product.images.map((i) => absoluteUrl(i)),
    sku: product.slug,
    brand: { "@type": "Brand", name: BRAND_NAME },
    category: category.name,
    color: t.colour(product.colour),
    pattern: t.motif(product.motif),
    material: base.details.Fabric,
    inLanguage: LOCALE_TAG[locale],
    url,
    ...(offers && { offers }),
  };
}

export function itemListSchema(name: string, products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/shop/${p.slug}`),
      name: p.name,
    })),
  };
}

