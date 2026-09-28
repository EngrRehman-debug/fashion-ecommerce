import { CATEGORIES, PRODUCTS, STARTING_PRICE, formatMYR } from "@/lib/catalog";
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Shop all batik from CWSK Enterprises";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "The Collection",
    title: "Shop All Batik",
    subtitle: `${PRODUCTS.length} hand-dyed designs across ${CATEGORIES.length} ranges.`,
    image: "/images/products/api-tropika/1.webp",
    footer: `From ${formatMYR(STARTING_PRICE)}`,
  });
}
