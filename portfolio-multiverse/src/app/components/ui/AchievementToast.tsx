"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AchievementToastProps {
  message: string | null;
  onDismiss: () => void;
}

export function AchievementToast({ message, onDismiss }: AchievementToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message}
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 z-[200] flex items-center gap-3 bg-surface border border-primary rounded-theme px-4 py-3 shadow-theme-glow max-w-xs"
        >
          <span className="text-lg shrink-0">🏆</span>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-primary uppercase tracking-widest">
              Achievement Unlocked
            </span>
            <span className="text-sm font-display text-text leading-snug">
              {message}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
