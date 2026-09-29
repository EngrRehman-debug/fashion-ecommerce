import { IMAGES } from "@/lib/images";
import { whatsappLink } from "@/lib/site";
import Reveal from "./Reveal";
import { ArrowRight, WhatsAppIcon } from "./icons";

const JOIN_TEXT = "Hi CWSK Enterprises! Please add me to your new-arrivals list.";

/**
 * "The List" — new-drop alerts, joined over WhatsApp.
 * The photo sits on the same indigo as the panel and is faded in with a CSS
 * mask (not a colour overlay), so there is no visible edge between the two.
 */
export default function Newsletter() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-lux">
        {/* Narrower than the page so the photo column shows more of the model. */}
        <Reveal className="relative isolate mx-auto max-w-6xl overflow-hidden bg-primary-dark text-cream-light lg:min-h-[520px]">
          {/* Photo, masked into the panel: on top (fading down) on mobile, on the right
              (fading left) on desktop. Anchored to the top so the face is never cut. */}
          <div aria-hidden className="relative -z-10 aspect-[4/3] sm:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[52%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGES.newsletter}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover object-top [mask-image:linear-gradient(to_bottom,#000_45%,rgba(0,0,0,0.35)_75%,transparent_100%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.4)_18%,#000_45%)]"
            />
          </div>
          {/* Soft light in the corner so the panel feels lit, not flat */}
          <span aria-hidden className="absolute -left-40 -top-40 -z-10 h-96 w-96 rounded-full bg-primary-light/25 blur-3xl" />

          <div className="relative -mt-10 max-w-xl px-6 pb-14 sm:-mt-16 sm:px-12 lg:mt-0 lg:max-w-[52%] lg:px-14 lg:py-20">
            <p className="eyebrow text-gold-light">The List</p>
            <h2 className="mt-6 font-serif text-[2.6rem] font-medium leading-[1] sm:text-display">
              First access to new prints, <em className="text-gold-light">before they’re gone</em>
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-cream-light/75">
              Each design is one of one. Join the list on WhatsApp to see new arrivals first — no
              noise, just the next piece.
            </p>
            <a href={whatsappLink(JOIN_TEXT)} target="_blank" rel="noopener noreferrer" className="btn-light mt-10">
              <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
              <span>Join on WhatsApp</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
