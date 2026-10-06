/**
 * Language for server components.
 *
 * Every page and layout under app/[locale] calls initLocale(params) first; any
 * server component rendered below it can then call getT() without being passed
 * the locale. (Pages and layouts can render separately during client
 * navigation, which is why each one sets it, not just the layout.)
 */

import { cache } from "react";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";
import { getTranslator } from "./translator";

const requestLocale = cache(() => ({ current: DEFAULT_LOCALE as Locale }));

export type LocaleParams = { params: Promise<{ locale: string }> };

export function toLocale(value: string): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Read the [locale] segment, remember it for this request and return its translator. */
export async function initLocale(params: Promise<{ locale: string }>) {
  const locale = toLocale((await params).locale);
  requestLocale().current = locale;
  return getTranslator(locale);
}

export function getLocale(): Locale {
  return requestLocale().current;
}

export function getT() {
  return getTranslator(getLocale());
}
