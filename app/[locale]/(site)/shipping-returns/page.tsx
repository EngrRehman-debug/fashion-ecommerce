import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import type { Locale } from "@/lib/i18n/config";
import { initLocale, type LocaleParams } from "@/lib/i18n/server";
import { rich } from "@/lib/i18n/rich";
import { pageMetadata } from "@/lib/seo";
import { WHATSAPP_DISPLAY } from "@/lib/site";

const UPDATED = "2026-09-28";

const CONTENT: Record<Locale, { name: string; eyebrow: string; title: string; description: string; sections: LegalSection[] }> = {
  en: {
    name: "Shipping & Returns",
    eyebrow: "Delivery & returns",
    title: "Shipping & *Returns*",
    description:
      "How CWSK Enterprises ships hand-dyed batik across Malaysia and worldwide, and how to return or exchange unworn items within 30 days.",
    sections: [
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
    ],
  },

  ms: {
    name: "Penghantaran & Pemulangan",
    eyebrow: "Penghantaran & pemulangan",
    title: "Penghantaran & *Pemulangan*",
    description:
      "Cara CWSK Enterprises menghantar batik celup tangan ke seluruh Malaysia dan seluruh dunia, serta cara memulangkan atau menukar item yang belum dipakai dalam tempoh 30 hari.",
    sections: [
      {
        id: "processing",
        title: "Pemprosesan pesanan",
        body: (
          <>
            <p>
              Pesanan dibuat melalui daftar keluar kami dan dihantar kepada kami di WhatsApp. Kami
              mengesahkan stok, menghantar kod QR pembayaran, dan mula menyediakan pesanan anda
              sebaik sahaja resit pembayaran anda disahkan.
            </p>
            <ul>
              <li><strong>Kain belum dijahit, kain sarung, selendang dan pakaian siap pakai</strong> disediakan untuk penghantaran selepas bayaran disahkan.</li>
              <li><strong>Kemeja yang dijahit ikut saiz</strong> memerlukan masa tambahan untuk jahitan. Kami akan berikan anggaran semasa mengesahkan pesanan anda.</li>
            </ul>
          </>
        ),
      },
      {
        id: "delivery",
        title: "Penghantaran",
        body: (
          <>
            <p>
              Kami menghantar ke seluruh Malaysia dan seluruh dunia. Setiap bungkusan diinsuranskan,
              boleh dijejak dan dibungkus dengan teliti untuk melindungi kain semasa dalam
              perjalanan. Anda akan menerima nombor penjejakan di WhatsApp sebaik sahaja pesanan
              anda dihantar.
            </p>
            <h3>Kos penghantaran</h3>
            <p>
              Kos penghantaran bergantung pada alamat anda dan saiz pesanan. Kami akan sahkan
              dengan anda di WhatsApp bersama jumlah pesanan, sebelum anda membayar.
            </p>
            <h3>Pesanan antarabangsa</h3>
            <p>
              Pesanan yang dihantar ke luar Malaysia mungkin dikenakan duti import atau cukai oleh
              negara destinasi. Bayaran ini ialah tanggungjawab penerima.
            </p>
          </>
        ),
      },
      {
        id: "returns",
        title: "Pemulangan & penukaran",
        body: (
          <>
            <p>
              Saiz tidak sesuai? Anda boleh memulangkan atau menukar sebarang item yang{" "}
              <strong>belum dipakai dan belum dibasuh</strong> dalam keadaan asal dalam tempoh{" "}
              <strong>30 hari selepas diterima</strong>.
            </p>
            <ul>
              <li>Hantar mesej kepada kami di WhatsApp {WHATSAPP_DISPLAY} bersama nombor pesanan dan item yang ingin anda pulangkan.</li>
              <li>Kami akan balas dengan arahan pemulangan dan alamat pemulangan.</li>
              <li>Sebaik sahaja item tiba dan disemak, kami akan uruskan penukaran atau bayaran balik anda.</li>
            </ul>
            <h3>Item yang dijahit ikut saiz</h3>
            <p>
              Kemeja yang dijahit mengikut saiz pilihan anda dibuat khas untuk anda. Jika terdapat
              kecacatan pada jahitan, kami akan membetulkannya — sila hubungi kami dalam tempoh 30
              hari selepas diterima.
            </p>
          </>
        ),
      },
      {
        id: "refunds",
        title: "Bayaran balik",
        body: (
          <p>
            Bayaran balik yang diluluskan akan dikembalikan melalui kaedah pembayaran asal atau
            pindahan bank, yang kami sahkan dengan anda di WhatsApp. Kos penghantaran asal tidak
            dikembalikan kecuali item tiba dalam keadaan rosak atau salah.
          </p>
        ),
      },
      {
        id: "damaged",
        title: "Item rosak atau salah",
        body: (
          <p>
            Jika bungkusan anda tiba dalam keadaan rosak atau anda menerima item yang salah, hantar
            mesej kepada kami dalam tempoh 7 hari selepas diterima bersama gambar dan nombor
            pesanan anda, dan kami akan membetulkannya. Lihat juga{" "}
            <Link href="/faq">Soalan Lazim</Link> kami.
          </p>
        ),
      },
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams) {
  const t = await initLocale(params);
  const c = CONTENT[t.locale];
  return pageMetadata({ title: c.name, description: c.description, path: "/shipping-returns", locale: t.locale });
}

export default async function ShippingReturnsPage({ params }: LocaleParams) {
  const t = await initLocale(params);
  const c = CONTENT[t.locale];
  return (
    <LegalPage
      path="/shipping-returns"
      name={c.name}
      eyebrow={c.eyebrow}
      title={rich(c.title)}
      description={c.description}
      updated={UPDATED}
      sections={c.sections}
    />
  );
}
