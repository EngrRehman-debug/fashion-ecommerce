/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a second dev server run beside `npm run dev` without sharing .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // The three policy pages were merged into /policies; keep old links working.
  async redirects() {
    return [
      { source: "/terms", destination: "/policies#ordering", permanent: true },
      { source: "/shipping-returns", destination: "/policies#delivery", permanent: true },
      { source: "/privacy-policy", destination: "/policies#privacy", permanent: true },
    ];
  },
};

export default nextConfig;
