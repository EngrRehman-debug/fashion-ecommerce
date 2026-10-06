import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "@/lib/i18n/config";

/**
 * Language routing. Every page URL is shared by both languages: the chosen
 * language lives in a cookie and the request is rewritten to /<locale>/<path>,
 * where app/[locale] serves the statically generated page.
 *
 * - First visit: the browser's Accept-Language picks Malay or English.
 * - /ms/… or /en/… in the address bar (a shareable language link) sets the
 *   cookie and redirects to the plain URL.
 */
const YEAR = 60 * 60 * 24 * 365;

function preferred(req: NextRequest): Locale {
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;
  const accept = req.headers.get("accept-language") ?? "";
  return /^\s*(ms|id)\b/i.test(accept) ? "ms" : DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const [, first, ...rest] = pathname.split("/");

  if (isLocale(first)) {
    // Generated assets (Open Graph images) are linked with their locale prefix.
    if (rest.some((s) => s.startsWith("opengraph-image"))) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = `/${rest.join("/")}`;
    const res = NextResponse.redirect(url);
    res.cookies.set(LOCALE_COOKIE, first, { path: "/", maxAge: YEAR, sameSite: "lax" });
    return res;
  }

  const locale = preferred(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  const res = NextResponse.rewrite(url);
  // Pages differ by cookie, so shared caches must not mix the two languages.
  res.headers.set("Vary", "Cookie, Accept-Language");
  return res;
}

export const config = {
  // Pages only — not Next internals, files with an extension, or the root
  // metadata routes (sitemap, robots, llms, icons).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
