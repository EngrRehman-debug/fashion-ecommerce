import heritage from "@/data/heritage.json";
import { Stagger, StaggerItem } from "./Reveal";

/**
 * The three making steps, on a dark background.
 * Phones: three compact tiles in one row (number + title only).
 * Tablet up: full cards with the description.
 */
export default function ProcessSteps({ className = "" }: { className?: string }) {
  return (
    <Stagger className={`grid grid-cols-3 gap-px bg-cream-light/15 ${className}`}>
      {heritage.steps.map((step) => (
        <StaggerItem
          key={step.n}
          className="group bg-ink px-3 py-5 transition-colors duration-500 hover:bg-[#1c1f25] sm:p-7 lg:p-10"
        >
          <p className="font-serif text-3xl italic text-gold-light transition-transform duration-500 group-hover:-translate-y-1 sm:text-4xl lg:text-5xl">
            {step.n}
          </p>
          <h3 className="mt-3 font-serif text-[17px] leading-tight text-cream-light sm:mt-5 sm:text-2xl lg:text-3xl">
            {step.title}
          </h3>
          <p className="mt-3 hidden text-[15px] leading-relaxed text-cream-light/70 md:block lg:mt-4 lg:text-[16px]">
            {step.body}
          </p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
