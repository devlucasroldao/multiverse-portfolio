"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";

// Fixed burst directions (every 45°)
const BURST = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  return { x: Math.cos(a) * 160, y: Math.sin(a) * 160 };
});

export function ThemeTransition() {
  const { isTransitioning, theme } = useTheme();

  // Arcade uses PixelTransition instead
  if (theme === "arcade") return null;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="theme-transition-overlay"
          className="fixed inset-0 z-9999 pointer-events-none flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {/* Main expanding circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 40 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="w-24 h-24 rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
          />

          {/* Burst particles from center */}
          {BURST.map((dir, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: i % 3 === 0 ? 10 : 6,
                height: i % 3 === 0 ? 10 : 6,
                backgroundColor: "var(--color-primary)",
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: dir.x, y: dir.y, opacity: 0, scale: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          ))}

          {/* Flash at peak */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.18, 0] }}
            transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
            style={{ backgroundColor: "white" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
