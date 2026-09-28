/** Builds /llms.txt and /llms-full.txt (https://llmstxt.org) from the site data. */

import faq from "@/data/faq.json";
import { CATEGORIES, PRODUCTS, designs, formatMYR, getCategory, productsIn } from "./catalog";
import { BRAND_NAME, COMPANY_NO, SITE_DESCRIPTION, WHATSAPP_DISPLAY, absoluteUrl } from "./site";

const PAGES = [
  { path: "/about", title: "About us", note: "Who we are and how our batik is made" },
  { path: "/faq", title: "FAQs", note: "Ordering, payment, sizing, care, shipping and returns" },
  { path: "/shipping-returns", title: "Shipping & Returns", note: "Delivery, 30-day returns, refunds" },
  { path: "/contact", title: "Contact", note: `WhatsApp ${WHATSAPP_DISPLAY}` },
  { path: "/privacy-policy", title: "Privacy Policy", note: "How personal data is handled" },
  { path: "/terms", title: "Terms of Service", note: "Terms for orders and use of the site" },
];

const pricing = (id: string) => {
  const c = getCategory(id)!;
  return c.options.map((o) => `${o.label} (${o.note}): ${formatMYR(o.price)}`).join("; ");
};

function header() {
  return [
    `# ${BRAND_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `${BRAND_NAME} (${COMPANY_NO}) is a Malaysian brand of hand-crafted batik for men. There is no online card payment: customers add items to a cart, check out, and the order is sent on WhatsApp (${WHATSAPP_DISPLAY}). The business replies with a payment QR and ships worldwide once payment is confirmed. Unworn items can be returned within 30 days. Prices are in Malaysian Ringgit (RM).`,
    "",
  ];
}

function ranges() {
  return [
    "## Shop by range",
    "",
    `- [All products](${absoluteUrl("/shop")}): ${PRODUCTS.length} designs`,
    ...CATEGORIES.map(
      (c) =>
        `- [${c.name}](${absoluteUrl(`/shop?category=${c.id}`)}): ${c.tagline} ${designs(productsIn(c.id).length)}. ${pricing(c.id)}.${
          c.sizes.length ? ` Sizes ${c.sizes.join(", ")}.` : ""
        }`
    ),
    "",
  ];
}

function pages() {
  return ["## Information", "", ...PAGES.map((p) => `- [${p.title}](${absoluteUrl(p.path)}): ${p.note}`), ""];
}

export function llmsTxt() {
  return [
    ...header(),
    ...ranges(),
    ...pages(),
    "## Optional",
    "",
    `- [Full product list and FAQ](${absoluteUrl("/llms-full.txt")}): every design with colour, motif and link, plus all FAQ answers`,
    "",
  ].join("\n");
}

export function llmsFullTxt() {
  const products = CATEGORIES.flatMap((c) => [
    `### ${c.name}`,
    "",
    ...productsIn(c.id).map(
      (p) => `- [${p.name}](${absoluteUrl(`/shop/${p.slug}`)}): ${p.motif}, ${p.colour.toLowerCase()}.`
    ),
    "",
  ]);
  const answers = faq.groups.flatMap((g) => [
    `### ${g.title}`,
    "",
    ...g.items.flatMap((it) => [`**${it.q}**`, "", it.a, ""]),
  ]);
  return [...header(), ...ranges(), ...pages(), "## Products", "", ...products, "## FAQ", "", ...answers].join("\n");
}
