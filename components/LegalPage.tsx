import type { ReactNode } from "react";
import ContactCta from "./ContactCta";
import JsonLd from "./JsonLd";
import PageHeader from "./PageHeader";
import { webPageSchema } from "@/lib/seo";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Shared layout for policy pages: header, sticky contents list, long-form sections. */
export default function LegalPage({
  path,
  name,
  eyebrow,
  title,
  description,
  updated,
  sections,
}: {
  path: string;
  name: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  /** ISO date, e.g. "2026-09-28". */
  updated: string;
  sections: LegalSection[];
}) {
  const updatedLabel = new Date(updated).toLocaleDateString("en-MY", { day: "numeric", month: "long", year: "numeric" });
  return (
    <>
      <JsonLd data={webPageSchema({ name, description, path, extra: { dateModified: updated } })} />
      <PageHeader
        crumbs={[{ name, path }]}
        eyebrow={eyebrow}
        title={title}
        intro={
          <>
            <p>{description}</p>
            <p className="mt-4 text-[13px] uppercase tracking-[0.18em] text-muted">Last updated {updatedLabel}</p>
          </>
        }
      />
      <section className="bg-cream-light py-16 lg:py-24">
        <div className="container-lux grid grid-cols-1 gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20">
          <nav aria-label="On this page" className="h-fit lg:sticky lg:top-28">
            <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted">On this page</p>
            <ol className="mt-4 space-y-1 border-l border-line">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[15px] text-ink-soft transition-colors hover:border-primary hover:text-primary"
                  >
                    <span className="mr-2 text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="prose-lux">
            {sections.map((s) => (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id} className="scroll-mt-32">
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
