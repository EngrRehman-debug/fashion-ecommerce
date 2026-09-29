import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHeader";
import ShopBrowser from "@/components/ShopBrowser";
import {
  CATEGORIES,
  PRODUCTS,
  STARTING_PRICE,
  formatMYR,
  getCategory,
  productsIn,
} from "@/lib/catalog";
import { itemListSchema, pageMetadata, webPageSchema } from "@/lib/seo";

type Props = { searchParams: Promise<{ category?: string; q?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const category = getCategory((await searchParams).category ?? "");
  if (category) {
    return pageMetadata({
      title: `${category.name} — Shop`,
      description: `${category.tagline} Browse ${productsIn(category.id).length} hand-dyed designs from CWSK Enterprises, Malaysia.`,
      path: `/shop?category=${category.id}`,
    });
  }
  return pageMetadata({
    title: "Shop All Batik",
    description: `Browse all ${PRODUCTS.length} hand-dyed designs — ${CATEGORIES.map((c) => c.name).join(", ")}. From ${formatMYR(STARTING_PRICE)}, ordered on WhatsApp.`,
    path: "/shop",
  });
}

export default async function ShopPage({ searchParams }: Props) {
  // /shop?category=<id> opens the shop on one range; anything else shows all.
  const params = await searchParams;
  const category = getCategory(params.category ?? "");
  const list = category ? productsIn(category.id) : PRODUCTS;
  const name = category ? category.name : "All Products";
  const description = category
    ? category.tagline
    : "Every range we make — hand-dyed batik shirts, sets, sarongs and more. Pick a range below or browse them all.";

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            type: "CollectionPage",
            name,
            description,
            path: category ? `/shop?category=${category.id}` : "/shop",
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
              ...(category ? [{ name: category.name, path: `/shop?category=${category.id}` }] : []),
            ]}
          />
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pb-2 lg:mt-5">
            <h1 className="font-serif text-3xl font-medium text-ink sm:text-4xl">{name}</h1>
            <p className="text-[13px] uppercase tracking-[0.16em] text-muted">
              {list.length} designs
              {category
                ? ` · ${category.options.map((o) => `${o.label} ${formatMYR(o.price)}`).join(" · ")}`
                : ` · From ${formatMYR(STARTING_PRICE)}`}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream-light pb-24">
        <div className="container-lux">
          <ShopBrowser
            initialCategory={category?.id ?? "all"}
            initialQuery={params.q ?? ""}
          />
        </div>
      </section>
    </>
  );
}
