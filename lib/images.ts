/**
 * Editorial imagery — hero, heritage and newsletter sections. Product photos
 * that rotate in those sections come from the catalogue (categorySlides).
 *
 * These are the styled lifestyle shots (shirt-01..14). Journal card images
 * are set in data/journal.json. Everything that is actually *sold* lives in
 * data/products.json.
 */

const img = (n: number) =>
  `/images/editorial/shirt-${String(n).padStart(2, "0")}.webp`;

export const IMAGES = {
  hero: img(1), // green geometric, styled
  // Where the photo anchors ("Shop the look") lead.
  heroHref: "/shop?category=batik-pawang",
  heritageHref: "/shop?category=batik-pawang",
  heritageA: img(5), // teal patchwork, styled
  heritageB: img(14), // brown, styled
  newsletter: "/images/products/set-bunga-kertas/1.webp", // lifestyle shoot
  logo: "/images/logo.webp",
  fallback: "/images/hero.svg",
} as const;
