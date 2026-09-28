import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "CWSK Enterprises shipping and returns";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Delivery & returns",
    title: "Shipping & Returns",
    subtitle: "Insured, tracked worldwide delivery and 30-day returns.",
    image: "/images/products/set-malam-kota/1.webp",
  });
}
