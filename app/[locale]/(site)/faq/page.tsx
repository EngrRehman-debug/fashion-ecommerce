import Accordion from "@/components/Accordion";
import ContactCta from "@/components/ContactCta";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { initLocale, type LocaleParams } from "@/lib/i18n/server";
import { rich } from "@/lib/i18n/rich";
import { pageMetadata, webPageSchema } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  const t = await initLocale(params);
  return pageMetadata({ title: t.m.faq.metaTitle, description: t.m.faq.description, path: "/faq", locale: t.locale });
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function FaqPage({ params }: LocaleParams) {
  const t = await initLocale(params);
  const f = t.m.faq;
  const { faq } = t.content;
  const all = faq.groups.flatMap((g) => g.items);
  return (
    <>
      <JsonLd
        data={webPageSchema({
          type: "FAQPage",
          name: f.schemaName,
          description: f.description,
          path: "/faq",
          locale: t.locale,
          extra: {
            mainEntity: all.map((it) => ({
              "@type": "Question",
              name: it.q,
              acceptedAnswer: { "@type": "Answer", text: it.a },
            })),
          },
        })}
      />

      <PageHeader
        crumbs={[{ name: f.crumb, path: "/faq" }]}
        eyebrow={f.eyebrow}
        title={rich(f.title)}
        intro={f.intro}
      />

      <section className="bg-cream-light py-16 lg:py-24">
        <div className="container-lux grid grid-cols-1 gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20">
          <nav aria-label={f.topicsAria} className="h-fit lg:sticky lg:top-28">
            <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted">{f.topics}</p>
            <ul className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 [mask-image:linear-gradient(to_right,#000_calc(100%-32px),transparent)] lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:[mask-image:none]">
              {faq.groups.map((g) => (
                <li key={g.title} className="shrink-0">
                  <a
                    href={`#${slug(g.title)}`}
                    className="block whitespace-nowrap border border-line bg-white px-4 py-2 text-[14px] text-ink transition-colors hover:border-ink lg:border-0 lg:border-l-2 lg:border-line lg:bg-transparent lg:px-4 lg:py-2.5 lg:hover:border-primary lg:hover:text-primary"
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-16">
            {faq.groups.map((g) => (
              <Reveal key={g.title} as="section">
                <h2 id={slug(g.title)} className="scroll-mt-32 border-b border-ink pb-4 font-serif text-4xl text-ink">
                  {g.title}
                </h2>
                {g.items.map((it, i) => (
                  <Accordion key={it.q} title={it.q} large open={i === 0}>
                    <p>{it.a}</p>
                  </Accordion>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
