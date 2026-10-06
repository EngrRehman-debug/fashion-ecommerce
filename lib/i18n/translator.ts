/**
 * Everything a component needs to show text in one language: the interface
 * dictionary (`m`), the long-form content, and the catalogue in that language.
 *
 * The catalogue itself (lib/catalog.ts) stays in English — ids, colour
 * families and filters key off it — and these helpers translate only what is
 * displayed. Use from server components via getT() (lib/i18n/server.ts) and
 * from client components via useT() (lib/i18n/client.tsx).
 */

import msCatalog from "@/data/ms/catalog.json";
import { CATEGORIES, fromPrice, getCategory, type Audience, type Category, type Option, type Product } from "@/lib/catalog";
import type { Locale } from "./config";
import { getContent } from "./content";
import { en, type Messages } from "./messages/en";
import { ms } from "./messages/ms";

type CategoryText = {
  name?: string;
  tagline?: string;
  options?: Record<string, { label?: string; note?: string }>;
  /** Replaces the English details table as a whole (its labels are translated too). */
  details?: Record<string, string>;
};

type CatalogText = {
  categories: Record<string, CategoryText>;
  families: Record<string, string>;
  colours: Record<string, string>;
  motifs: Record<string, string>;
};

const MESSAGES: Record<Locale, Messages> = { en, ms };
const CATALOG_TEXT: Record<Locale, CatalogText | null> = { en: null, ms: msCatalog };

function createTranslator(locale: Locale) {
  const m = MESSAGES[locale];
  const text = CATALOG_TEXT[locale];
  const categoryCache = new Map<string, Category>();

  /** The category with its name, tagline, options and details in this language. */
  const category = (c: Category): Category => {
    const hit = categoryCache.get(c.id);
    if (hit) return hit;
    const tr = text?.categories[c.id];
    const localized: Category = tr
      ? {
          ...c,
          name: tr.name ?? c.name,
          tagline: tr.tagline ?? c.tagline,
          details: tr.details ?? c.details,
          options: c.options.map((o) => ({ ...o, ...tr.options?.[o.id] })),
        }
      : c;
    categoryCache.set(c.id, localized);
    return localized;
  };

  const money = (amount: number | null) =>
    amount === null ? m.common.priceOnRequest : `RM ${amount.toLocaleString("en-MY")}`;

  return {
    locale,
    m,
    content: getContent(locale),

    category,
    categoryOf: (p: Product) => category(getCategory(p.category)!),
    categories: CATEGORIES.map(category),
    /** A buying option of a category, in this language. */
    option: (categoryId: string, o: Option): Option =>
      category(getCategory(categoryId)!).options.find((x) => x.id === o.id) ?? o,
    audience: (id: Audience) => m.audience[id],

    colour: (s: string) => text?.colours[s] ?? s,
    motif: (s: string) => text?.motifs[s] ?? s,
    family: (s: string) => text?.families[s] ?? s,

    money,
    designs: m.common.designs,
    /** Price line for a product card: "RM 180", "From RM 250" or "Price on request". */
    cardPrice: (p: Product) => {
      const c = getCategory(p.category);
      if (!c) return "";
      const from = fromPrice(c);
      const prices = new Set(c.options.map((o) => o.price));
      return from !== null && prices.size > 1 ? m.common.from(money(from)) : money(from);
    },
  };
}

export type Translator = ReturnType<typeof createTranslator>;

const TRANSLATORS = new Map<Locale, Translator>();

export function getTranslator(locale: Locale): Translator {
  let t = TRANSLATORS.get(locale);
  if (!t) TRANSLATORS.set(locale, (t = createTranslator(locale)));
  return t;
}
