"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useScrollProgress } from "@/app/hooks/useScrollProgress";

export function ProgressBar() {
  const progress = useScrollProgress();
  const visible = progress > 0.04;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden
          className="fixed top-0 left-0 right-0 h-[3px] z-[9997] pointer-events-none overflow-hidden"
        >
          <div
            className="h-full w-full origin-left"
            style={{
              transform: `scaleX(${progress})`,
              background:
                "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
