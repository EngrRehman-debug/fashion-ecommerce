import Accordion from "@/components/Accordion";
import ContactCta from "@/components/ContactCta";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import faq from "@/data/faq.json";
import { pageMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "Frequently Asked Questions";
const DESCRIPTION =
  "How to order batik from CWSK Enterprises on WhatsApp, paying by QR, sizes, unstitched vs stitched, care, worldwide shipping and 30-day returns.";

export const metadata = pageMetadata({ title: "FAQs", description: DESCRIPTION, path: "/faq" });

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function FaqPage() {
  const all = faq.groups.flatMap((g) => g.items);
  return (
    <>
      <JsonLd
        data={webPageSchema({
          type: "FAQPage",
          name: TITLE,
          description: DESCRIPTION,
          path: "/faq",
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
        crumbs={[{ name: "FAQs", path: "/faq" }]}
        eyebrow="Help centre"
        title={<>Questions, <em className="text-primary">answered</em></>}
        intro="Everything you need to know about ordering, paying, sizing and delivery. Can’t find it? We’re a WhatsApp message away."
      />

      <section className="bg-cream-light py-16 lg:py-24">
        <div className="container-lux grid grid-cols-1 gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20">
          <nav aria-label="FAQ topics" className="h-fit lg:sticky lg:top-28">
            <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted">Topics</p>
            <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-0">
              {faq.groups.map((g) => (
                <li key={g.title}>
                  <a
                    href={`#${slug(g.title)}`}
                    className="block border border-line bg-white px-4 py-2 text-[14px] text-ink transition-colors hover:border-ink lg:border-0 lg:border-l-2 lg:border-line lg:bg-transparent lg:px-4 lg:py-2.5 lg:hover:border-primary lg:hover:text-primary"
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
