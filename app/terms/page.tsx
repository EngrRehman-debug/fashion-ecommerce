import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { BRAND_NAME, COMPANY_NO } from "@/lib/site";

const DESCRIPTION = `The terms that apply when you browse the ${BRAND_NAME} website and order our hand-dyed batik through WhatsApp.`;

export const metadata = pageMetadata({ title: "Terms of Service", description: DESCRIPTION, path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage
      path="/terms"
      name="Terms of Service"
      eyebrow="The small print"
      title={<>Terms of <em className="text-primary">Service</em></>}
      description={DESCRIPTION}
      updated="2026-09-28"
      sections={[
        {
          id: "about",
          title: "About these terms",
          body: (
            <p>
              These terms apply to your use of this website and to orders placed with {BRAND_NAME} (
              {COMPANY_NO}), Malaysia. By placing an order you agree to them, together with our{" "}
              <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
              <Link href="/shipping-returns">Shipping & Returns</Link> policy.
            </p>
          ),
        },
        {
          id: "orders",
          title: "Orders",
          body: (
            <>
              <p>
                Checking out on this website sends your order to us on WhatsApp. It is a request to
                buy, not a confirmed sale. An order is accepted once we confirm availability and
                receive your payment.
              </p>
              <p>
                We may decline or cancel an order — for example if an item is no longer available —
                in which case any payment made will be refunded in full.
              </p>
            </>
          ),
        },
        {
          id: "prices",
          title: "Prices & payment",
          body: (
            <>
              <p>
                Prices are shown in Malaysian Ringgit (RM). Items marked “Price on request” are
                priced by us on WhatsApp before you pay. Shipping costs are confirmed with your order.
              </p>
              <p>
                Payment is made by QR code, which we send you after confirming your order. We never
                ask for card details on this website.
              </p>
            </>
          ),
        },
        {
          id: "handmade",
          title: "Hand-made products",
          body: (
            <p>
              Every piece is dyed by hand. Small variations in colour, line and pattern between the
              photos and the item you receive are a natural part of real batik and are not defects.
              Colours may also look slightly different on different screens.
            </p>
          ),
        },
        {
          id: "sizing",
          title: "Sizing & made-to-size items",
          body: (
            <p>
              Please check your size before ordering a stitched shirt — message us if you are unsure.
              Items stitched to your chosen size are made for you and are covered by the made-to-size
              terms in our <Link href="/shipping-returns">Shipping & Returns</Link> policy.
            </p>
          ),
        },
        {
          id: "ip",
          title: "Our content",
          body: (
            <p>
              The designs, photographs, text and logo on this website belong to {BRAND_NAME}. You may
              not copy or reuse them for commercial purposes without our written permission.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Liability",
          body: (
            <p>
              Nothing in these terms limits your rights as a consumer under Malaysian law, including
              the Consumer Protection Act 1999. Otherwise, our liability for any order is limited to
              the amount you paid for it.
            </p>
          ),
        },
        {
          id: "law",
          title: "Governing law",
          body: <p>These terms are governed by the laws of Malaysia.</p>,
        },
      ]}
    />
  );
}
