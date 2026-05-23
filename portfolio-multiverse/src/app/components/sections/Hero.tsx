"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";
import { UniverseButton } from "@/app/components/ui/UniverseButton";

const TAGLINES: Record<ThemeId, string> = {
  default:   "Desenvolvedor · Designer · Growth Marketer",
  retro2000: ">> DESENVOLVEDOR_FULL_STACK.exe <<<",
  western:   "O pistoleiro do código. Rápido. Preciso. Criativo.",
  cyberpunk: "DEV://DESIGNER//GROWTH_HACKER",
  arcade:    "PLAYER 1 — FULL STACK DEV",
};

const NAME = "Seu Nome";

// ── Particles (client-only to avoid hydration mismatch) ───────────────────
interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 5,
        size: Math.random() > 0.7 ? 2 : 1,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: "var(--color-primary)",
          }}
          animate={{ y: [0, -60, 0], opacity: [0, 0.55, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// ── Stagger container ─────────────────────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ── Hero ──────────────────────────────────────────────────────────────────
export function Hero() {
  const { theme } = useTheme();
  const tagline = TAGLINES[theme];

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden px-6">
      {theme === "default" && <ParticleField />}

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center text-center gap-6 max-w-3xl w-full"
      >
        {/* Status badge */}
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-sm text-text-muted">Disponível para projetos</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-5xl sm:text-7xl font-display font-bold text-text leading-tight tracking-tight"
        >
          {NAME}
        </motion.h1>

        {/* Tagline — animates on theme change */}
        <motion.div variants={item}>
          <AnimatePresence mode="wait">
            <motion.p
              key={tagline}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-lg sm:text-xl text-primary font-mono"
            >
              {tagline}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-text-muted max-w-md text-base leading-relaxed"
        >
          Construo produtos digitais com foco em experiência, performance e
          crescimento. Do design ao deploy.
        </motion.p>

        {/* Universe Button */}
        <motion.div variants={item} className="mt-2">
          <UniverseButton />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-text-dim"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] tracking-widest uppercase font-mono">scroll</span>
        <ChevronDown size={14} />
      </motion.div>
    </section>
  );
}
