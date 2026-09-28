import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { WHATSAPP_DISPLAY } from "@/lib/site";

const DESCRIPTION =
  "How CWSK Enterprises ships hand-dyed batik across Malaysia and worldwide, and how to return or exchange unworn items within 30 days.";

export const metadata = pageMetadata({ title: "Shipping & Returns", description: DESCRIPTION, path: "/shipping-returns" });

export default function ShippingReturnsPage() {
  return (
    <LegalPage
      path="/shipping-returns"
      name="Shipping & Returns"
      eyebrow="Delivery & returns"
      title={<>Shipping & <em className="text-primary">Returns</em></>}
      description={DESCRIPTION}
      updated="2026-09-28"
      sections={[
        {
          id: "processing",
          title: "Order processing",
          body: (
            <>
              <p>
                Orders are placed through our checkout and sent to us on WhatsApp. We confirm
                availability, send you a payment QR, and begin preparing your order as soon as your
                payment receipt is confirmed.
              </p>
              <ul>
                <li><strong>Unstitched fabric, sarongs, scarves and ready-to-wear pieces</strong> are prepared for dispatch after payment is confirmed.</li>
                <li><strong>Stitched-to-size shirts</strong> need additional time for tailoring. We’ll give you an estimate when we confirm your order.</li>
              </ul>
            </>
          ),
        },
        {
          id: "delivery",
          title: "Delivery",
          body: (
            <>
              <p>
                We ship across Malaysia and worldwide. Every parcel is insured and tracked, and
                carefully packed to protect the cloth in transit. You’ll receive your tracking
                number on WhatsApp once your order ships.
              </p>
              <h3>Shipping cost</h3>
              <p>
                The shipping cost depends on your address and the size of your order. We confirm it
                with you on WhatsApp together with your order total, before you pay.
              </p>
              <h3>International orders</h3>
              <p>
                Orders shipped outside Malaysia may be subject to import duties or taxes charged by
                the destination country. These are the responsibility of the recipient.
              </p>
            </>
          ),
        },
        {
          id: "returns",
          title: "Returns & exchanges",
          body: (
            <>
              <p>
                Not the right fit? You can return or exchange any <strong>unworn, unwashed</strong> item
                in its original condition within <strong>30 days of delivery</strong>.
              </p>
              <ul>
                <li>Message us on WhatsApp at {WHATSAPP_DISPLAY} with your order number and the item you’d like to return.</li>
                <li>We’ll reply with return instructions and the return address.</li>
                <li>Once the item arrives and is checked, we’ll arrange your exchange or refund.</li>
              </ul>
              <h3>Made-to-size items</h3>
              <p>
                Shirts stitched to your chosen size are made for you. If there is a fault in the
                making, we will put it right — please contact us within 30 days of delivery.
              </p>
            </>
          ),
        },
        {
          id: "refunds",
          title: "Refunds",
          body: (
            <p>
              Approved refunds are returned to the original payment method or by bank transfer,
              which we confirm with you on WhatsApp. Original shipping costs are not refundable
              unless the item arrived faulty or incorrect.
            </p>
          ),
        },
        {
          id: "damaged",
          title: "Damaged or incorrect items",
          body: (
            <p>
              If your parcel arrives damaged or you receive the wrong item, message us within 7 days
              of delivery with photos and your order number, and we’ll make it right. See also our{" "}
              <Link href="/faq">FAQs</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
