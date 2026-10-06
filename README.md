# LUX — Fashion E-commerce Landing Page 

A pixel-faithful replication of the LUX fashion landing page, built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

This is **phase one — an exact static replication** of the reference design. Animations and interactivity are planned for phase two.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
```

## Structure

```
app/
  layout.tsx        # fonts (Poppins + Playfair Display), metadata
  page.tsx          # assembles all sections in order
  globals.css       # Tailwind + shared button/container classes
components/
  Navbar.tsx
  Hero.tsx
  Products.tsx
  LatestCollections.tsx
  SupportedBy.tsx
  Testimonials.tsx
  OutfitInspiration.tsx
  Services.tsx
  Newsletter.tsx
  Footer.tsx
  icons.tsx         # inline SVG icons
public/images/      # self-contained SVG placeholder imagery
tailwind.config.ts  # brand colors, fonts, container width
```

## Rebranding for another brand

Everything needed to reskin this for a different brand lives in a few places:

- **Colors** — edit the `primary`, `cream`, and `ink` palettes in `tailwind.config.ts`.
- **Logo / name** — search for `LUX` across `components/` (Navbar and Footer).
- **Fonts** — swap the `Poppins` / `Playfair_Display` imports in `app/layout.tsx`.
- **Imagery** — replace the files in `public/images/` with the brand's real product photography (keep the same filenames, or update the `src` references in the components).
- **Copy** — product names, prices, testimonials, and section text live as arrays at the top of each component.

## Notes

Product photos are currently lightweight local SVG placeholders so the site is fully self-contained and renders without any external network dependency. Swap them for the brand's real photography when available.
