import Link from "next/link";
import CollectionStrip from "@/components/CollectionStrip";
import ContactCta from "@/components/ContactCta";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import Services from "@/components/Services";
import { ArrowRight } from "@/components/icons";
import heritage from "@/data/heritage.json";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { IMAGES } from "@/lib/images";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { BRAND_NAME, COMPANY_NO } from "@/lib/site";

const DESCRIPTION =
  "CWSK Enterprises makes hand-crafted batik for men — shirts, sets, sarongs and scarves dyed by artisans in Malaysia using centuries-old wax-resist techniques.";

export const metadata = pageMetadata({ title: "About Us", description: DESCRIPTION, path: "/about" });

const VALUES = [
  {
    title: "Made by hand",
    text: "Every piece is drawn in wax and dyed by an artisan. No machines, no shortcuts — only wax, dye, cloth and patience.",
  },
  {
    title: "One of one",
    text: "Because each batik is made by hand, no two are ever exactly alike. The small irregularities are the signature.",
  },
  {
    title: "Made to be worn",
    text: "Bold enough for a wedding, easy enough for every day. We make batik for real life, not for the back of a wardrobe.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({ type: "AboutPage", name: `About ${BRAND_NAME}`, description: DESCRIPTION, path: "/about" })}
      />

      <PageHeader
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="Our story"
        title={<>Batik, carried <em className="text-primary">forward</em></>}
        intro="We make hand-crafted batik for men — shirts, sets, sarongs and scarves — dyed by artisans in Malaysia using techniques passed down for generations."
      />

      {/* Story */}
      <section className="bg-cream-light py-20 lg:py-28">
        <div className="container-lux grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-cream">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMAGES.about} alt="Short-sleeve batik shirt from the CWSK studio shoot" className="h-full w-full object-cover object-top" />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden w-[44%] overflow-hidden border-[6px] border-cream-light sm:block lg:-right-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMAGES.heritageA} alt="Close-up of hand-dyed batik" className="aspect-[3/4] w-full object-cover object-top" />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="max-w-xl">
            <p className="eyebrow">Who we are</p>
            <h2 className="mt-5 font-serif text-[2.6rem] font-medium leading-[1] text-ink sm:text-display">
              Batik is not printed. <em className="text-primary">It is made by hand.</em>
            </h2>
            <div className="prose-lux mt-8">
              <p>
                Batik is a centuries-old wax-resist dyeing tradition, kept alive today by artisans
                across Malaysia. {BRAND_NAME} was founded to bring that craft into the modern man’s
                wardrobe — not as a costume for special occasions, but as something you reach for
                again and again.
              </p>
              <p>
                A single piece can take days to complete. That is the point. Each one carries the
                small irregularities of a human hand, which is precisely what makes it yours alone.
                One print. One piece. Made to be worn, not repeated.
              </p>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {[
                { v: `${PRODUCTS.length}+`, l: "Designs" },
                { v: String(CATEGORIES.length), l: "Ranges" },
                { v: "100%", l: "Hand-dyed" },
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

      <CollectionStrip
        title={
          <>
            The craft, <em className="text-primary">worn</em>
          </>
        }
      />

      {/* Process */}
      <section className="bg-ink py-20 text-cream-light lg:py-28">
        <div className="container-lux">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-light">The process</p>
            <h2 className="mt-5 font-serif text-[2.6rem] font-medium leading-[1] sm:text-display">
              From wax to <em className="text-gold-light">wardrobe</em>
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-px bg-cream-light/15 md:grid-cols-3">
            {heritage.steps.map((s) => (
              <StaggerItem key={s.n} className="bg-ink p-8 lg:p-10">
                <p className="font-serif text-6xl italic text-gold-light">{s.n}</p>
                <h3 className="mt-6 font-serif text-3xl">{s.title}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-cream-light/70">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-light py-20 lg:py-28">
        <div className="container-lux">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">What we believe</p>
            <h2 className="mt-5 font-serif text-[2.6rem] font-medium leading-[1] text-ink sm:text-display">
              Three things we <em className="text-primary">never</em> compromise on
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <StaggerItem key={v.title} className="group border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-card lg:p-10">
                <p className="font-serif text-2xl italic text-gold">0{i + 1}</p>
                <h3 className="mt-5 font-serif text-3xl text-ink">{v.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{v.text}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 sm:flex-row sm:items-center">
            <p className="max-w-xl font-serif text-3xl leading-snug text-ink">
              {BRAND_NAME} is a registered Malaysian business ({COMPANY_NO}).
            </p>
            <Link href="/shop" className="btn-primary">
              <span>Shop the collection</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Services className="bg-white" />
      <div className="h-20 bg-cream-light lg:h-28" />
      <ContactCta title="Want to know more?" />
    </>
  );
}
