"use client";

import { useState } from "react";

interface GlitchTextProps {
  text: string;
  active?: boolean;
  className?: string;
}

export function GlitchText({ text, active = false, className }: GlitchTextProps) {
  const [hovered, setHovered] = useState(false);
  const isGlitching = active || hovered;

  return (
    <span
      className={`relative inline-block ${className ?? ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={text}
    >
      {/* Main text */}
      <span aria-hidden={isGlitching}>{text}</span>

      {/* Glitch layers — use Tailwind-defined keyframes from tailwind.config */}
      {isGlitching && (
        <>
          <span
            aria-hidden
            className="absolute inset-0 animate-glitch-1"
            style={{ color: "var(--color-secondary)" }}
          >
            {text}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 animate-glitch-2"
            style={{ color: "var(--color-accent)" }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}
