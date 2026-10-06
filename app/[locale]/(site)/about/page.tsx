import Link from "next/link";
import CollectionStrip from "@/components/CollectionStrip";
import ContactCta from "@/components/ContactCta";
import RotatingShot from "@/components/RotatingShot";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHeader";
import ProcessSteps from "@/components/ProcessSteps";
import Reveal from "@/components/Reveal";
import Services from "@/components/Services";
import { ArrowRight } from "@/components/icons";
import { CATEGORIES, PRODUCTS, categorySlides } from "@/lib/catalog";
import { initLocale, type LocaleParams } from "@/lib/i18n/server";
import { rich } from "@/lib/i18n/rich";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { BRAND_NAME, COMPANY_NO } from "@/lib/site";

const ABOUT_MAIN = categorySlides("short-sleeve", 6, false);
const ABOUT_SIDE = categorySlides("batik-pawang", 5);
const ABOUT_TOP = categorySlides("sarong", 5);

export async function generateMetadata({ params }: LocaleParams) {
  const t = await initLocale(params);
  return pageMetadata({ title: t.m.about.metaTitle, description: t.m.about.description, path: "/about", locale: t.locale });
}

export default async function AboutPage({ params }: LocaleParams) {
  const t = await initLocale(params);
  const a = t.m.about;
  const tag = t.m.common.shopName("{name}");
  return (
    <>
      <JsonLd
        data={webPageSchema({
          type: "AboutPage",
          name: a.schemaName(BRAND_NAME),
          description: a.description,
          path: "/about",
          locale: t.locale,
        })}
      />

      {/* No hero — the story opens the page. */}
      <section className="bg-cream-light pb-20 pt-6 lg:pb-28 lg:pt-8">
        <div className="container-lux">
          <Breadcrumbs items={[{ name: a.crumb, path: "/about" }]} />
        </div>
        <div className="container-lux mt-10 grid grid-cols-1 items-center gap-14 lg:mt-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-24">
          {/* Main shot on the left, one smaller shot top-right and one bottom-right;
              each cycles through its own range, out of step with the others. */}
          <Reveal className="relative mx-auto w-full max-w-[460px] pb-10 sm:pb-16 lg:mx-0">
            <div className="aspect-[4/5]">
              <RotatingShot slides={ABOUT_MAIN} every={3200} offset={1600} tag={tag} />
            </div>
            <div className="absolute -right-4 top-[10%] hidden w-[34%] border-[6px] border-cream-light shadow-card sm:block lg:-right-24">
              <div className="aspect-[3/4]">
                <RotatingShot slides={ABOUT_TOP} every={3200} offset={2400} tag={tag} tagClassName="bottom-2 right-2 h-9 w-9" />
              </div>
            </div>
            <div className="absolute -right-4 bottom-0 hidden w-[42%] border-[6px] border-cream-light shadow-card sm:block lg:-right-20">
              <div className="aspect-[3/4]">
                <RotatingShot slides={ABOUT_SIDE} every={3200} offset={3200} tag={tag} tagClassName="bottom-2 right-2 h-9 w-9" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="max-w-xl">
            <p className="eyebrow">{a.eyebrow}</p>
            <h1 className="mt-5 font-serif text-[2.6rem] font-medium leading-[1] text-ink sm:text-display">
              {rich(a.title)}
            </h1>
            <div className="prose-lux mt-8">
              <p>{a.p1(BRAND_NAME)}</p>
              <p>{a.p2}</p>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {[
                { v: `${PRODUCTS.length}+`, l: a.statDesigns },
                { v: String(CATEGORIES.length), l: a.statRanges },
                { v: "100%", l: a.statHandDyed },
              ].map((s) => (
                <div key={s.l} className="flex flex-col-reverse">
                  <dt className="mt-1 text-[12px] uppercase tracking-[0.16em] text-muted sm:text-[13px]">{s.l}</dt>
                  <dd className="font-serif text-4xl text-ink">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <CollectionStrip title={rich(a.collectionTitle)} />

      {/* Process */}
      <section className="bg-ink py-20 text-cream-light lg:py-28">
        <div className="container-lux">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-light">{a.processEyebrow}</p>
            <h2 className="mt-5 font-serif text-[2.6rem] font-medium leading-[1] sm:text-display">
              {rich(a.processTitle, "text-gold-light")}
            </h2>
          </Reveal>
          <ProcessSteps className="mt-10 lg:mt-14" />
        </div>
      </section>

      {/* Registered business */}
      <section className="bg-cream-light py-14 lg:py-20">
        <div className="container-lux">
          <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="max-w-xl font-serif text-3xl leading-snug text-ink">
              {a.registered(BRAND_NAME, COMPANY_NO)}
            </p>
            <Link href="/shop" className="btn-primary">
              <span>{t.m.common.shopCollection}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Services className="bg-white" />
      <div className="h-20 bg-cream-light lg:h-28" />
      <ContactCta title={a.moreTitle} />
    </>
  );
}
