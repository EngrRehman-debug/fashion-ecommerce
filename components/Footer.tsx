import Link from "next/link";
import { getT } from "@/lib/i18n/server";
import { BRAND_NAME, COMPANY_NO, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site";
import LanguageSwitch from "./LanguageSwitch";
import { ArrowRight, WhatsAppIcon } from "./icons";

type FooterLink = { label: string; href: string };

export default function Footer() {
  const t = getT();
  const { footer } = t.content;
  /** Shop links come from the categories, so new ranges appear automatically. */
  const shopColumn = {
    title: t.m.footer.shop,
    links: [
      ...t.categories.map((c) => ({ label: c.name, href: `/shop?category=${c.id}` })),
      { label: t.m.footer.allProducts, href: "/shop" },
    ],
  };

  return (
    <footer className="relative overflow-hidden bg-ink text-cream-light">
      {/* Oversized wordmark watermark */}
      <p
        aria-hidden
        className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-serif text-[26vw] leading-none text-cream-light/[0.04]"
      >
        CWSK
      </p>

      <div className="container-lux relative pb-10 pt-20 lg:pt-24">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)]">
          {/* Brand + contact */}
          <div className="max-w-md">
            {/* Light version of the logo (white lettering) for the dark footer. */}
            <Link href="/" aria-label={t.m.common.brandHome} className="inline-block transition-opacity hover:opacity-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-light.webp" alt="CWSK Enterprises" width={206} height={160} className="h-20 w-auto" />
            </Link>
            <p className="mt-7 font-serif text-2xl leading-snug text-cream-light/90 sm:text-[28px]">
              {footer.statement}
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-4 border border-cream-light/20 px-5 py-4 transition-colors hover:border-cream-light/60"
            >
              <WhatsAppIcon className="h-7 w-7 text-[#25D366]" />
              <span>
                <span className="block text-xs uppercase tracking-[0.2em] text-cream-light/60">{t.m.footer.ordersEnquiries}</span>
                <span className="text-[17px] font-medium">{WHATSAPP_DISPLAY}</span>
              </span>
              <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {[shopColumn, ...footer.columns].map((col) => (
              <FooterCol key={col.title} title={col.title} links={col.links} />
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-cream-light/15 pt-8 text-[13px] text-cream-light/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME} ({COMPANY_NO}). {t.m.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/privacy-policy" className="transition-colors hover:text-cream-light">{t.m.footer.privacy}</Link>
            <Link href="/terms" className="transition-colors hover:text-cream-light">{t.m.footer.terms}</Link>
            <LanguageSwitch dark />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="text-xs font-medium uppercase tracking-[0.24em] text-gold-light">{title}</h3>
      <ul className="mt-6 space-y-3.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-underline text-[15px] text-cream-light/80 transition-colors hover:text-cream-light">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
