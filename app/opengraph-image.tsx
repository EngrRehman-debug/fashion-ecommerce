import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "CWSK Enterprises — handcrafted batik for men";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Handcrafted Batik",
    title: "Batik, tailored for the modern man",
    subtitle: "Shirts, sets and sarongs, dyed by hand in Malaysia.",
    image: "/images/editorial/shirt-01.webp",
  });
}
