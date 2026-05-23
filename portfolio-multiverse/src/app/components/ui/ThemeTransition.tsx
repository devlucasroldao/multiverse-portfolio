"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";

export function ThemeTransition() {
  const { isTransitioning } = useTheme();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="theme-transition-overlay"
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 40 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="w-24 h-24 rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
