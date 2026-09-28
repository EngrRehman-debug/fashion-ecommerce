/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a second dev server run beside `npm run dev` without sharing .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
