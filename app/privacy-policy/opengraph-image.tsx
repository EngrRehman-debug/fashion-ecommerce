import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "CWSK Enterprises privacy policy";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Your data",
    title: "Privacy Policy",
    subtitle: "How we collect, use and protect your personal data.",
    image: "/images/editorial/shirt-10.webp",
  });
}
