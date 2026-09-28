import type { Metadata } from "next";
import CartView from "@/components/CartView";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the batik pieces in your cart before checking out on WhatsApp.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Cart", path: "/cart" }]} eyebrow="Your selection" title={<>Shopping <em className="text-primary">Cart</em></>} />
      <section className="bg-cream-light py-14 lg:py-20">
        <div className="container-lux">
          <CartView />
        </div>
      </section>
    </>
  );
}
