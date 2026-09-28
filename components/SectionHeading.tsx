import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** Eyebrow + serif title (+ optional intro and right-hand action). */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  center = false,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <Reveal
      className={`flex flex-col gap-6 ${
        center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={center ? "max-w-2xl" : "max-w-3xl"}>
        <p className={`eyebrow ${light ? "text-gold-light" : ""}`}>{eyebrow}</p>
        <h2
          className={`mt-5 font-serif text-[2.6rem] font-medium leading-[1] sm:text-display ${
            light ? "text-cream-light" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {intro && (
          <p className={`mt-5 max-w-xl text-[16px] leading-relaxed sm:text-[17px] ${light ? "text-cream-light/70" : "text-ink-soft"} ${center ? "mx-auto" : ""}`}>
            {intro}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
