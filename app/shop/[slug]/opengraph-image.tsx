import { PRODUCTS, fromPrice, formatMYR, getCategory, getProduct } from "@/lib/catalog";
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Batik by CWSK Enterprises";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type Params = { slug: string };

export default async function Image({ params }: { params: Promise<Params> | Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  const category = product && getCategory(product.category);
  if (!product || !category) {
    return renderOg({ eyebrow: "CWSK Enterprises", title: "Handcrafted Batik", image: "/images/editorial/shirt-01.webp" });
  }
  const price = fromPrice(category);
  return renderOg({
    eyebrow: category.name,
    title: product.name,
    subtitle: `${product.motif} · ${product.colour}`,
    image: product.images[0],
    footer: price === null ? "Price on request" : `From ${formatMYR(price)}`,
  });
}

/** Render every product's card at build time rather than on first request. */
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}
