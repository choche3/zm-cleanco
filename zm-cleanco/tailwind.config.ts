import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A84C",
          light:   "#E2C06B",
          dark:    "#A8862E",
          pale:    "#FBF5E6",
          muted:   "#F0E4C0",
        },
        brand: {
          dark:   "#1A1A1A",
          mid:    "#4A4A4A",
          soft:   "#888888",
          border: "#E8E8E8",
          bg:     "#FAFAFA",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans:  ["'Inter'", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeIn:    { from: { opacity: "0" },                                         to: { opacity: "1" } },
        slideUp:   { from: { opacity: "0", transform: "translateY(12px)" },          to: { opacity: "1", transform: "translateY(0)" } },
        modalIn:   { from: { opacity: "0", transform: "scale(0.97) translateY(8px)"},to: { opacity: "1", transform: "scale(1) translateY(0)" } },
        pulseRing: { "0%,100%": { opacity:"1", boxShadow:"0 0 0 0 rgba(201,168,76,0.4)" }, "50%": { opacity:"0.7", boxShadow:"0 0 0 6px rgba(201,168,76,0)" } },
      },
      animation: {
        "fade-in":   "fadeIn 0.25s ease-out",
        "slide-up":  "slideUp 0.3s ease-out",
        "modal-in":  "modalIn 0.22s ease-out",
        "pulse-ring":"pulseRing 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
