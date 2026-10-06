import { renderPageOg } from "@/lib/i18n/og";
import { OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = "CWSK Enterprises shipping and returns";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image({ params }: { params: Promise<{ locale: string }> }) {
  return renderPageOg("shipping-returns", params);
}
