"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";

const CURSOR_CONFIG: Record<
  ThemeId,
  { shape: "circle" | "square" | "crosshair" | "pixel"; color: string; size: number }
> = {
  default:   { shape: "circle",    color: "var(--color-primary)", size: 12 },
  retro2000: { shape: "square",    color: "#00FF41",              size: 10 },
  western:   { shape: "crosshair", color: "var(--color-primary)", size: 16 },
  cyberpunk: { shape: "square",    color: "#00FFE5",              size: 12 },
  arcade:    { shape: "pixel",     color: "var(--color-primary)", size: 10 },
};

export function CustomCursor() {
  const { theme } = useTheme();
  const config = CURSOR_CONFIG[theme];

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });
  const trailSpringX = useSpring(trailX, { stiffness: 80, damping: 18 });
  const trailSpringY = useSpring(trailY, { stiffness: 80, damping: 18 });

  const isHoveringRef = useRef(false);

  useEffect(() => {
    const html = document.documentElement;
    html.style.cursor = "none";

    function onMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      isHoveringRef.current = !!(
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      );
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      html.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [mouseX, mouseY, trailX, trailY]);

  const baseStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 9999,
    mixBlendMode: "difference",
  };

  if (config.shape === "crosshair") {
    return (
      <motion.div
        style={{ ...baseStyle, x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      >
        <svg width={config.size * 2} height={config.size * 2} viewBox={`0 0 ${config.size * 2} ${config.size * 2}`}>
          <line x1={config.size} y1={0} x2={config.size} y2={config.size * 2} stroke={config.color} strokeWidth={1.5} />
          <line x1={0} y1={config.size} x2={config.size * 2} y2={config.size} stroke={config.color} strokeWidth={1.5} />
          <circle cx={config.size} cy={config.size} r={3} fill="none" stroke={config.color} strokeWidth={1.5} />
        </svg>
      </motion.div>
    );
  }

  if (config.shape === "square" || config.shape === "pixel") {
    const isPixel = config.shape === "pixel";
    return (
      <>
        <motion.div
          style={{
            ...baseStyle,
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
            width: config.size,
            height: config.size,
            border: `2px solid ${config.color}`,
            imageRendering: isPixel ? "pixelated" : undefined,
          }}
        />
        {!isPixel && (
          <motion.div
            style={{
              ...baseStyle,
              x: trailSpringX,
              y: trailSpringY,
              translateX: "-50%",
              translateY: "-50%",
              width: config.size * 2.5,
              height: config.size * 2.5,
              border: `1px solid ${config.color}`,
              opacity: 0.35,
            }}
          />
        )}
      </>
    );
  }

  // Default: two circles
  return (
    <>
      <motion.div
        style={{
          ...baseStyle,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: config.size,
          height: config.size,
          borderRadius: "50%",
          backgroundColor: config.color,
        }}
      />
      <motion.div
        style={{
          ...baseStyle,
          x: trailSpringX,
          y: trailSpringY,
          translateX: "-50%",
          translateY: "-50%",
          width: config.size * 3,
          height: config.size * 3,
          borderRadius: "50%",
          border: `1.5px solid ${config.color}`,
          opacity: 0.4,
        }}
      />
    </>
  );
}
