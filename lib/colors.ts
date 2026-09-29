/**
 * Swatch colours for the shop filter (by family) and the product page (by
 * the product's own colour name). Two-tone names ("Navy & pink") become a
 * split circle; multicolour names a colour wheel.
 */

const RAINBOW = "conic-gradient(#B3262E,#E0A43A,#3F7D4E,#2A5CAB,#8E3F8F,#B3262E)";

/** Filter swatch for each colour family in data/products.json. */
export const FAMILY_SWATCH: Record<string, string> = {
  "Black & White": "linear-gradient(135deg,#15171B 50%,#F3EEE6 50%)",
  Blue: "#2A5CAB",
  Earth: "#9A6B3F",
  Green: "#3F7D4E",
  Multi: RAINBOW,
  "Pink & Purple": "#B04A8F",
  Red: "#B3262E",
};

/** Single shades, by the words used in product colour names. */
const SHADE: Record<string, string> = {
  beige: "#D8C6A4",
  black: "#15171B",
  blue: "#2A5CAB",
  "brick red": "#9C3B2E",
  brown: "#6B4428",
  charcoal: "#36383D",
  cobalt: "#1F4FB4",
  "coffee brown": "#5A3B25",
  "coral red": "#E0524A",
  cream: "#EFE6D2",
  crimson: "#A51C30",
  "dark olive": "#4A4A26",
  "dark teal": "#1E4E4F",
  "deep purple": "#4B2463",
  "forest green": "#285C3A",
  gold: "#C49A3A",
  green: "#3F7D4E",
  grey: "#8C8C8C",
  "grey blue": "#6A7F99",
  lilac: "#C3A3D6",
  magenta: "#B0306E",
  maroon: "#6E1F2B",
  mauve: "#8E6D86",
  mustard: "#C9962B",
  navy: "#1D2C55",
  neutral: "#B9AE9C",
  olive: "#6E6B2E",
  "olive brown": "#6A5A2E",
  orange: "#D9722A",
  "pale blue": "#A9C6E8",
  pink: "#D9588F",
  plum: "#6B2D5C",
  purple: "#6E3A8E",
  red: "#B3262E",
  "royal blue": "#2350B9",
  "rust brown": "#8B4A25",
  sage: "#A3B19A",
  "sage grey": "#A7AEA0",
  sand: "#CDB791",
  "sky blue": "#5FA8DA",
  "steel blue": "#4E7196",
  tan: "#B48A5E",
  teal: "#1E7F7C",
  "teal green": "#2C7A63",
  terracotta: "#C0603F",
  turquoise: "#2BB3C0",
  violet: "#7A4BC4",
  white: "#F6F4EF",
  yellow: "#E4B92B",
};

/** CSS background for a product's colour, falling back to its family. */
export function colourSwatch(colour: string, family: string): string {
  const name = colour.toLowerCase().trim();
  if (/multi|monochrome/.test(name)) {
    if (name.startsWith("black") || name === "monochrome") return FAMILY_SWATCH["Black & White"];
    if (name.startsWith("dark") || name.startsWith("navy")) return `conic-gradient(${SHADE.navy} 0 50%,#B3262E 0 67%,#E0A43A 0 84%,#3F7D4E 0)`;
    return RAINBOW;
  }
  if (SHADE[name]) return SHADE[name];
  const parts = name.split(/\s*&\s*/).map((p) => SHADE[p]).filter(Boolean);
  if (parts.length === 2) return `linear-gradient(135deg,${parts[0]} 50%,${parts[1]} 50%)`;
  return FAMILY_SWATCH[family] ?? "#ccc";
}
