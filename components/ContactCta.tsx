import Link from "next/link";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site";
import Reveal from "./Reveal";
import { WhatsAppIcon } from "./icons";

/** Closing band for content pages: talk to us on WhatsApp. */
export default function ContactCta({ title = "Still have a question?" }: { title?: string }) {
  return (
    <section className="bg-cream-light pb-20 lg:pb-28">
      <div className="container-lux">
        <Reveal className="flex flex-col items-start justify-between gap-8 bg-ink px-5 py-12 text-cream-light sm:px-12 lg:flex-row lg:items-center lg:px-16">
          <div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">{title}</h2>
            <p className="mt-3 max-w-xl text-[16px] text-cream-light/70">
              Message us on WhatsApp at {WHATSAPP_DISPLAY} — we usually reply the same day.
            </p>
          </div>
          {/* One row on every screen; shorter labels on phones. */}
          <div className="grid w-full grid-cols-2 gap-2.5 sm:flex sm:w-auto sm:gap-3">
            <a href={whatsappLink("Hi CWSK Enterprises! I have a question.")} target="_blank" rel="noopener noreferrer" className="btn-light whitespace-nowrap px-3 text-[12px] tracking-[0.12em] sm:px-8 sm:text-[13px] sm:tracking-[0.18em]">
              <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
              <span className="sm:hidden">WhatsApp</span>
              <span className="hidden sm:inline">Chat on WhatsApp</span>
            </a>
            <Link href="/contact" className="btn-ghost-light whitespace-nowrap px-3 text-[12px] tracking-[0.12em] sm:px-8 sm:text-[13px] sm:tracking-[0.18em]">
              <span className="sm:hidden">Contact</span>
              <span className="hidden sm:inline">Contact page</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
