"use client";

import { useState, useEffect, useRef } from "react";

export function useMousePosition(): { x: number; y: number } {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const pending = useRef<{ x: number; y: number } | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      pending.current = { x: e.clientX, y: e.clientY };
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          if (pending.current) setPosition(pending.current);
          rafId.current = 0;
        });
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return position;
}
