"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/app/context/ThemeContext";

const PIXEL = 20;
const FILL_MS = 340;
const CLEAR_DELAY = 290;
const CLEAR_MS = 340;

function shuffle(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function PixelTransition() {
  const { theme, isTransitioning } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isTransitioning || theme !== "arcade") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const cols = Math.ceil(W / PIXEL);
    const rows = Math.ceil(H / PIXEL);
    const total = cols * rows;
    const fillOrder = shuffle(total);
    const clearOrder = shuffle(total);

    const color =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary")
        .trim() || "#FFE000";

    let fillDone = 0;
    let clearDone = 0;
    let fillRaf = 0;
    let clearRaf = 0;
    let clearTimer: ReturnType<typeof setTimeout>;

    function drawPixel(idx: number, fill: boolean) {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      if (fill) {
        ctx!.fillStyle = color;
        ctx!.fillRect(col * PIXEL, row * PIXEL, PIXEL, PIXEL);
      } else {
        ctx!.clearRect(col * PIXEL, row * PIXEL, PIXEL, PIXEL);
      }
    }

    function fillTick(start: number, now: number) {
      const progress = Math.min((now - start) / FILL_MS, 1);
      const target = Math.floor(progress * total);
      while (fillDone < target) drawPixel(fillOrder[fillDone++], true);
      if (progress < 1)
        fillRaf = requestAnimationFrame((t) => fillTick(start, t));
    }

    function clearTick(start: number, now: number) {
      const progress = Math.min((now - start) / CLEAR_MS, 1);
      const target = Math.floor(progress * total);
      while (clearDone < target) drawPixel(clearOrder[clearDone++], false);
      if (progress < 1)
        clearRaf = requestAnimationFrame((t) => clearTick(start, t));
    }

    fillRaf = requestAnimationFrame((t) => fillTick(t, t));
    clearTimer = setTimeout(
      () => requestAnimationFrame((t) => clearTick(t, t)),
      CLEAR_DELAY
    );

    return () => {
      cancelAnimationFrame(fillRaf);
      cancelAnimationFrame(clearRaf);
      clearTimeout(clearTimer);
      ctx.clearRect(0, 0, W, H);
    };
  }, [isTransitioning, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9998] pointer-events-none"
      aria-hidden
    />
  );
}
