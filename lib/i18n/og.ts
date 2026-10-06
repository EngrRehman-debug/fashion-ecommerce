/**
 * Text on the share images of the content pages (app/[locale]/<page>/opengraph-image.tsx),
 * in both languages. The image's `alt` export is static, so it stays in English.
 */

import { renderOg } from "@/lib/og";
import { WHATSAPP_DISPLAY } from "@/lib/site";
import { toLocale } from "./server";
import { getTranslator } from "./translator";

type Card = { eyebrow: string; title: string; subtitle: string };

const PAGES = {
  about: {
    image: "/images/products/bulan-nila/1.webp",
    en: { eyebrow: "Our story", title: "Batik, carried forward", subtitle: "Hand-crafted batik for men, dyed by artisans in Malaysia." },
    ms: { eyebrow: "Kisah kami", title: "Batik, diteruskan", subtitle: "Batik buatan tangan untuk lelaki, dicelup oleh tukang batik di Malaysia." },
  },
  contact: {
    image: "/images/products/mentari/1.webp",
    en: { eyebrow: "Get in touch", title: "We’d love to hear from you", subtitle: `Orders and questions on WhatsApp: ${WHATSAPP_DISPLAY}.` },
    ms: { eyebrow: "Hubungi kami", title: "Kami sedia mendengar", subtitle: `Pesanan dan soalan di WhatsApp: ${WHATSAPP_DISPLAY}.` },
  },
  faq: {
    image: "/images/products/ungu-awan/1.webp",
    en: { eyebrow: "Help centre", title: "Questions, answered", subtitle: "Ordering, payment by QR, sizing, care, shipping and returns." },
    ms: { eyebrow: "Pusat bantuan", title: "Soalan, terjawab", subtitle: "Pesanan, bayaran QR, saiz, penjagaan, penghantaran dan pemulangan." },
  },
  "privacy-policy": {
    image: "/images/editorial/shirt-10.webp",
    en: { eyebrow: "Your data", title: "Privacy Policy", subtitle: "How we collect, use and protect your personal data." },
    ms: { eyebrow: "Data anda", title: "Dasar Privasi", subtitle: "Cara kami mengumpul, menggunakan dan melindungi data peribadi anda." },
  },
  "shipping-returns": {
    image: "/images/products/set-malam-kota/1.webp",
    en: { eyebrow: "Delivery & returns", title: "Shipping & Returns", subtitle: "Insured, tracked worldwide delivery and 30-day returns." },
    ms: { eyebrow: "Penghantaran", title: "Penghantaran & Pemulangan", subtitle: "Penghantaran berinsurans ke seluruh dunia dan pemulangan 30 hari." },
  },
  terms: {
    image: "/images/editorial/shirt-05.webp",
    en: { eyebrow: "The small print", title: "Terms of Service", subtitle: "The terms for ordering hand-dyed batik on WhatsApp." },
    ms: { eyebrow: "Cetakan halus", title: "Terma Perkhidmatan", subtitle: "Terma untuk memesan batik celup tangan di WhatsApp." },
  },
} satisfies Record<string, { image: string; en: Card; ms: Card }>;

export async function renderPageOg(page: keyof typeof PAGES, params: Promise<{ locale: string }>) {
  const locale = toLocale((await params).locale);
  const entry = PAGES[page];
  return renderOg({ ...entry[locale], image: entry.image, footer: getTranslator(locale).m.common.handDyedInMalaysia });
}
