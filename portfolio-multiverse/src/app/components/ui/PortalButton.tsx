"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface OrbitalSpark {
  id: number;
  orbitDiameter: number;
  startAngle: number;
  speed: number;
  size: number;
  opacity: number;
}

interface PortalButtonProps {
  onClick: () => void;
  label?: string;
  autoClickAfter?: number;
}

const SIZE = 140;
const WRAPPER = SIZE + 100;

export function PortalButton({
  onClick,
  label = "Entrar no Portal",
  autoClickAfter = 0,
}: PortalButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [sparks, setSparks] = useState<OrbitalSpark[]>([]);
  const didPress = useRef(false);

  useEffect(() => {
    setSparks(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        orbitDiameter: SIZE + 18 + (i % 3) * 14,
        startAngle: (i / 8) * 360,
        speed: 5 + (i % 4) * 1.2,
        size: i % 3 === 0 ? 3 : 2,
        opacity: 0.4 + (i % 3) * 0.2,
      }))
    );
  }, []);

  const trigger = useCallback(() => {
    if (didPress.current) return;
    didPress.current = true;
    setPressed(true);
    setTimeout(onClick, 180);
  }, [onClick]);

  useEffect(() => {
    if (!autoClickAfter) return;
    const t = setTimeout(trigger, autoClickAfter);
    return () => clearTimeout(t);
  }, [autoClickAfter, trigger]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: WRAPPER, height: WRAPPER }}
    >
      {/* Outer pulsing halos */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: SIZE + 28 + i * 26,
            height: SIZE + 28 + i * 26,
            border: `1px solid rgba(139,92,246,${0.25 - i * 0.06})`,
          }}
          animate={{
            scale: [1, 1 + 0.035 * (3 - i), 1],
            opacity: [0.45 - i * 0.1, 0.1, 0.45 - i * 0.1],
          }}
          transition={{
            duration: 2.2 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Orbiting spark particles */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute pointer-events-none"
          style={{
            width: spark.orbitDiameter,
            height: spark.orbitDiameter,
            top: "50%",
            left: "50%",
            marginTop: -spark.orbitDiameter / 2,
            marginLeft: -spark.orbitDiameter / 2,
            borderRadius: "50%",
          }}
          animate={{ rotate: [spark.startAngle, spark.startAngle + 360] }}
          transition={{ duration: spark.speed, repeat: Infinity, ease: "linear" }}
        >
          <div
            style={{
              position: "absolute",
              width: spark.size,
              height: spark.size,
              borderRadius: "50%",
              background: `rgba(139,92,246,${hovered ? Math.min(spark.opacity + 0.3, 1) : spark.opacity})`,
              top: 0,
              left: "50%",
              transform: "translateX(-50%) translateY(-50%)",
              boxShadow: `0 0 ${spark.size * 3}px rgba(139,92,246,0.7)`,
              transition: "background 0.3s",
            }}
          />
        </motion.div>
      ))}

      {/* Rotating gradient ring */}
      <motion.div
        className="absolute rounded-full pointer-events-none overflow-hidden"
        style={{ width: SIZE + 4, height: SIZE + 4 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(139,92,246,0) 0deg, rgba(139,92,246,0.95) 80deg, rgba(236,72,153,0.7) 150deg, rgba(139,92,246,0) 240deg)",
          }}
        />
      </motion.div>

      {/* Ring inner mask */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: SIZE - 2, height: SIZE - 2, background: "rgb(3,3,8)" }}
      />

      {/* Glow layer */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: SIZE, height: SIZE }}
        animate={{
          boxShadow: hovered
            ? "0 0 55px rgba(139,92,246,0.75), 0 0 110px rgba(139,92,246,0.35), 0 0 180px rgba(139,92,246,0.12)"
            : "0 0 28px rgba(139,92,246,0.4), 0 0 60px rgba(139,92,246,0.15)",
        }}
        transition={{ duration: 0.35 }}
      />

      {/* Clickable button core */}
      <motion.button
        onClick={trigger}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="absolute rounded-full flex flex-col items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        style={{
          width: SIZE - 6,
          height: SIZE - 6,
          background:
            "radial-gradient(circle at 40% 30%, rgba(88,28,135,0.55) 0%, rgba(3,3,8,0.98) 65%)",
          border: "none",
          cursor: pressed ? "default" : "pointer",
        }}
        animate={{ scale: pressed ? 1.1 : hovered ? 1.05 : 1 }}
        transition={{ duration: 0.2 }}
        disabled={pressed}
        aria-label={label}
        whileTap={{ scale: pressed ? 1.1 : 0.96 }}
      >
        <motion.span
          className="text-xl leading-none select-none"
          style={{
            color: "rgba(196,181,253,0.95)",
            textShadow:
              "0 0 12px rgba(139,92,246,0.9), 0 0 28px rgba(139,92,246,0.5)",
          }}
          animate={{ scale: [1, 1.14, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.span>
        <span
          className="text-[9px] font-mono tracking-[0.22em] uppercase text-center leading-relaxed select-none"
          style={{ color: "rgba(167,139,250,0.88)" }}
        >
          Entrar
          <br />
          no Portal
        </span>
      </motion.button>
    </div>
  );
}
