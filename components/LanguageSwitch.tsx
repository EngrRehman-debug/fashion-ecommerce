"use client";

import { changeLocale, useT } from "@/lib/i18n/client";
import { LOCALES, LOCALE_LABEL } from "@/lib/i18n/config";

/** EN | BM toggle. Picking the other language saves it and reloads the page in it. */
export default function LanguageSwitch({
  dark = false,
  large = false,
  className = "",
}: {
  /** Light text, for the dark footer. */
  dark?: boolean;
  /** Bigger targets, for the mobile menu. */
  large?: boolean;
  className?: string;
}) {
  const t = useT();
  return (
    <div
      role="group"
      aria-label={t.m.common.language}
      className={`inline-flex shrink-0 items-center rounded-full border p-0.5 ${
        dark ? "border-cream-light/25" : "border-line bg-white/60"
      } ${className}`}
    >
      {LOCALES.map((l) => {
        const active = l === t.locale;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            title={LOCALE_LABEL[l].name}
            aria-pressed={active}
            onClick={() => !active && changeLocale(l)}
            className={`rounded-full font-semibold tracking-[0.14em] transition-colors ${
              large ? "px-4 py-2 text-[13px]" : "px-2.5 py-1 text-[11px]"
            } ${
              active
                ? dark
                  ? "bg-cream-light text-ink"
                  : "bg-ink text-cream-light"
                : dark
                  ? "text-cream-light/70 hover:text-cream-light"
                  : "text-ink/60 hover:text-ink"
            }`}
          >
            {LOCALE_LABEL[l].short}
          </button>
        );
      })}
    </div>
  );
}
