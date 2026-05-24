"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTheme, THEMES, type ThemeId } from "@/app/context/ThemeContext";
import { UniverseButton } from "@/app/components/ui/UniverseButton";
import { MagneticButton } from "@/app/components/effects/MagneticButton";
import { TextReveal } from "@/app/components/effects/TextReveal";
import { GlitchText } from "@/app/components/effects/GlitchText";
import { Tooltip } from "@/app/components/ui/Tooltip";

const TAGLINES: Record<ThemeId, string> = {
  default:   "Cada projeto é um universo. Cada solução, uma obra.",
  retro2000: ">> LUCAS_ROLDAO.exe CARREGANDO... CRIATIVIDADE: 100% <<",
  western:   "Um jovem do sul com código na mão e ideia na cabeça.",
  cyberpunk: "DEV://CRIATIVO//SEM_LIMITES//ARROIO_DO_SAL_RS",
  arcade:    "PLAYER 1 — LUCAS ROLDÃO — LIVES: ∞",
  oldfilm:   "Um jovem, uma câmera, um editor de código.",
  sketch:    "Rabiscando o futuro, uma linha de código por vez.",
  rpg:       "Nível 1 · Classe: Desenvolvedor Criativo · XP: Infinito",
};

const NAME = "Lucas Roldão";

// ── Background particles ──────────────────────────────────────────────────
interface Particle {
  id: number; x: number; y: number;
  delay: number; duration: number; size: number;
}

function HeroParticles() {
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
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
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}

// ── Stagger variants ──────────────────────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

// ── Hero ──────────────────────────────────────────────────────────────────
export function Hero() {
  const { theme, switchTheme } = useTheme();
  const tagline = TAGLINES[theme];

  // Parallax
  const { scrollY } = useScroll();
  const contentY   = useTransform(scrollY, [0, 600], [0, -60]);
  const contentOpa = useTransform(scrollY, [0, 350], [1, 0]);
  const bgY        = useTransform(scrollY, [0, 600], [0, 120]);

  const isGlitch = theme === "cyberpunk" || theme === "retro2000";

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden px-6"
    >
      {/* Parallax background layer */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        {(theme === "default" || theme === "oldfilm" || theme === "rpg") && <HeroParticles />}
      </motion.div>

      {/* Main content — parallax foreground */}
      <motion.div
        style={{ y: contentY, opacity: contentOpa }}
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
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-sm text-text-muted">Disponível para projetos</span>
        </motion.div>

        {/* Name — TextReveal for most themes, GlitchText for cyber/retro */}
        <motion.h1
          variants={item}
          className="text-5xl sm:text-7xl font-display font-bold text-text leading-tight tracking-tight"
        >
          {isGlitch
            ? <GlitchText text={NAME} active />
            : <TextReveal text={NAME} delay={0.2} />
          }
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
          Desenvolvedor Front-end · Estudante de ADS · Criativo nato.
          Arroio do Sal — RS, Brasil.
        </motion.p>

        {/* Universe Button wrapped in MagneticButton */}
        <motion.div variants={item} className="mt-2">
          <MagneticButton strength={22}>
            <UniverseButton />
          </MagneticButton>
        </motion.div>

        {/* Theme orbs */}
        <motion.div
          variants={item}
          className="flex items-center gap-2.5 mt-1 flex-wrap justify-center"
          role="group"
          aria-label="Escolher universo"
        >
          {THEMES.map((t) => (
            <Tooltip key={t.id} content={`${t.emoji} ${t.name}`}>
              <motion.button
                onClick={() => switchTheme(t.id)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.88 }}
                aria-label={`Mudar para o universo ${t.name}`}
                aria-pressed={theme === t.id}
                className={[
                  "w-9 h-9 rounded-full flex items-center justify-center text-base transition-all duration-200 cursor-pointer border",
                  theme === t.id
                    ? "bg-primary/20 border-primary shadow-theme-glow scale-110"
                    : "bg-surface border-border opacity-50 hover:opacity-100",
                ].join(" ")}
              >
                {t.emoji}
              </motion.button>
            </Tooltip>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-text-dim"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <span className="text-[10px] tracking-widest uppercase font-mono">scroll</span>
        <ChevronDown size={14} />
      </motion.div>
    </section>
  );
}
