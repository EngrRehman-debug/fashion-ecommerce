import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import type { Locale } from "@/lib/i18n/config";
import { initLocale, type LocaleParams } from "@/lib/i18n/server";
import { rich } from "@/lib/i18n/rich";
import { pageMetadata } from "@/lib/seo";
import { BRAND_NAME, COMPANY_NO } from "@/lib/site";

const UPDATED = "2026-09-28";

const CONTENT: Record<Locale, { name: string; eyebrow: string; title: string; description: string; sections: LegalSection[] }> = {
  en: {
    name: "Terms of Service",
    eyebrow: "The small print",
    title: "Terms of *Service*",
    description: `The terms that apply when you browse the ${BRAND_NAME} website and order our hand-dyed batik through WhatsApp.`,
    sections: [
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
    ],
  },

  ms: {
    name: "Terma Perkhidmatan",
    eyebrow: "Cetakan halus",
    title: "Terma *Perkhidmatan*",
    description: `Terma yang terpakai apabila anda melayari laman web ${BRAND_NAME} dan memesan batik celup tangan kami melalui WhatsApp.`,
    sections: [
      {
        id: "about",
        title: "Tentang terma ini",
        body: (
          <p>
            Terma ini terpakai pada penggunaan laman web ini dan pesanan yang dibuat dengan{" "}
            {BRAND_NAME} ({COMPANY_NO}), Malaysia. Dengan membuat pesanan, anda bersetuju dengan
            terma ini, bersama <Link href="/privacy-policy">Dasar Privasi</Link> dan polisi{" "}
            <Link href="/shipping-returns">Penghantaran & Pemulangan</Link> kami.
          </p>
        ),
      },
      {
        id: "orders",
        title: "Pesanan",
        body: (
          <>
            <p>
              Daftar keluar di laman web ini menghantar pesanan anda kepada kami di WhatsApp. Ia
              ialah permintaan untuk membeli, bukan jualan yang disahkan. Pesanan diterima sebaik
              sahaja kami mengesahkan stok dan menerima bayaran anda.
            </p>
            <p>
              Kami boleh menolak atau membatalkan pesanan — contohnya jika item tidak lagi tersedia
              — dan dalam keadaan itu, sebarang bayaran yang dibuat akan dikembalikan sepenuhnya.
            </p>
          </>
        ),
      },
      {
        id: "prices",
        title: "Harga & bayaran",
        body: (
          <>
            <p>
              Harga dipaparkan dalam Ringgit Malaysia (RM). Item bertanda “Harga atas permintaan”
              akan diberikan harga oleh kami di WhatsApp sebelum anda membayar. Kos penghantaran
              disahkan bersama pesanan anda.
            </p>
            <p>
              Bayaran dibuat melalui kod QR, yang kami hantar selepas mengesahkan pesanan anda. Kami
              tidak pernah meminta butiran kad di laman web ini.
            </p>
          </>
        ),
      },
      {
        id: "handmade",
        title: "Produk buatan tangan",
        body: (
          <p>
            Setiap helai dicelup dengan tangan. Sedikit perbezaan warna, garisan dan corak antara
            gambar dan item yang anda terima ialah sebahagian semula jadi batik sebenar dan bukan
            kecacatan. Warna juga mungkin kelihatan sedikit berbeza pada skrin yang berlainan.
          </p>
        ),
      },
      {
        id: "sizing",
        title: "Saiz & item yang dijahit ikut saiz",
        body: (
          <p>
            Sila semak saiz anda sebelum memesan kemeja yang dijahit — hubungi kami jika anda tidak
            pasti. Item yang dijahit mengikut saiz pilihan anda dibuat khas untuk anda dan
            tertakluk pada terma item ikut saiz dalam polisi{" "}
            <Link href="/shipping-returns">Penghantaran & Pemulangan</Link> kami.
          </p>
        ),
      },
      {
        id: "ip",
        title: "Kandungan kami",
        body: (
          <p>
            Reka bentuk, gambar, teks dan logo di laman web ini adalah milik {BRAND_NAME}. Anda
            tidak boleh menyalin atau menggunakannya semula untuk tujuan komersial tanpa kebenaran
            bertulis daripada kami.
          </p>
        ),
      },
      {
        id: "liability",
        title: "Liabiliti",
        body: (
          <p>
            Tiada apa-apa dalam terma ini yang mengehadkan hak anda sebagai pengguna di bawah
            undang-undang Malaysia, termasuk Akta Perlindungan Pengguna 1999. Selain itu,
            liabiliti kami bagi sebarang pesanan adalah terhad kepada jumlah yang anda bayar
            untuknya.
          </p>
        ),
      },
      {
        id: "law",
        title: "Undang-undang yang mentadbir",
        body: <p>Terma ini ditadbir oleh undang-undang Malaysia.</p>,
      },
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams) {
  const t = await initLocale(params);
  const c = CONTENT[t.locale];
  return pageMetadata({ title: c.name, description: c.description, path: "/terms", locale: t.locale });
}

export default async function TermsPage({ params }: LocaleParams) {
  const t = await initLocale(params);
  const c = CONTENT[t.locale];
  return (
    <LegalPage
      path="/terms"
      name={c.name}
      eyebrow={c.eyebrow}
      title={rich(c.title)}
      description={c.description}
      updated={UPDATED}
      sections={c.sections}
    />
  );
}
