/**
 * Product catalogue — typed access to the data in /data.
 *
 * The data itself lives in JSON:
 *   data/categories.json — ranges, their buying options (price, size) and details
 *   data/products.json   — every design that is sold
 *
 * To add a product: put its photos in /public/images/products/<slug>/ as
 * 1.webp, 2.webp … (product page, ≤100KB) plus 1-sm.webp, 2-sm.webp …
 * (cards and thumbnails, ~50KB), then append an entry to data/products.json
 * with a unique `slug`. The first image is the cover. Everything else — the
 * shop grid, filters, product pages and WhatsApp ordering — picks it up
 * automatically. Colour filters are built from each product's `family`.
 *
 * To add a category: append to data/categories.json and tag products with its
 * id. A `price` of null shows "Price on request" and is confirmed on WhatsApp.
 */

import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";

/** One way to buy a product, e.g. "Unstitched" or "Stitched to size". */
export type Option = {
  id: string;
  label: string;
  /** Short line under the label, e.g. "Fabric only". */
  note: string;
  /** Price in MYR, or null while it is still to be confirmed. */
  price: number | null;
  /** Whether the customer must pick one of the category's sizes. */
  needsSize: boolean;
};

export type Category = {
  id: string;
  name: string;
  tagline: string;
  sizes: string[];
  options: Option[];
  /** Extra rows for the product page, e.g. { "Fabric": "Premium cotton" }. */
  details: Record<string, string>;
  /** Optional image for category tiles; defaults to the first product's photo. */
  cover?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  /** Specific shade, shown on the product page. */
  colour: string;
  /** Broad colour group, used by the shop filter. */
  family: string;
  motif: string;
  /** Full-size photos; the first is the cover. */
  images: string[];
};

// JSON imports infer a loose union type; the checks below make the cast safe.
export const CATEGORIES = categoriesData as unknown as Category[];

export const PRODUCTS: Product[] = productsData;

/** Fail the build early, with a clear message, if the JSON is inconsistent. */
function validate() {
  const ids = new Set(CATEGORIES.map((c) => c.id));
  const slugs = new Set<string>();
  for (const c of CATEGORIES) {
    if (!c.options?.length) throw new Error(`Category "${c.id}" has no options`);
    if (c.options.some((o) => o.needsSize) && !c.sizes.length)
      throw new Error(`Category "${c.id}" needs sizes for its options`);
  }
  for (const p of PRODUCTS) {
    if (slugs.has(p.slug)) throw new Error(`Duplicate product slug "${p.slug}"`);
    slugs.add(p.slug);
    if (!ids.has(p.category))
      throw new Error(`Product "${p.slug}" has unknown category "${p.category}"`);
    if (!p.images.length) throw new Error(`Product "${p.slug}" has no images`);
  }
}
validate();

/** Card/thumbnail version of a product photo ("1.webp" → "1-sm.webp"). */
export function thumb(src: string) {
  return src.replace(/\.webp$/, "-sm.webp");
}

/** Lowest known price in a category, or null if none is set yet. */
export function fromPrice(category: Category) {
  const prices = category.options
    .map((o) => o.price)
    .filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
}

/** Lowest price across all categories — for "from RM …" copy. */
export const STARTING_PRICE = Math.min(
  ...CATEGORIES.map(fromPrice).filter((p): p is number => p !== null)
);

/** MYR currency formatter — "RM 250", or "Price on request" when unset. */
export function formatMYR(amount: number | null) {
  return amount === null
    ? "Price on request"
    : `RM ${amount.toLocaleString("en-MY")}`;
}

export function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Colour families that actually appear in a category. */
export function familiesFor(categoryId?: string) {
  const pool = categoryId
    ? PRODUCTS.filter((p) => p.category === categoryId)
    : PRODUCTS;
  return [...new Set(pool.map((p) => p.family))].sort();
}

export function productsIn(categoryId: string) {
  return PRODUCTS.filter((p) => p.category === categoryId);
}

/** Case-insensitive match on name, colour, motif and range — every word must match. */
export function searchProducts(query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return PRODUCTS.filter((p) => {
    const hay = `${p.name} ${p.colour} ${p.family} ${p.motif} ${getCategory(p.category)?.name ?? ""}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
}

/** Price line for a product card: "RM 180", "From RM 250" or "Price on request". */
export function cardPriceText(product: Product) {
  const category = getCategory(product.category);
  if (!category) return "";
  const from = fromPrice(category);
  const prices = new Set(category.options.map((o) => o.price));
  return from !== null && prices.size > 1 ? `From ${formatMYR(from)}` : formatMYR(from);
}

/** A few cover photos from one category, for rotating editorial images. */
export function categorySlides(categoryId: string, count = 5, small = true) {
  return productsIn(categoryId)
    .slice(0, count)
    .map((p) => ({
      src: small ? thumb(p.images[0]) : p.images[0],
      alt: `${p.name} — ${p.motif}`,
      href: `/shop/${p.slug}`,
      name: p.name,
    }));
}

/** "1 design" / "12 designs". */
export const designs = (n: number) => `${n} ${n === 1 ? "design" : "designs"}`;

/** Photo that represents a category: its `cover`, else its first product's. */
export function categoryCover(category: Category) {
  return category.cover ?? productsIn(category.id)[0]?.images[0] ?? "/images/hero.svg";
}
