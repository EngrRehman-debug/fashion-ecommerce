/**
 * Long-form site content (data/*.json) in the requested language.
 *
 * data/ms/<file>.json mirrors data/<file>.json but holds only the text; it is
 * laid over the English file field by field (arrays by position), so images,
 * links and colours are defined once and a missing Malay string falls back to
 * English instead of breaking the page.
 */

import faq from "@/data/faq.json";
import footer from "@/data/footer.json";
import heritage from "@/data/heritage.json";
import hero from "@/data/hero.json";
import journal from "@/data/journal.json";
import navigation from "@/data/navigation.json";
import services from "@/data/services.json";
import testimonials from "@/data/testimonials.json";
import msFaq from "@/data/ms/faq.json";
import msFooter from "@/data/ms/footer.json";
import msHeritage from "@/data/ms/heritage.json";
import msHero from "@/data/ms/hero.json";
import msJournal from "@/data/ms/journal.json";
import msNavigation from "@/data/ms/navigation.json";
import msServices from "@/data/ms/services.json";
import msTestimonials from "@/data/ms/testimonials.json";
import type { Locale } from "./config";

const EN = { faq, footer, heritage, hero, journal, navigation, services, testimonials };
const MS = {
  faq: msFaq,
  footer: msFooter,
  heritage: msHeritage,
  hero: msHero,
  journal: msJournal,
  navigation: msNavigation,
  services: msServices,
  testimonials: msTestimonials,
};

export type Content = typeof EN;

/** Lay `over` onto `base`, keeping base's shape: only strings that exist in base are replaced. */
function overlay<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base)) {
    const items = Array.isArray(over) ? over : [];
    return base.map((b, i) => overlay(b, items[i])) as T;
  }
  if (base && typeof base === "object") {
    const src = over as Record<string, unknown>;
    const out = { ...base } as Record<string, unknown>;
    for (const key of Object.keys(out)) out[key] = overlay(out[key], src[key]);
    return out as T;
  }
  return (typeof over === typeof base ? over : base) as T;
}

const CONTENT: Record<Locale, Content> = {
  en: EN,
  ms: overlay(EN, MS),
};

export function getContent(locale: Locale): Content {
  return CONTENT[locale];
}
