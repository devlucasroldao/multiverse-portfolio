"use client";

import { useTheme } from "@/app/context/ThemeContext";

export function ScanLines() {
  const { theme } = useTheme();

  if (theme !== "cyberpunk") return null;

  return (
    <>
      {/* Static scan lines */}
      <div
        className="fixed inset-0 z-[60] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }}
      />
      {/* Moving scan line */}
      <div
        className="fixed inset-x-0 z-[61] pointer-events-none h-[3px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,255,200,0.08), transparent)",
          animation: "scanline 8s linear infinite",
        }}
      />
    </>
  );
}
