import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import PurchasePanel from "@/components/PurchasePanel";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import { ArrowRight } from "@/components/icons";
import { PRODUCTS, fromPrice, getCategory, getProduct } from "@/lib/catalog";
import { initLocale } from "@/lib/i18n/server";
import { pageMetadata, productSchema } from "@/lib/seo";
import { colourSwatch } from "@/lib/colors";
import { PRODUCT_GRID } from "@/lib/ui";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const t = await initLocale(params);
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: t.m.product.notFound };
  const base = getCategory(product.category)!;
  const category = t.category(base);
  const price = fromPrice(base);
  return pageMetadata({
    title: `${product.name} — ${category.name}`,
    description: t.m.product.metaDescription(
      product.name,
      t.motif(product.motif),
      t.colour(product.colour),
      category.name,
      price === null ? null : t.money(price)
    ),
    path: `/shop/${product.slug}`,
    locale: t.locale,
  });
}

export default async function ProductPage({ params }: Params) {
  const t = await initLocale(params);
  const p = t.m.product;
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const base = getCategory(product.category);
  if (!base) notFound();
  const category = t.category(base);
  const motif = t.motif(product.motif);
  const colour = t.colour(product.colour);

  const sameRange = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug);
  // Prefer the same colour family, then fill from the rest of the range.
  const related = [
    ...sameRange.filter((p) => p.family === product.family),
    ...sameRange.filter((p) => p.family !== product.family),
  ].slice(0, 6);

  // [label, value, is the colour row]
  const details: [string, string, boolean][] = [
    [p.colour, colour, true],
    [p.motif, motif, false],
    ...Object.entries(category.details).map(([k, v]) => [k, v, false] as [string, string, boolean]),
    ...(category.sizes.length ? [[p.sizes, category.sizes.join(" · "), false] as [string, string, boolean]] : []),
  ];

  return (
    <>
      <JsonLd data={productSchema(product, t.locale)} />

      <section className="bg-cream-light pb-20 pt-6 lg:pb-28 lg:pt-10">
        <div className="container-lux">
          <Breadcrumbs
            items={[
              { name: t.m.common.shop, path: "/shop" },
              { name: t.audience(category.audience).label, path: `/shop?for=${category.audience}` },
              { name: category.name, path: `/shop?category=${category.id}` },
              { name: product.name, path: `/shop/${product.slug}` },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
            <ProductGallery images={product.images} alt={`${product.name} — ${motif}`} />

            <div className="animate-rise lg:py-2" style={{ animationDelay: "0.1s" }}>
              <Link
                href={`/shop?category=${category.id}`}
                className="eyebrow transition-colors hover:text-primary-dark"
              >
                {category.name}
              </Link>
              <h1 className="mt-5 font-serif text-[3rem] font-medium leading-[0.95] text-ink sm:text-display lg:text-display-lg">
                {product.name}
              </h1>
              <p className="mt-4 text-[17px] text-ink-soft">
                {motif} ·{" "}
                <span className="inline-flex items-center gap-1.5 align-middle">
                  <span
                    aria-hidden
                    className="h-3.5 w-3.5 rounded-full border border-ink/15"
                    style={{ background: colourSwatch(product.colour, product.family) }}
                  />
                  {colour}
                </span>
              </p>

              <div className="mt-8">
                <PurchasePanel product={product} category={base} />
              </div>

              {/* Details accordions */}
              <div className="mt-10 border-t border-line">
                <Accordion title={p.details} open>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-[15px]">
                    {details.map(([label, value, isColour]) => (
                      <div key={label} className="contents">
                        <dt className="text-muted">{label}</dt>
                        <dd className="text-ink">
                          {isColour ? (
                            <span className="inline-flex items-center gap-2.5">
                              <span
                                aria-hidden
                                className="h-4 w-4 shrink-0 rounded-full border border-ink/15 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]"
                                style={{ background: colourSwatch(product.colour, product.family) }}
                              />
                              {value}
                            </span>
                          ) : (
                            value
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Accordion>
                <Accordion title={p.howOrdering}>
                  <ol className="list-decimal space-y-2 pl-5">
                    {p.orderingSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </Accordion>
                <Accordion title={p.care}>
                  <p>{p.careText}</p>
                </Accordion>
                <Accordion title={p.shippingReturns}>
                  <p>
                    {p.shippingText}{" "}
                    <Link href="/policies#returns" className="link-underline text-ink">
                      {p.readPolicy}
                    </Link>
                    .
                  </p>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-white py-20 lg:py-24">
          <div className="container-lux">
            <Reveal className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">{p.youMayLike}</p>
                <h2 className="mt-4 font-serif text-[2.4rem] font-medium leading-none text-ink sm:text-display">
                  {p.moreFrom(category.name)}
                </h2>
              </div>
              <Link
                href={`/shop?category=${category.id}`}
                className="link-underline hidden shrink-0 items-center gap-2 text-[13px] font-medium uppercase tracking-[0.18em] text-ink sm:inline-flex"
              >
                {t.m.common.viewAll} <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <div className={`mt-10 ${PRODUCT_GRID}`}>
              {related.map((p, i) => (
                // One full row at every width: 4 on lg, 5 on xl, 6 on 2xl.
                <div
                  key={p.slug}
                  className={i === 4 ? "lg:hidden xl:block" : i === 5 ? "lg:hidden 2xl:block" : ""}
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
