import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight, PinIcon, QrIcon, WhatsAppIcon } from "@/components/icons";
import { ORG_ID, pageMetadata, webPageSchema } from "@/lib/seo";
import { BRAND_NAME, COMPANY_NO, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site";

const DESCRIPTION = `Contact ${BRAND_NAME} on WhatsApp (${WHATSAPP_DISPLAY}) for orders, sizing, returns and product questions about our hand-dyed batik.`;

export const metadata = pageMetadata({ title: "Contact Us", description: DESCRIPTION, path: "/contact" });

export default function ContactPage() {
  const cards = [
    {
      icon: WhatsAppIcon,
      iconClass: "text-[#25D366]",
      title: "WhatsApp",
      body: WHATSAPP_DISPLAY,
      note: "Orders, payment & questions — the fastest way to reach us.",
      href: whatsappLink("Hi CWSK Enterprises!"),
      cta: "Start a chat",
    },
    {
      icon: QrIcon,
      iconClass: "text-primary",
      title: "Order support",
      body: "Have an order number?",
      note: "Send it with your message and we’ll pick up right where we left off.",
      href: "/faq",
      cta: "Read the FAQs",
    },
    {
      icon: PinIcon,
      iconClass: "text-primary",
      title: "Company",
      body: `${BRAND_NAME}`,
      note: `Registered in Malaysia · ${COMPANY_NO}`,
      href: "/about",
      cta: "About us",
    },
  ];

  return (
    <>
      <JsonLd
        data={webPageSchema({
          type: "ContactPage",
          name: `Contact ${BRAND_NAME}`,
          description: DESCRIPTION,
          path: "/contact",
          extra: { mainEntity: { "@id": ORG_ID } },
        })}
      />

      <PageHeader
        crumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Get in touch"
        title={<>We’d love to <em className="text-primary">hear from you</em></>}
        intro="Questions about a print, your size or an order? We’re a WhatsApp message away and usually reply the same day."
      />

      <section className="bg-cream-light py-16 lg:py-24">
        <div className="container-lux">
          <div className="grid gap-5 md:grid-cols-3">
            {cards.map((c, i) => {
              const external = c.href.startsWith("http");
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={i * 0.08}>
                  <Link
                    href={c.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex h-full flex-col border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-ink/30 hover:shadow-card"
                  >
                    <Icon className={`h-9 w-9 ${c.iconClass}`} />
                    <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.2em] text-muted">{c.title}</p>
                    <p className="mt-2 font-serif text-3xl text-ink">{c.body}</p>
                    <p className="mt-2 flex-1 text-[15px] text-ink-soft">{c.note}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] text-ink">
                      {c.cta} <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Send a message</p>
              <h2 className="mt-5 font-serif text-[2.6rem] font-medium leading-[1] text-ink sm:text-display">
                Write to us, <em className="text-primary">we’ll reply on WhatsApp</em>
              </h2>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink-soft">
                Fill in the form and press send — it opens WhatsApp with your message ready to go.
                No email address or account needed.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="border border-line bg-white p-7 sm:p-10">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
