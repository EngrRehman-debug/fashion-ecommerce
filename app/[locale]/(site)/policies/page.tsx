import LegalPage, { type LegalSection } from "@/components/LegalPage";
import type { Locale } from "@/lib/i18n/config";
import { initLocale, type LocaleParams } from "@/lib/i18n/server";
import { rich } from "@/lib/i18n/rich";
import { pageMetadata } from "@/lib/seo";
import { WHATSAPP_DISPLAY } from "@/lib/site";

/**
 * Shop policies — ordering, delivery, returns and privacy on one page, in plain
 * words. The old /terms, /privacy-policy and /shipping-returns URLs redirect
 * here (see next.config.mjs), so keep the section ids stable.
 */

const UPDATED = "2026-10-06";

type Content = { name: string; eyebrow: string; title: string; description: string; sections: LegalSection[] };

const CONTENT: Record<Locale, Content> = {
  en: {
    name: "Shop Policies",
    eyebrow: "Good to know",
    title: "Shop *policies*",
    description: "How ordering, payment, delivery, returns and your details work when you shop with us.",
    sections: [
      {
        id: "ordering",
        title: "Ordering & payment",
        body: (
          <>
            <p>
              When you check out, your order opens in WhatsApp and you send it to us. We check the
              piece is available, confirm the total, and send you a QR code to pay.
            </p>
            <p>Once your payment is confirmed, we prepare your order. We never ask for card details on this website.</p>
          </>
        ),
      },
      {
        id: "delivery",
        title: "Delivery",
        body: (
          <p>
            We deliver across Malaysia and overseas. The delivery cost for your address is shared
            on WhatsApp before you pay, and we send you a tracking number once your parcel is on its
            way. Stitched-to-size pieces take a little longer, as they are made for you.
          </p>
        ),
      },
      {
        id: "returns",
        title: "Returns & exchanges",
        body: (
          <p>
            If something isn’t right, message us within 30 days of receiving it. Unworn, unwashed
            items can be returned or exchanged, and we’ll help sort out any problem with a piece
            stitched to your size.
          </p>
        ),
      },
      {
        id: "handmade",
        title: "Handmade pieces",
        body: (
          <p>
            Every piece is dyed by hand, so small differences in colour and pattern from the photos
            are normal — they’re part of what makes real batik special.
          </p>
        ),
      },
      {
        id: "privacy",
        title: "Your details",
        body: (
          <p>
            We only use your name, phone number and address to handle your order and delivery, and
            we never sell them. Your cart and language choice are saved in your own browser so they
            are there when you come back.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Questions",
        body: <p>Anything unclear? Message us on WhatsApp at {WHATSAPP_DISPLAY} and we’ll be happy to help.</p>,
      },
    ],
  },

  ms: {
    name: "Polisi Kedai",
    eyebrow: "Perlu tahu",
    title: "Polisi *kedai*",
    description: "Cara pesanan, bayaran, penghantaran, pemulangan dan butiran anda diuruskan apabila anda membeli dengan kami.",
    sections: [
      {
        id: "ordering",
        title: "Pesanan & bayaran",
        body: (
          <>
            <p>
              Apabila anda daftar keluar, pesanan anda dibuka di WhatsApp dan anda menghantarnya
              kepada kami. Kami semak stok, sahkan jumlahnya, dan hantar kod QR untuk pembayaran.
            </p>
            <p>Selepas bayaran disahkan, kami sediakan pesanan anda. Kami tidak pernah meminta butiran kad di laman web ini.</p>
          </>
        ),
      },
      {
        id: "delivery",
        title: "Penghantaran",
        body: (
          <p>
            Kami menghantar ke seluruh Malaysia dan luar negara. Kos penghantaran ke alamat anda
            dimaklumkan di WhatsApp sebelum anda membayar, dan kami hantar nombor penjejakan
            sebaik sahaja bungkusan anda dipos. Helaian yang dijahit ikut saiz mengambil masa
            sedikit lebih lama kerana ia dibuat khas untuk anda.
          </p>
        ),
      },
      {
        id: "returns",
        title: "Pemulangan & penukaran",
        body: (
          <p>
            Jika ada yang tidak kena, hubungi kami dalam tempoh 30 hari selepas menerimanya. Item
            yang belum dipakai dan belum dibasuh boleh dipulangkan atau ditukar, dan kami akan
            bantu selesaikan sebarang masalah pada helaian yang dijahit ikut saiz anda.
          </p>
        ),
      },
      {
        id: "handmade",
        title: "Buatan tangan",
        body: (
          <p>
            Setiap helai dicelup dengan tangan, jadi sedikit perbezaan warna dan corak daripada
            gambar adalah perkara biasa — itulah yang menjadikan batik sebenar istimewa.
          </p>
        ),
      },
      {
        id: "privacy",
        title: "Butiran anda",
        body: (
          <p>
            Kami hanya menggunakan nama, nombor telefon dan alamat anda untuk menguruskan pesanan
            dan penghantaran, dan kami tidak sekali-kali menjualnya. Troli dan pilihan bahasa anda
            disimpan dalam pelayar anda sendiri supaya ia masih ada apabila anda kembali.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Ada soalan?",
        body: <p>Ada yang kurang jelas? Hantar mesej kepada kami di WhatsApp {WHATSAPP_DISPLAY} dan kami sedia membantu.</p>,
      },
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams) {
  const t = await initLocale(params);
  const c = CONTENT[t.locale];
  return pageMetadata({ title: c.name, description: c.description, path: "/policies", locale: t.locale });
}

export default async function PoliciesPage({ params }: LocaleParams) {
  const t = await initLocale(params);
  const c = CONTENT[t.locale];
  return (
    <LegalPage
      path="/policies"
      name={c.name}
      eyebrow={c.eyebrow}
      title={rich(c.title)}
      description={c.description}
      updated={UPDATED}
      sections={c.sections}
    />
  );
}
