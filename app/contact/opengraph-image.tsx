import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Contact CWSK Enterprises";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Get in touch",
    title: "We’d love to hear from you",
    subtitle: "Orders and questions on WhatsApp: +60 19-222 4457.",
    image: "/images/products/mentari/1.webp",
  });
}
