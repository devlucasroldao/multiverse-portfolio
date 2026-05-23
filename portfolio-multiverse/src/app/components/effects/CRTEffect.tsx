"use client";

import { useTheme } from "@/app/context/ThemeContext";

export function CRTEffect() {
  const { theme } = useTheme();

  if (theme !== "retro2000") return null;

  return (
    <>
      {/* Vignette */}
      <div
        className="fixed inset-0 z-[60] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Flicker overlay */}
      <div
        className="fixed inset-0 z-[61] pointer-events-none opacity-[0.02]"
        style={{ animation: "flicker 0.15s infinite" }}
      />
    </>
  );
}
