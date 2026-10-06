import { CATEGORIES, PRODUCTS, STARTING_PRICE } from "@/lib/catalog";
import { toLocale } from "@/lib/i18n/server";
import { getTranslator } from "@/lib/i18n/translator";
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Shop all batik from CWSK Enterprises";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const t = getTranslator(toLocale((await params).locale));
  return renderOg({
    eyebrow: t.m.nav.collectionEyebrow,
    title: t.m.shop.metaTitle,
    subtitle: t.m.shop.ogImage.subtitle(PRODUCTS.length, CATEGORIES.length),
    image: "/images/products/api-tropika/1.webp",
    footer: t.m.common.from(t.money(STARTING_PRICE)),
  });
}
