import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";
import { Breadcrumbs } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Enter your delivery details and send your order to CWSK Enterprises on WhatsApp.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    // No hero — the trail and a compact title, then straight into the form.
    <section className="bg-cream-light pb-14 pt-6 lg:pb-20 lg:pt-8">
      <div className="container-lux">
        <Breadcrumbs
          items={[
            { name: "Cart", path: "/cart" },
            { name: "Checkout", path: "/checkout" },
          ]}
        />
        <div className="mb-8 mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 lg:mb-10 lg:mt-5">
          <h1 className="font-serif text-3xl font-medium text-ink sm:text-4xl">Checkout</h1>
          <p className="text-[13px] uppercase tracking-[0.16em] text-muted">
            No card needed · Order on WhatsApp · Pay by QR
          </p>
        </div>
        <CheckoutForm />
      </div>
    </section>
  );
}
