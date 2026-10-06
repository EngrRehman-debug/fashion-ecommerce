import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";
import { toLocale } from "@/lib/i18n/server";
import { getTranslator } from "@/lib/i18n/translator";

export const alt = "CWSK Enterprises — handcrafted batik for men";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { m } = getTranslator(toLocale((await params).locale));
  return renderOg({
    ...m.site.ogImage,
    footer: m.common.handDyedInMalaysia,
    image: "/images/editorial/shirt-01.webp",
  });
}
