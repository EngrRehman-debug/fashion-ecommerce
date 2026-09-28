import Link from "next/link";
import type { ReactNode } from "react";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export type Crumb = { name: string; path: string };

/** Breadcrumb trail (visible + BreadcrumbList schema). "Home" is added automatically. */
export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] uppercase tracking-[0.18em] text-muted sm:text-[13px]">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="text-sand">/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-ink">{c.name}</span>
              ) : (
                <Link href={c.path} className="transition-colors hover:text-ink">{c.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/** Title band for inner pages. */
export default function PageHeader({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-cream">
      <p
        aria-hidden
        className="pointer-events-none absolute -right-4 bottom-[-0.25em] select-none font-serif text-[22vw] italic leading-none text-ink/[0.04] lg:text-[14vw]"
      >
        CWSK
      </p>
      <div className="container-lux relative py-12 lg:py-20">
        <Breadcrumbs items={crumbs} />
        {/* CSS entrance, so the heading shows before JavaScript loads. */}
        <div className="mt-10 max-w-4xl animate-rise lg:mt-14">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 font-serif text-[2.9rem] font-medium leading-[0.98] text-ink sm:text-display lg:text-display-lg">
            {title}
          </h1>
          {intro && <div className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-soft">{intro}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}
