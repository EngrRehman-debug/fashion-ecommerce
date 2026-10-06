import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";
import { Breadcrumbs } from "@/components/PageHeader";
import { initLocale, type LocaleParams } from "@/lib/i18n/server";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { m } = await initLocale(params);
  return {
    title: m.checkout.metaTitle,
    description: m.checkout.metaDescription,
    alternates: { canonical: "/checkout" },
    robots: { index: false, follow: true },
  };
}

export default async function CheckoutPage({ params }: LocaleParams) {
  const { m } = await initLocale(params);
  return (
    // No hero — the trail and a compact title, then straight into the form.
    <section className="bg-cream-light pb-14 pt-6 lg:pb-20 lg:pt-8">
      <div className="container-lux">
        <Breadcrumbs
          items={[
            { name: m.common.cart, path: "/cart" },
            { name: m.checkout.title, path: "/checkout" },
          ]}
        />
        <div className="mb-8 mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 lg:mb-10 lg:mt-5">
          <h1 className="font-serif text-3xl font-medium text-ink sm:text-4xl">{m.checkout.title}</h1>
          <p className="text-[13px] uppercase tracking-[0.16em] text-muted">{m.checkout.tagline}</p>
        </div>
        <CheckoutForm />
      </div>
    </section>
  );
}
