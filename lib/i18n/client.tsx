"use client";

/** Language for client components: the layout provides it, useT() reads it. */

import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale } from "./config";
import { getTranslator } from "./translator";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useT() {
  return getTranslator(useLocale());
}

/**
 * Switch language: save the choice and reload, so every part of the page —
 * server-rendered content included — comes back in the new language.
 */
export function changeLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  window.location.reload();
}
