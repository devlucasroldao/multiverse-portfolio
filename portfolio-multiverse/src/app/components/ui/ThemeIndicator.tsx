"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";

export function ThemeIndicator() {
  const { themeConfig, visitedThemes } = useTheme();

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-1.5">
      <AnimatePresence mode="wait">
        <motion.div
          key={themeConfig.id}
          initial={{ opacity: 0, x: 16, y: -8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 16, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex items-center gap-2 bg-surface border border-border rounded-full px-3 py-1.5 shadow-theme-sm"
        >
          <span className="text-sm leading-none">{themeConfig.emoji}</span>
          <span className="text-xs text-text-muted font-mono leading-none">
            {themeConfig.name}
          </span>
        </motion.div>
      </AnimatePresence>

      <motion.span
        key={visitedThemes.size}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[10px] text-text-dim font-mono px-1"
      >
        {visitedThemes.size}/5 universos explorados
      </motion.span>
    </div>
  );
}
