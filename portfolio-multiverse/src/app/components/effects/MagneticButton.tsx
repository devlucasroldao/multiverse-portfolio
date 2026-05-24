"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticButton({
  children,
  strength = 20,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true);

  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.08 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.08 });

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouch) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rawX = ((e.clientX - cx) / (rect.width / 2)) * strength;
    const rawY = ((e.clientY - cy) / (rect.height / 2)) * strength;
    x.set(Math.max(-strength, Math.min(strength, rawX)));
    y.set(Math.max(-strength, Math.min(strength, rawY)));
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
