"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";

interface TooltipProps {
  content: string;
  children: ReactNode;
}

const TOOLTIP_CLASS: Record<ThemeId, string> = {
  default:
    "bg-text text-background rounded-full px-3 py-1.5 text-xs font-mono shadow-theme-sm",
  retro2000:
    "bg-primary text-background border-2 border-text px-3 py-1 text-xs font-mono",
  western:
    "bg-surface border border-primary text-text rounded-sm px-3 py-1.5 text-xs font-mono",
  cyberpunk:
    "bg-background border border-primary text-primary px-3 py-1 text-xs font-mono shadow-theme-glow",
  arcade:
    "bg-primary text-background border-2 border-text px-3 py-1 text-xs font-mono",
  oldfilm:
    "bg-surface border border-primary text-text px-3 py-1.5 text-xs font-mono",
  sketch:
    "bg-surface border-2 border-primary text-text px-3 py-1.5 text-xs font-mono",
  rpg:
    "bg-surface border border-primary text-primary px-3 py-1.5 text-xs font-mono shadow-theme-glow",
};

export function Tooltip({ content, children }: TooltipProps) {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}

      <AnimatePresence>
        {show && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, scale: 0.82, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.82, y: 6 }}
            transition={{ duration: 0.14 }}
            className={[
              "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap z-200 pointer-events-none",
              TOOLTIP_CLASS[theme],
            ].join(" ")}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
