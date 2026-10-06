/**
 * Site languages.
 *
 * URLs are the same in every language: the choice is kept in the LOCALE_COOKIE
 * cookie and middleware.ts rewrites each request to /<locale>/… internally, so
 * both languages are statically generated under app/[locale]. Malay is written
 * left-to-right in Latin script, so layout direction never changes.
 */

export const LOCALES = ["en", "ms"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "lang";

export const isLocale = (v: unknown): v is Locale => LOCALES.includes(v as Locale);

/** Short code on the switcher ("BM" is how Malaysians label Bahasa Melayu). */
export const LOCALE_LABEL: Record<Locale, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  ms: { short: "BM", name: "Bahasa Melayu" },
};

/** BCP 47 tags for <html lang>, Intl formatting and schema.org. */
export const LOCALE_TAG: Record<Locale, string> = { en: "en-MY", ms: "ms-MY" };

/** Open Graph locale codes. */
export const OG_LOCALE: Record<Locale, string> = { en: "en_MY", ms: "ms_MY" };
