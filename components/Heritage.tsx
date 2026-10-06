import Link from "next/link";
import RotatingShot, { type Slide } from "./RotatingShot";
import Reveal from "./Reveal";
import ProcessSteps from "./ProcessSteps";
import { IMAGES } from "@/lib/images";
import { categorySlides } from "@/lib/catalog";
import { getT } from "@/lib/i18n/server";
import { ArrowRight } from "./icons";

const pawang = categorySlides("batik-pawang", 12);
const editorial = (src: string, alt: string): Slide => ({ src, alt, href: IMAGES.heritageHref, name: "Batik Pawang" });

export default function Heritage() {
  const t = getT();
  const h = t.m.home.heritage;
  const SHOTS_A = [editorial(IMAGES.heritageA, h.imageAltA), ...pawang.slice(4, 8)];
  const SHOTS_B = [editorial(IMAGES.heritageB, h.imageAltB), ...pawang.slice(8, 12)];
  const tag = t.m.common.shopName("{name}");
  return (
    <section id="heritage" className="relative overflow-hidden bg-ink py-20 text-cream-light lg:py-32">
      <div className="container-lux">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Offset image pair */}
          <Reveal className="relative grid grid-cols-2 gap-4 sm:gap-6">
            {/* Both photos cycle through Batik Pawang, out of step with each other. */}
            <div className="aspect-[3/4]">
              <RotatingShot slides={SHOTS_A} every={3200} offset={1600} tag={tag} />
            </div>
            <div className="mt-16 aspect-[3/4] sm:mt-24">
              <RotatingShot slides={SHOTS_B} every={3200} offset={3200} tag={tag} />
            </div>
            <p className="absolute -bottom-4 left-0 font-serif text-[5.5rem] italic leading-none text-gold-light/80 sm:text-[8rem]">
              01
            </p>
          </Reveal>

          <Reveal delay={0.15} className="max-w-xl">
            <p className="eyebrow text-gold-light">{h.eyebrow}</p>
            <h2 className="mt-6 font-serif text-[2.8rem] font-medium leading-[1] sm:text-display">
              {h.titleLine1}
              <br />
              <em className="text-gold-light">{h.titleLine2}</em>
            </h2>
            <p className="mt-8 text-[17px] leading-relaxed text-cream-light/75">{h.p1}</p>
            <p className="mt-5 text-[17px] leading-relaxed text-cream-light/75">{h.p2}</p>
            <Link href="/about" className="btn-ghost-light mt-10">
              <span>{h.readStory}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* Process steps */}
        <ProcessSteps className="mt-16 lg:mt-28" />
      </div>
    </section>
  );
}
