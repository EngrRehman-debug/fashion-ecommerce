import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "CWSK Enterprises FAQs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Help centre",
    title: "Questions, answered",
    subtitle: "Ordering, payment by QR, sizing, care, shipping and returns.",
    image: "/images/products/ungu-awan/1.webp",
  });
}
