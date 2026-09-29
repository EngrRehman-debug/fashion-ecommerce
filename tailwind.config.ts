import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    // Some class names (e.g. testimonial avatar gradients) live in the JSON data.
    "./data/**/*.json",
  ],
  theme: {
    extend: {
      colors: {
        // Indigo from the logo — the batik dye accent, used sparingly.
        primary: {
          DEFAULT: "#1B5BB0",
          light: "#4B84CF",
          dark: "#143F7A",
          wash: "#E9EFF8",
        },
        // Warm ivory neutrals — the "undyed cloth" of the palette.
        cream: {
          DEFAULT: "#F3EEE6",
          light: "#FAF7F2",
          dark: "#E7DFD2",
        },
        sand: "#CDBFA9",
        // Brass hairlines and small highlights.
        gold: {
          DEFAULT: "#A8834A",
          light: "#C9A970",
        },
        // Deep ink for type and solid buttons.
        ink: {
          DEFAULT: "#15171B",
          soft: "#3B3E45",
        },
        muted: "#6F6A62",
        line: "#E2DACD",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        // Display sizes for the serif headlines.
        "display-sm": ["2.5rem", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        display: ["3.5rem", { lineHeight: "1", letterSpacing: "-0.015em" }],
        "display-lg": ["5rem", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-xl": ["7rem", { lineHeight: "0.9", letterSpacing: "-0.025em" }],
      },
      maxWidth: {
        container: "1680px",
      },
      boxShadow: {
        card: "0 24px 60px -30px rgba(21,23,27,0.35)",
        soft: "0 10px 30px -18px rgba(21,23,27,0.3)",
        drawer: "-30px 0 60px -30px rgba(21,23,27,0.35)",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        unveil: {
          from: { opacity: "0", clipPath: "inset(12% 12% 12% 12%)" },
          to: { opacity: "1", clipPath: "inset(0% 0% 0% 0%)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        progress: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "fade-in": "fade-in 0.4s ease-out both",
        // Entrance animations that run from the server HTML, before JavaScript loads.
        rise: "rise 1s cubic-bezier(0.22, 1, 0.36, 1) both",
        unveil: "unveil 1.4s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-in-left": "slide-in-left 1.2s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
