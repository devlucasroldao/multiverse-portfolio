"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";

export function ThemeSelector() {
  const { theme, allThemes, visitedThemes, switchTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (!panelRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <>
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 z-[80] w-72 bg-surface border-r border-border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 pt-8 pb-4 border-b border-border">
              <h2 className="font-display font-bold text-text text-lg">Universos</h2>
              <p className="text-text-muted text-xs font-mono mt-1">
                Escolha seu universo paralelo
              </p>
            </div>

            {/* Theme cards */}
            <div className="flex flex-col gap-2 p-4 overflow-y-auto flex-1">
              {allThemes.map((t, i) => {
                const isActive = theme === t.id;
                const visited = visitedThemes.has(t.id);
                return (
                  <motion.button
                    key={t.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => {
                      switchTheme(t.id);
                      setOpen(false);
                    }}
                    className={[
                      "relative w-full text-left rounded-theme p-4 flex items-start gap-3 transition-all duration-200 cursor-pointer",
                      isActive
                        ? "bg-background border-2 border-primary shadow-theme-sm"
                        : "bg-background border border-border hover:border-primary/60",
                    ].join(" ")}
                  >
                    <span className="text-2xl shrink-0 leading-none pt-0.5">
                      {t.emoji}
                    </span>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span className="font-display font-semibold text-text text-sm">
                        {t.name}
                      </span>
                      <span className="text-text-muted text-xs leading-snug">
                        {t.description}
                      </span>
                    </div>
                    {visited && !isActive && (
                      <span className="text-primary text-xs font-mono shrink-0 self-center opacity-60">
                        ✓
                      </span>
                    )}
                    {isActive && (
                      <span className="text-primary text-xs font-mono shrink-0 self-center">
                        ●
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border">
              <p className="text-[10px] font-mono text-text-dim text-center">
                {visitedThemes.size}/5 universos explorados
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab trigger */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        animate={{ x: open ? 288 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        aria-label="Selecionar tema"
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[81] bg-surface border border-l-0 border-border px-1.5 py-5 rounded-r-lg text-text-muted hover:text-primary hover:border-primary transition-colors duration-200 flex items-center cursor-pointer"
      >
        <span className="text-xs font-mono [writing-mode:vertical-rl] select-none rotate-180 tracking-widest">
          UNIVERSOS
        </span>
      </motion.button>
    </>
  );
}
