import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── CORES DINÂMICAS (lidas das CSS vars por tema) ──────────────────
      colors: {
        background: "var(--color-bg)",
        surface:    "var(--color-surface)",
        "surface-2":"var(--color-surface-2)",
        border:     "var(--color-border)",
        primary:    "var(--color-primary)",
        "primary-glow": "var(--color-primary-glow)",
        secondary:  "var(--color-secondary)",
        accent:     "var(--color-accent)",
        text:       "var(--color-text)",
        "text-muted":"var(--color-text-muted)",
        "text-dim": "var(--color-text-dim)",
        overlay:    "var(--color-overlay)",
      },

      // ── TIPOGRAFIA DINÂMICA ────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body:    ["var(--font-body)", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
        accent:  ["var(--font-accent)", "serif"],
      },

      // ── SOMBRAS DINÂMICAS ──────────────────────────────────────────────
      boxShadow: {
        "theme-sm":  "var(--shadow-sm)",
        "theme-md":  "var(--shadow-md)",
        "theme-lg":  "var(--shadow-lg)",
        "theme-glow":"var(--shadow-glow)",
      },

      // ── BORDAS ─────────────────────────────────────────────────────────
      borderRadius: {
        theme: "var(--radius)",
      },

      // ── ANIMAÇÕES ──────────────────────────────────────────────────────
      keyframes: {
        "glitch-1": {
          "0%, 100%": { clipPath: "inset(0 0 98% 0)", transform: "translateX(-4px)" },
          "50%":      { clipPath: "inset(0 0 70% 0)", transform: "translateX(4px)" },
        },
        "glitch-2": {
          "0%, 100%": { clipPath: "inset(70% 0 0 0)", transform: "translateX(4px)" },
          "50%":      { clipPath: "inset(20% 0 60% 0)", transform: "translateX(-4px)" },
        },
        "scanline": {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "flicker": {
          "0%, 95%, 100%": { opacity: "1" },
          "96%":            { opacity: "0.6" },
          "97%":            { opacity: "0.9" },
          "98%":            { opacity: "0.4" },
        },
        "dust": {
          "0%":    { transform: "translateY(0) translateX(0)", opacity: "0" },
          "10%":   { opacity: "1" },
          "90%":   { opacity: "0.8" },
          "100%":  { transform: "translateY(-80px) translateX(30px)", opacity: "0" },
        },
        "typewriter": {
          "from": { width: "0" },
          "to":   { width: "100%" },
        },
        "blink-caret": {
          "from, to": { borderColor: "transparent" },
          "50%":       { borderColor: "var(--color-primary)" },
        },
        "pixel-pop": {
          "0%":   { transform: "scale(1)" },
          "40%":  { transform: "scale(1.08) rotate(-1deg)" },
          "70%":  { transform: "scale(0.97) rotate(1deg)" },
          "100%": { transform: "scale(1)" },
        },
        "universe-expand": {
          "0%":   { transform: "scale(0)", opacity: "0" },
          "50%":  { transform: "scale(1.05)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "film-jitter": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%":      { transform: "translate(-1px, 1px)" },
          "50%":      { transform: "translate(1px, -1px)" },
          "75%":      { transform: "translate(-1px, -1px)" },
        },
      },
      animation: {
        "glitch-1":        "glitch-1 0.15s steps(1) infinite",
        "glitch-2":        "glitch-2 0.15s steps(1) infinite",
        "scanline":        "scanline 4s linear infinite",
        "flicker":         "flicker 8s linear infinite",
        "dust":            "dust 3s ease-in infinite",
        "typewriter":      "typewriter 2.5s steps(40) forwards, blink-caret 0.75s step-end infinite",
        "pixel-pop":       "pixel-pop 0.3s ease-out",
        "universe-expand": "universe-expand 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "film-jitter":     "film-jitter 0.1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;