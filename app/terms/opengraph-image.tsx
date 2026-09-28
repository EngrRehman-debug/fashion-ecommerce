import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "CWSK Enterprises terms of service";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "The small print",
    title: "Terms of Service",
    subtitle: "The terms for ordering hand-dyed batik on WhatsApp.",
    image: "/images/editorial/shirt-05.webp",
  });
}
