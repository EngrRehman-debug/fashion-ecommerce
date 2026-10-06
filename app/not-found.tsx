/**
 * Last-resort 404 for requests that never reach a language (normally every page
 * goes through middleware.ts and gets app/[locale]/not-found.tsx instead). The
 * root layout is a pass-through, so this renders its own document.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-cream-light p-6 text-center font-sans text-ink">
        <div>
          <p className="eyebrow justify-center">404</p>
          <h1 className="mt-4 font-serif text-4xl">Page not found · Halaman tidak dijumpai</h1>
          <a href="/" className="btn-primary mt-8">
            <span>Home · Utama</span>
          </a>
        </div>
      </body>
    </html>
  );
}
