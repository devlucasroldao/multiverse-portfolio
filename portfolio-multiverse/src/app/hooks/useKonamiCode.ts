"use client";

import { useEffect, useRef } from "react";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function useKonamiCode(callback: () => void): void {
  const idxRef = useRef(0);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === SEQUENCE[idxRef.current]) {
        idxRef.current++;
        if (idxRef.current === SEQUENCE.length) {
          callbackRef.current();
          idxRef.current = 0;
        }
      } else {
        idxRef.current = e.key === SEQUENCE[0] ? 1 : 0;
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
