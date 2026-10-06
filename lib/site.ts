import type { Messages } from "./i18n/messages/en";

/**
 * Site-wide configuration.
 *
 * ADMIN_WHATSAPP: the number that receives orders (Roslan), in full
 * international format WITHOUT the leading "+" or spaces.
 * Malaysian example: 60 (country code) + 123456789 => "60123456789".
 */
export const ADMIN_WHATSAPP = "60192224457";

export const BRAND_NAME = "CWSK Enterprises";
/** Company registration number, as printed on the logo. */
export const COMPANY_NO = "003317808-T";

/** Public URL of the live site — used for canonical links, sitemap and schema. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fashion-ecommerce-lovat-tau.vercel.app"
).replace(/\/$/, "");

export const SITE_DESCRIPTION =
  "Hand-crafted batik shirts, sets and sarongs for men, dyed by artisans in Malaysia. One print, one shirt — order on WhatsApp.";

/** The admin number formatted for display. */
export const WHATSAPP_DISPLAY = "+60 19-222 4457";

export const whatsappLink = (text?: string) =>
  `https://wa.me/${ADMIN_WHATSAPP}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/** Absolute URL for a site path. */
export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Who is buying — collected at checkout. */
export type Customer = {
  name: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  state: string;
  country: string;
  notes?: string;
};

/** One line of the order, already resolved to display strings. */
export type OrderLine = {
  name: string;
  option: string;
  size?: string | null;
  qty: number;
  /** "RM 350" or "To be confirmed". */
  price: string;
  url: string;
};

/**
 * Build the WhatsApp "click to chat" link that carries the whole order.
 *
 * Payment is manual: the admin replies with a payment QR, the customer sends
 * back the receipt, and the order ships once payment is confirmed.
 */
export function buildWhatsAppOrderUrl(opts: {
  orderId: string;
  lines: OrderLine[];
  total: string;
  customer: Customer;
  /** The message wording, in the customer's language (messages.whatsapp). */
  copy: Messages["whatsapp"];
}) {
  const { customer, copy } = opts;
  const out = [copy.orderIntro, "", copy.orderHeading(opts.orderId)];
  opts.lines.forEach((l, i) => {
    out.push(`${i + 1}. ${l.name} — ${l.option}${l.size ? `, ${copy.size(l.size)}` : ""}`);
    out.push(`   ${copy.qty} ${l.qty} × ${l.price}`);
    out.push(`   ${l.url}`);
  });
  out.push(`*${copy.total}: ${opts.total}*`);
  out.push(
    "",
    `*${copy.deliverTo}*`,
    `${copy.name}: ${customer.name.trim()}`,
    `${copy.phone}: ${customer.phone.trim()}`,
    `${copy.address}: ${customer.address.trim()}`,
    `${customer.postcode.trim()} ${customer.city.trim()}, ${customer.state.trim()}, ${customer.country.trim()}`
  );
  if (customer.notes?.trim()) out.push(`${copy.notes}: ${customer.notes.trim()}`);
  out.push("", copy.orderClosing);
  return whatsappLink(out.join("\n"));
}
