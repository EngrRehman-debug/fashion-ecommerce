import SmartImage from "./SmartImage";
import SectionHeading from "./SectionHeading";
import Reveal, { Stagger, StaggerItem } from "./Reveal";
import { IMAGES } from "@/lib/images";
import journal from "@/data/journal.json";
import { ArrowRight } from "./icons";

const [featured, ...rest] = journal.posts;

/** Editorial layout: one featured story beside a stacked index of the others. */
export default function Journal() {
  return (
    <section id="journal" className="bg-white py-20 lg:py-28">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Worn & written"
          title={
            <>
              The <em className="text-primary">Journal</em>
            </>
          }
          intro="Notes on motifs, styling and care — how to read, wear and keep your batik."
        />

        {/* Desktop: a fixed-height band so the feature and the index line up top and bottom. */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:h-[min(76vh,700px)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)] lg:gap-16">
          {/* Featured story: image with the headline laid over it */}
          <Reveal as="article" className="group relative overflow-hidden bg-ink">
            <div className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:h-full">
              <SmartImage
                src={featured.image}
                fallback={IMAGES.fallback}
                alt={featured.title}
                className="h-full w-full object-cover object-top opacity-90 transition-all duration-[1400ms] ease-lux group-hover:scale-[1.04] group-hover:opacity-100"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-gold-light">
                <span className="font-serif text-2xl italic normal-case tracking-normal">01</span>
                {featured.category}
              </p>
              <h3 className="mt-4 max-w-lg font-serif text-[2.1rem] leading-[1.02] text-cream-light sm:text-5xl">
                {featured.title}
              </h3>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-cream-light/75">{featured.excerpt}</p>
            </div>
          </Reveal>

          {/* The rest, as an index */}
          <Stagger className="flex flex-col divide-y divide-line border-y border-line lg:h-full">
            {rest.map((post, i) => (
              <StaggerItem key={post.title} className="lg:min-h-0 lg:flex-1">
                <article className="group grid h-full grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] items-center gap-5 py-6 sm:gap-8 lg:py-7">
                  <div className="aspect-[4/5] overflow-hidden bg-cream lg:aspect-auto lg:h-full">
                    <SmartImage
                      src={post.image}
                      fallback={IMAGES.fallback}
                      alt={post.title}
                      className="h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.06]"
                    />
                  </div>
                  <div>
                    <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                      <span className="font-serif text-2xl italic normal-case tracking-normal text-gold">
                        {String(i + 2).padStart(2, "0")}
                      </span>
                      {post.category}
                    </p>
                    <h3 className="mt-3 font-serif text-[26px] leading-tight text-ink transition-colors group-hover:text-primary sm:text-[32px]">
                      {post.title}
                    </h3>
                    <p className="mt-3 hidden text-[15px] leading-relaxed text-ink-soft sm:block">{post.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em] text-ink">
                      Coming soon
                      <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
