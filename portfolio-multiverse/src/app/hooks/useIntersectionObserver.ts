"use client";

import { type RefObject, useState, useEffect } from "react";

export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  options?: IntersectionObserverInit
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    );
    observer.observe(el);
    return () => observer.disconnect();
    // options intentionally excluded — callers should memoize if they need reactivity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return isIntersecting;
}
