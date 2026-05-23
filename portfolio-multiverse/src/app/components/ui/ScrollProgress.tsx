"use client";

import { useScrollProgress } from "@/app/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-border/30 overflow-hidden">
      <div
        className="h-full bg-primary transition-none origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
