import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "About CWSK Enterprises";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Our story",
    title: "Batik, carried forward",
    subtitle: "Hand-crafted batik for men, dyed by artisans in Malaysia.",
    image: "/images/products/bulan-nila/1.webp",
  });
}
