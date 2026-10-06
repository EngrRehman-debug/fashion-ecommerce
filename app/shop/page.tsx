import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHeader";
import ShopBrowser from "@/components/ShopBrowser";
import {
  CATEGORIES,
  PRODUCTS,
  STARTING_PRICE,
  formatMYR,
  fromPrice,
  getAudience,
  getCategory,
  productsFor,
  productsIn,
} from "@/lib/catalog";
import { itemListSchema, pageMetadata, webPageSchema } from "@/lib/seo";

type Props = { searchParams: Promise<{ category?: string; for?: string; q?: string }> };

const AUDIENCE_INTRO = {
  men: "Hand-dyed batik for men — long and short-sleeve shirts, sets, sarongs and more.",
  women: "Hand-painted crepe silk for women, sold as unstitched lengths ready for your tailor.",
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const category = getCategory(params.category ?? "");
  const audience = getAudience(params.for ?? "");
  if (category) {
    return pageMetadata({
      title: `${category.name} — Shop`,
      description: `${category.tagline} Browse ${productsIn(category.id).length} hand-dyed designs from CWSK Enterprises, Malaysia.`,
      path: `/shop?category=${category.id}`,
    });
  }
  if (audience) {
    return pageMetadata({
      title: `${audience.title} — Shop`,
      description: `${AUDIENCE_INTRO[audience.id]} Browse ${productsFor(audience.id).length} designs from CWSK Enterprises, Malaysia.`,
      path: `/shop?for=${audience.id}`,
    });
  }
  return pageMetadata({
    title: "Shop All Batik",
    description: `Browse all ${PRODUCTS.length} hand-dyed designs — ${CATEGORIES.map((c) => c.name).join(", ")}. From ${formatMYR(STARTING_PRICE)}, ordered on WhatsApp.`,
    path: "/shop",
  });
}

export default async function ShopPage({ searchParams }: Props) {
  // /shop?category=<id> opens one range, /shop?for=men|women one side of the
  // collection; anything else shows all. A range implies its audience.
  const params = await searchParams;
  const category = getCategory(params.category ?? "");
  const audience = category ? getAudience(category.audience) : getAudience(params.for ?? "");
  const list = category ? productsIn(category.id) : audience ? productsFor(audience.id) : PRODUCTS;
  const name = category ? category.name : audience ? audience.title : "All Products";
  const description = category
    ? category.tagline
    : audience
      ? AUDIENCE_INTRO[audience.id]
      : "Every range we make, for men and women — hand-dyed batik shirts, sets, sarongs and crepe silk.";
  const listPrice = Math.min(
    ...list.map((p) => fromPrice(getCategory(p.category)!)).filter((p): p is number => p !== null)
  );
  const path = category ? `/shop?category=${category.id}` : audience ? `/shop?for=${audience.id}` : "/shop";

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            type: "CollectionPage",
            name,
            description,
            path,
          }),
          itemListSchema(name, list),
        ]}
      />

      {/* No hero — just the trail and a compact title, then straight into the products. */}
      <section className="bg-cream-light pt-6 lg:pt-8">
        <div className="container-lux">
          <Breadcrumbs
            items={[
              { name: "Shop", path: "/shop" },
              ...(audience ? [{ name: audience.label, path: `/shop?for=${audience.id}` }] : []),
              ...(category ? [{ name: category.name, path: `/shop?category=${category.id}` }] : []),
            ]}
          />
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pb-2 lg:mt-5">
            <h1 className="font-serif text-3xl font-medium text-ink sm:text-4xl">{name}</h1>
            <p className="text-[13px] uppercase tracking-[0.16em] text-muted">
              {list.length} designs
              {category
                ? ` · ${category.options.map((o) => `${o.label} ${formatMYR(o.price)}`).join(" · ")}`
                : ` · From ${formatMYR(Number.isFinite(listPrice) ? listPrice : STARTING_PRICE)}`}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream-light pb-24">
        <div className="container-lux">
          <ShopBrowser
            initialAudience={audience?.id ?? "all"}
            initialCategory={category?.id ?? "all"}
            initialQuery={params.q ?? ""}
          />
        </div>
      </section>
    </>
  );
}
