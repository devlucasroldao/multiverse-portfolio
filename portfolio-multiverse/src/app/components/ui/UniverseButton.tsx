"use client";

import { motion } from "framer-motion";
import { useTheme, THEMES, type ThemeId } from "@/app/context/ThemeContext";

const BUTTON_TEXT: Record<ThemeId, string> = {
  default:   "Mudar de Universo",
  retro2000: "TROCAR DIMENSÃO >>",
  western:   "Mudar de Território",
  cyberpunk: "SWITCH_UNIVERSE.exe",
  arcade:    "NEXT WORLD",
};

const THEME_CLASSES: Record<ThemeId, string> = {
  default:
    "rounded-full bg-primary text-background px-10 py-5 text-lg font-semibold shadow-theme-glow hover:shadow-theme-lg",
  retro2000:
    "rounded-none border-2 border-primary bg-surface text-primary px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-primary hover:text-background",
  western:
    "rounded-sm border border-primary/50 bg-surface text-primary px-10 py-5 font-accent tracking-wider hover:bg-primary/10 shadow-theme-md",
  cyberpunk:
    "rounded-sm border border-primary bg-transparent text-primary px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-primary/10 shadow-theme-glow",
  arcade:
    "rounded-none border-4 border-primary bg-background text-primary px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-background",
};

export function UniverseButton() {
  const { theme, switchTheme, isTransitioning } = useTheme();

  const currentIndex = THEMES.findIndex((t) => t.id === theme);
  const nextTheme = THEMES[(currentIndex + 1) % THEMES.length];

  return (
    <motion.button
      onClick={() => switchTheme()}
      disabled={isTransitioning}
      animate={{ scale: [1, 1.025, 1] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className={[
        "relative overflow-hidden cursor-pointer transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        THEME_CLASSES[theme],
      ].join(" ")}
    >
      <span className="relative flex items-center gap-3">
        <motion.span
          key={nextTheme.emoji}
          initial={{ rotate: -15, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          className="text-2xl"
        >
          {nextTheme.emoji}
        </motion.span>
        <span>{BUTTON_TEXT[theme]}</span>
      </span>
    </motion.button>
  );
}
