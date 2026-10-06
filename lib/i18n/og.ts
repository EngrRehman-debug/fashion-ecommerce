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
  policies: {
    image: "/images/products/set-malam-kota/1.webp",
    en: { eyebrow: "Good to know", title: "Shop Policies", subtitle: "Ordering, delivery, 30-day returns and your details." },
    ms: { eyebrow: "Perlu tahu", title: "Polisi Kedai", subtitle: "Pesanan, penghantaran, pemulangan 30 hari dan butiran anda." },
  },
} satisfies Record<string, { image: string; en: Card; ms: Card }>;

export async function renderPageOg(page: keyof typeof PAGES, params: Promise<{ locale: string }>) {
  const locale = toLocale((await params).locale);
  const entry = PAGES[page];
  return renderOg({ ...entry[locale], image: entry.image, footer: getTranslator(locale).m.common.handDyedInMalaysia });
}
