import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
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

      <PageHeader
        crumbs={[
          { name: "Shop", path: "/shop" },
          ...(category ? [{ name: category.name, path: `/shop?category=${category.id}` }] : []),
        ]}
        eyebrow="The Collection"
        title={category ? category.name : <>All <em className="text-primary">Products</em></>}
        intro={description}
      >
        <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8">
          <Stat label="Designs" value={String(list.length)} />
          {category ? (
            <>
              {category.options.map((o) => (
                <Stat
                  key={o.id}
                  label={category.options.length > 1 ? o.label : "Price"}
                  value={formatMYR(o.price)}
                />
              ))}
              {category.sizes.length > 0 && <Stat label="Sizes" value={category.sizes.join(" · ")} />}
            </>
          ) : (
            <>
              <Stat label="Ranges" value={String(CATEGORIES.length)} />
              <Stat label="From" value={formatMYR(STARTING_PRICE)} />
            </>
          )}
        </dl>
      </PageHeader>

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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col-reverse">
      <dt className="mt-1 text-[12px] uppercase tracking-[0.18em] text-muted sm:text-[13px]">{label}</dt>
      <dd className="font-serif text-3xl text-ink">{value}</dd>
    </div>
  );
}
