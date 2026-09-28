import Link from "next/link";
import SmartImage from "./SmartImage";
import Reveal, { Stagger, StaggerItem } from "./Reveal";
import { IMAGES } from "@/lib/images";
import heritage from "@/data/heritage.json";
import { ArrowRight } from "./icons";

const { steps } = heritage;

export default function Heritage() {
  return (
    <section id="heritage" className="relative overflow-hidden bg-ink py-20 text-cream-light lg:py-32">
      <div className="container-lux">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Offset image pair */}
          <Reveal className="relative grid grid-cols-2 gap-4 sm:gap-6">
            <div className="aspect-[3/4] overflow-hidden">
              <SmartImage
                src={IMAGES.heritageA}
                fallback={IMAGES.fallback}
                alt="Close-up of a hand-dyed batik shirt"
                className="h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-lux hover:scale-105"
              />
            </div>
            <div className="mt-16 aspect-[3/4] overflow-hidden sm:mt-24">
              <SmartImage
                src={IMAGES.heritageB}
                fallback={IMAGES.fallback}
                alt="Batik shirt worn"
                className="h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-lux hover:scale-105"
              />
            </div>
            <p className="absolute -bottom-4 left-0 font-serif text-[5.5rem] italic leading-none text-gold-light/80 sm:text-[8rem]">
              01
            </p>
          </Reveal>

          <Reveal delay={0.15} className="max-w-xl">
            <p className="eyebrow text-gold-light">The Craft</p>
            <h2 className="mt-6 font-serif text-[2.8rem] font-medium leading-[1] sm:text-display">
              Batik is not printed.
              <br />
              <em className="text-gold-light">It is made by hand.</em>
            </h2>
            <p className="mt-8 text-[17px] leading-relaxed text-cream-light/75">
              Batik is a centuries-old wax-resist dyeing tradition, kept alive today by artisans
              across Malaysia. There are no machines in this process — only wax, dye, cloth, and
              the patience of an artisan.
            </p>
            <p className="mt-5 text-[17px] leading-relaxed text-cream-light/75">
              A single piece can take days to complete. That is the point. Each one carries the
              small irregularities of a human hand, which is precisely what makes it yours alone.
            </p>
            <Link href="/about" className="btn-ghost-light mt-10">
              <span>Read our story</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* Process steps */}
        <Stagger className="mt-20 grid gap-px bg-cream-light/15 md:grid-cols-3 lg:mt-28">
          {steps.map((step) => (
            <StaggerItem key={step.n} className="group bg-ink p-8 transition-colors duration-500 hover:bg-[#1c1f25] lg:p-10">
              <p className="font-serif text-5xl italic text-gold-light transition-transform duration-500 group-hover:-translate-y-1">
                {step.n}
              </p>
              <h3 className="mt-6 font-serif text-3xl text-cream-light">{step.title}</h3>
              <p className="mt-4 text-[16px] leading-relaxed text-cream-light/70">{step.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
