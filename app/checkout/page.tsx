import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Enter your delivery details and send your order to CWSK Enterprises on WhatsApp.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Cart", path: "/cart" },
          { name: "Checkout", path: "/checkout" },
        ]}
        eyebrow="Secure checkout"
        title={<>Check<em className="text-primary">out</em></>}
        intro="No card details needed. Your order is sent to us on WhatsApp, and we reply with a payment QR."
      />
      <section className="bg-cream-light py-14 lg:py-20">
        <div className="container-lux">
          <CheckoutForm />
        </div>
      </section>
    </>
  );
}
