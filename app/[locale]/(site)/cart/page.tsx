import type { Metadata } from "next";
import CartView from "@/components/CartView";
import { Breadcrumbs } from "@/components/PageHeader";
import { initLocale, type LocaleParams } from "@/lib/i18n/server";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { m } = await initLocale(params);
  return {
    title: m.cart.metaTitle,
    description: m.cart.metaDescription,
    alternates: { canonical: "/cart" },
    robots: { index: false, follow: true },
  };
}

export default async function CartPage({ params }: LocaleParams) {
  const { m } = await initLocale(params);
  return (
    // No hero — the trail and a compact title, then straight into the cart.
    <section className="bg-cream-light pb-14 pt-6 lg:pb-20 lg:pt-8">
      <div className="container-lux">
        <Breadcrumbs items={[{ name: m.common.cart, path: "/cart" }]} />
        <div className="mb-8 mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 lg:mb-10 lg:mt-5">
          <h1 className="font-serif text-3xl font-medium text-ink sm:text-4xl">{m.cart.title}</h1>
          <p className="text-[13px] uppercase tracking-[0.16em] text-muted">{m.cart.tagline}</p>
        </div>
        <CartView />
      </div>
    </section>
  );
}
