import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHeader";
import ShopBrowser from "@/components/ShopBrowser";
import {
  PRODUCTS,
  STARTING_PRICE,
  fromPrice,
  getAudience,
  getCategory,
  productsFor,
  productsIn,
} from "@/lib/catalog";
import { initLocale } from "@/lib/i18n/server";
import { itemListSchema, pageMetadata, webPageSchema } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; for?: string; q?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const t = await initLocale(params);
  const s = t.m.shop;
  const query = await searchParams;
  const base = getCategory(query.category ?? "");
  const audience = getAudience(query.for ?? "");
  if (base) {
    const category = t.category(base);
    return pageMetadata({
      title: `${category.name} — ${s.metaSuffix}`,
      description: s.rangeMetaDescription(category.tagline, productsIn(category.id).length),
      path: `/shop?category=${category.id}`,
      locale: t.locale,
    });
  }
  if (audience) {
    const copy = t.audience(audience.id);
    return pageMetadata({
      title: `${copy.title} — ${s.metaSuffix}`,
      description: s.audienceMetaDescription(copy.intro, productsFor(audience.id).length),
      path: `/shop?for=${audience.id}`,
      locale: t.locale,
    });
  }
  return pageMetadata({
    title: s.metaTitle,
    description: s.metaDescription(PRODUCTS.length, t.categories.map((c) => c.name).join(", "), t.money(STARTING_PRICE)),
    path: "/shop",
    locale: t.locale,
  });
}

export default async function ShopPage({ params, searchParams }: Props) {
  const t = await initLocale(params);
  const s = t.m.shop;
  // /shop?category=<id> opens one range, /shop?for=men|women one side of the
  // collection; anything else shows all. A range implies its audience.
  const query = await searchParams;
  const base = getCategory(query.category ?? "");
  const category = base && t.category(base);
  const audience = base ? getAudience(base.audience) : getAudience(query.for ?? "");
  const copy = audience && t.audience(audience.id);
  const list = base ? productsIn(base.id) : audience ? productsFor(audience.id) : PRODUCTS;
  const name = category ? category.name : copy ? copy.title : s.allProducts;
  const description = category ? category.tagline : copy ? copy.intro : s.allIntro;
  const listPrice = Math.min(
    ...list.map((p) => fromPrice(getCategory(p.category)!)).filter((p): p is number => p !== null)
  );
  const path = category ? `/shop?category=${category.id}` : audience ? `/shop?for=${audience.id}` : "/shop";

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ type: "CollectionPage", name, description, path, locale: t.locale }),
          itemListSchema(name, list),
        ]}
      />

      {/* No hero — just the trail and a compact title, then straight into the products. */}
      <section className="bg-cream-light pt-6 lg:pt-8">
        <div className="container-lux">
          <Breadcrumbs
            items={[
              { name: t.m.common.shop, path: "/shop" },
              ...(audience && copy ? [{ name: copy.label, path: `/shop?for=${audience.id}` }] : []),
              ...(category ? [{ name: category.name, path: `/shop?category=${category.id}` }] : []),
            ]}
          />
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pb-2 lg:mt-5">
            <h1 className="font-serif text-3xl font-medium text-ink sm:text-4xl">{name}</h1>
            <p className="text-[13px] uppercase tracking-[0.16em] text-muted">
              {t.designs(list.length)}
              {category
                ? ` · ${category.options.map((o) => `${o.label} ${t.money(o.price)}`).join(" · ")}`
                : ` · ${t.m.common.from(t.money(Number.isFinite(listPrice) ? listPrice : STARTING_PRICE))}`}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream-light pb-24">
        <div className="container-lux">
          <ShopBrowser
            initialAudience={audience?.id ?? "all"}
            initialCategory={category?.id ?? "all"}
            initialQuery={query.q ?? ""}
          />
        </div>
      </section>
    </>
  );
}
