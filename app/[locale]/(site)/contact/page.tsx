import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight, PinIcon, QrIcon, WhatsAppIcon } from "@/components/icons";
import { initLocale, type LocaleParams } from "@/lib/i18n/server";
import { rich } from "@/lib/i18n/rich";
import { ORG_ID, pageMetadata, webPageSchema } from "@/lib/seo";
import { BRAND_NAME, COMPANY_NO, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site";

export async function generateMetadata({ params }: LocaleParams) {
  const t = await initLocale(params);
  return pageMetadata({
    title: t.m.contact.metaTitle,
    description: t.m.contact.description(WHATSAPP_DISPLAY),
    path: "/contact",
    locale: t.locale,
  });
}

export default async function ContactPage({ params }: LocaleParams) {
  const t = await initLocale(params);
  const k = t.m.contact;
  const cards = [
    {
      icon: WhatsAppIcon,
      theme: "bg-[#e9f7ef] border-[#bfe6cf] hover:border-[#25D366]",
      iconWrap: "bg-[#25D366] text-white",
      accent: "text-[#128C4B]",
      title: k.whatsapp.title,
      body: WHATSAPP_DISPLAY,
      note: k.whatsapp.note,
      href: whatsappLink(t.m.whatsapp.hello),
      cta: k.whatsapp.cta,
    },
    {
      icon: QrIcon,
      theme: "bg-primary-wash border-[#c9d8f0] hover:border-primary",
      iconWrap: "bg-primary text-white",
      accent: "text-primary",
      title: k.support.title,
      body: k.support.body,
      note: k.support.note,
      href: "/faq",
      cta: k.support.cta,
    },
    {
      icon: PinIcon,
      theme: "bg-[#f8efe3] border-[#ead6ba] hover:border-gold",
      iconWrap: "bg-gold text-white",
      accent: "text-[#8a6532]",
      title: k.company.title,
      body: `${BRAND_NAME}`,
      note: k.company.note(COMPANY_NO),
      href: "/about",
      cta: k.company.cta,
    },
  ];

  return (
    <>
      <JsonLd
        data={webPageSchema({
          type: "ContactPage",
          name: k.schemaName(BRAND_NAME),
          description: k.description(WHATSAPP_DISPLAY),
          path: "/contact",
          locale: t.locale,
          extra: { mainEntity: { "@id": ORG_ID } },
        })}
      />

      <PageHeader
        crumbs={[{ name: k.crumb, path: "/contact" }]}
        eyebrow={k.eyebrow}
        title={rich(k.title)}
        intro={k.intro}
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
                    className={`group flex h-full flex-col border p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-card sm:p-8 ${c.theme}`}
                  >
                    <span className={`flex h-14 w-14 items-center justify-center rounded-full shadow-soft transition-transform duration-500 group-hover:scale-110 ${c.iconWrap}`}>
                      <Icon className="h-7 w-7" />
                    </span>
                    <p className={`mt-6 text-[12px] font-medium uppercase tracking-[0.2em] ${c.accent}`}>{c.title}</p>
                    <p className="mt-2 font-serif text-3xl text-ink">{c.body}</p>
                    <p className="mt-2 flex-1 text-[15px] text-ink-soft">{c.note}</p>
                    <span className={`mt-6 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] ${c.accent}`}>
                      {c.cta} <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">{k.formEyebrow}</p>
              <h2 className="mt-5 font-serif text-[2.6rem] font-medium leading-[1] text-ink sm:text-display">
                {rich(k.formTitle)}
              </h2>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink-soft">{k.formIntro}</p>
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
