import type { ReactNode } from "react";
import { ChevronDown } from "./icons";

/** Native <details> disclosure — works without JavaScript and is crawlable. */
export default function Accordion({
  title,
  open = false,
  large = false,
  children,
}: {
  title: ReactNode;
  open?: boolean;
  large?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={open} className="group border-b border-line">
      <summary
        className={`flex cursor-pointer list-none items-center justify-between gap-6 transition-colors hover:text-primary [&::-webkit-details-marker]:hidden ${
          large
            ? "py-6 font-serif text-[22px] leading-snug text-ink sm:text-2xl"
            : "py-5 text-[14px] font-medium uppercase tracking-[0.16em] text-ink"
        }`}
      >
        {title}
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-300 group-open:rotate-180 group-open:border-ink group-open:bg-ink group-open:text-cream-light">
          <ChevronDown className="h-4 w-4" />
        </span>
      </summary>
      <div className={`animate-fade-in pb-6 leading-relaxed text-ink-soft ${large ? "max-w-3xl text-[16px]" : "text-[15px]"}`}>
        {children}
      </div>
    </details>
  );
}
