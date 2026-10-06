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
import { PRODUCTS, formatMYR, fromPrice, getAudience, getCategory, getProduct } from "@/lib/catalog";
import { pageMetadata, productSchema } from "@/lib/seo";
import { colourSwatch } from "@/lib/colors";
import { PRODUCT_GRID } from "@/lib/ui";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  const category = getCategory(product.category);
  const price = category ? fromPrice(category) : null;
  return pageMetadata({
    title: `${product.name} — ${category?.name ?? "Batik"}`,
    description: `${product.name}: ${product.motif} in ${product.colour}${
      category ? `, from our ${category.name} range` : ""
    }. Hand-dyed in Malaysia.${price !== null ? ` From ${formatMYR(price)}.` : ""} Order on WhatsApp.`,
    path: `/shop/${product.slug}`,
  });
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  if (!category) notFound();

  const sameRange = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug);
  // Prefer the same colour family, then fill from the rest of the range.
  const related = [
    ...sameRange.filter((p) => p.family === product.family),
    ...sameRange.filter((p) => p.family !== product.family),
  ].slice(0, 6);

  const details: [string, string][] = [
    ["Colour", product.colour],
    ["Motif", product.motif],
    ...Object.entries(category.details),
    ...(category.sizes.length ? [["Sizes", category.sizes.join(" · ")] as [string, string]] : []),
  ];

  return (
    <>
      <JsonLd data={productSchema(product)} />

      <section className="bg-cream-light pb-20 pt-6 lg:pb-28 lg:pt-10">
        <div className="container-lux">
          <Breadcrumbs
            items={[
              { name: "Shop", path: "/shop" },
              { name: getAudience(category.audience)!.label, path: `/shop?for=${category.audience}` },
              { name: category.name, path: `/shop?category=${category.id}` },
              { name: product.name, path: `/shop/${product.slug}` },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
            <ProductGallery images={product.images} alt={`${product.name} — ${product.motif}`} />

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
                {product.motif} ·{" "}
                <span className="inline-flex items-center gap-1.5 align-middle">
                  <span
                    aria-hidden
                    className="h-3.5 w-3.5 rounded-full border border-ink/15"
                    style={{ background: colourSwatch(product.colour, product.family) }}
                  />
                  {product.colour}
                </span>
              </p>

              <div className="mt-8">
                <PurchasePanel product={product} category={category} />
              </div>

              {/* Details accordions */}
              <div className="mt-10 border-t border-line">
                <Accordion title="Details" open>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-[15px]">
                    {details.map(([label, value]) => (
                      <div key={label} className="contents">
                        <dt className="text-muted">{label}</dt>
                        <dd className="text-ink">
                          {label === "Colour" ? (
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
                <Accordion title="How ordering works">
                  <ol className="list-decimal space-y-2 pl-5">
                    <li>Add to cart and check out — your order opens in WhatsApp, ready to send.</li>
                    <li>We confirm availability and reply with a payment QR.</li>
                    <li>Send us the receipt; we pack and ship as soon as payment is confirmed.</li>
                  </ol>
                </Accordion>
                <Accordion title="Care">
                  <p>
                    Hand-wash cold or use a gentle cycle, inside out, with mild detergent. Dry in the
                    shade and iron on the reverse. Hand-dyed colour may soften gently over time — part
                    of the character of real batik.
                  </p>
                </Accordion>
                <Accordion title="Shipping & returns">
                  <p>
                    Tracked, insured delivery across Malaysia and worldwide. Unworn items can be
                    returned within 30 days of delivery.{" "}
                    <Link href="/shipping-returns" className="link-underline text-ink">
                      Read the full policy
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
                <p className="eyebrow">You may also like</p>
                <h2 className="mt-4 font-serif text-[2.4rem] font-medium leading-none text-ink sm:text-display">
                  More from {category.name}
                </h2>
              </div>
              <Link
                href={`/shop?category=${category.id}`}
                className="link-underline hidden shrink-0 items-center gap-2 text-[13px] font-medium uppercase tracking-[0.18em] text-ink sm:inline-flex"
              >
                View all <ArrowRight className="h-4 w-4" />
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
