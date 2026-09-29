import SmartImage from "./SmartImage";
import SectionHeading from "./SectionHeading";
import Reveal, { Stagger, StaggerItem } from "./Reveal";
import { IMAGES } from "@/lib/images";
import journal from "@/data/journal.json";
import { ArrowRight } from "./icons";

/** Each story has its own colour, set by `tone` in data/journal.json. */
const TONES = {
  indigo: {
    overlay: "from-[#0d1f47] via-[#0d1f47]/45",
    accent: "text-[#a9c1f0]",
    card: "bg-[#ebf0f9] hover:bg-[#e1e9f6]",
    label: "text-[#1b5bb0]",
    rule: "bg-[#1b5bb0]",
  },
  terracotta: {
    overlay: "from-[#4d1a10] via-[#4d1a10]/45",
    accent: "text-[#f3bca6]",
    card: "bg-[#f8ece6] hover:bg-[#f4e2d9]",
    label: "text-[#a8472d]",
    rule: "bg-[#a8472d]",
  },
  forest: {
    overlay: "from-[#0f3024] via-[#0f3024]/45",
    accent: "text-[#a9d8c2]",
    card: "bg-[#e8f2ed] hover:bg-[#dcece4]",
    label: "text-[#2c6a52]",
    rule: "bg-[#2c6a52]",
  },
} as const;

type Tone = keyof typeof TONES;
const tone = (t?: string) => TONES[(t as Tone) in TONES ? (t as Tone) : "indigo"];

const [featured, ...rest] = journal.posts;

/** Editorial layout: one featured story beside a stacked index of the others. */
export default function Journal() {
  const f = tone(featured.tone);
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
        <div className="mt-14 grid grid-cols-1 gap-6 lg:h-[min(76vh,700px)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)] lg:gap-8">
          {/* Featured story: image with the headline laid over its colour */}
          <Reveal as="article" className="group relative overflow-hidden bg-ink">
            <div className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:h-full">
              <SmartImage
                src={featured.image}
                fallback={IMAGES.fallback}
                alt={featured.title}
                className="h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.04]"
              />
            </div>
            <div className={`absolute inset-0 bg-gradient-to-t to-transparent ${f.overlay}`} />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <p className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] ${f.accent}`}>
                <span className="font-serif text-2xl italic normal-case tracking-normal">01</span>
                {featured.category}
              </p>
              <h3 className="mt-4 max-w-lg font-serif text-[2.1rem] leading-[1.02] text-cream-light sm:text-5xl">
                {featured.title}
              </h3>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-cream-light/80">{featured.excerpt}</p>
              <span className={`mt-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em] ${f.accent}`}>
                Coming soon <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </div>
          </Reveal>

          {/* The rest, each on its own colour card */}
          <Stagger className="flex flex-col gap-6 lg:h-full lg:gap-8">
            {rest.map((post, i) => {
              const t = tone(post.tone);
              return (
                <StaggerItem key={post.title} className="lg:min-h-0 lg:flex-1">
                  <article
                    className={`group relative grid h-full grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] items-center gap-5 overflow-hidden p-4 transition-colors duration-500 sm:gap-8 sm:p-5 ${t.card}`}
                  >
                    <span className={`absolute inset-y-0 left-0 w-1 ${t.rule}`} />
                    <div className="aspect-[4/5] overflow-hidden bg-cream lg:aspect-auto lg:h-full">
                      <SmartImage
                        src={post.image}
                        fallback={IMAGES.fallback}
                        alt={post.title}
                        className="h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="pr-2">
                      <p className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] ${t.label}`}>
                        <span className="font-serif text-2xl italic normal-case tracking-normal">
                          {String(i + 2).padStart(2, "0")}
                        </span>
                        {post.category}
                      </p>
                      <h3 className="mt-3 font-serif text-[24px] leading-tight text-ink sm:text-[30px]">{post.title}</h3>
                      <p className="mt-3 hidden text-[15px] leading-relaxed text-ink-soft sm:block">{post.excerpt}</p>
                      <span className={`mt-5 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em] ${t.label}`}>
                        Coming soon
                        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
