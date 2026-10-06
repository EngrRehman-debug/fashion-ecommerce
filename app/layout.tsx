import "./globals.css";

/**
 * Pass-through root layout. The real document (<html lang>, navbar, footer)
 * is in app/[locale]/layout.tsx, so it can be rendered in each language.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
