import { notFound } from "next/navigation";
import { initLocale, type LocaleParams } from "@/lib/i18n/server";

/** Any unknown URL lands here, so it gets app/[locale]/not-found.tsx in the visitor's language. */
export default async function CatchAll({ params }: LocaleParams) {
  await initLocale(params);
  notFound();
}
