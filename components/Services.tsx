import { NeedleIcon, QrIcon, ReturnIcon, ShieldIcon, TruckIcon } from "./icons";
import { Stagger, StaggerItem } from "./Reveal";
import data from "@/data/services.json";

/** Maps the `icon` name in data/services.json to its component. */
const ICONS = {
  truck: TruckIcon,
  return: ReturnIcon,
  shield: ShieldIcon,
  qr: QrIcon,
  needle: NeedleIcon,
} as const;

const services = data.services as {
  icon: keyof typeof ICONS;
  title: string;
  text: string;
}[];

export default function Services({ className = "bg-cream-light" }: { className?: string }) {
  return (
    <section className={`border-y border-line py-14 lg:py-20 ${className}`}>
      <div className="container-lux">
        <Stagger className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line">
          {services.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <StaggerItem key={service.title} className="group lg:px-10 lg:first:pl-0 lg:last:pr-0">
                <Icon className="h-8 w-8 text-primary transition-transform duration-500 group-hover:-translate-y-1 sm:h-10 sm:w-10" />
                <h3 className="mt-4 font-serif text-xl leading-tight text-ink sm:mt-5 sm:text-2xl">{service.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-soft sm:text-[15px]">{service.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
