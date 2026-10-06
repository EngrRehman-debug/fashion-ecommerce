import { PRODUCTS, fromPrice, getCategory, getProduct } from "@/lib/catalog";
import { toLocale } from "@/lib/i18n/server";
import { getTranslator } from "@/lib/i18n/translator";
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Batik by CWSK Enterprises";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type Params = { locale: string; slug: string };

export default async function Image({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const t = getTranslator(toLocale(locale));
  const product = getProduct(slug);
  const base = product && getCategory(product.category);
  if (!product || !base) {
    return renderOg({ eyebrow: "CWSK Enterprises", title: t.m.site.ogImage.eyebrow, image: "/images/editorial/shirt-01.webp" });
  }
  const price = fromPrice(base);
  return renderOg({
    eyebrow: t.category(base).name,
    title: product.name,
    subtitle: `${t.motif(product.motif)} · ${t.colour(product.colour)}`,
    image: product.images[0],
    footer: price === null ? t.m.common.priceOnRequest : t.m.common.from(t.money(price)),
  });
}

/** Render every product's card at build time rather than on first request. */
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}
