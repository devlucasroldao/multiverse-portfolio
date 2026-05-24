"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";
import { TextReveal } from "@/app/components/effects/TextReveal";
import { CountUp } from "@/app/components/effects/CountUp";

const TITLES: Record<ThemeId, string> = {
  default:   "Sobre Mim",
  retro2000: "ABOUT.exe",
  western:   "O Pistoleiro",
  cyberpunk: "PROFILE_DATA",
  arcade:    "PLAYER INFO",
};

const STATS = [
  { value: 7,  suffix: "+", label: "anos de experiência" },
  { value: 50, suffix: "+", label: "projetos entregues"   },
  { value: 3,  suffix: "",  label: "áreas de atuação"     },
];

const AREAS = [
  "Desenvolvimento Full Stack",
  "Design UI/UX",
  "Growth Marketing",
  "Automações & Integrações",
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

// ── Animated profile photo ────────────────────────────────────────────────
function ProfilePhoto() {
  return (
    <div className="relative w-36 h-36 mx-auto md:mx-0 shrink-0" aria-hidden>
      {/* Rotating conic-gradient border */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, var(--color-primary) 0deg, var(--color-secondary) 120deg, var(--color-accent) 240deg, var(--color-primary) 360deg)",
        }}
      />
      {/* Inner static circle */}
      <div className="absolute inset-[3px] rounded-full bg-background flex items-center justify-center z-10">
        <span className="font-display font-bold text-3xl text-primary select-none">LR</span>
      </div>
    </div>
  );
}

export function About() {
  const { theme } = useTheme();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-surface">
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto"
      >
        {/* Title — TextReveal, remounts on theme change */}
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-text mb-12">
          <TextReveal key={TITLES[theme]} text={TITLES[theme]} />
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: photo + text + areas */}
          <div className="flex flex-col gap-6">
            <motion.div variants={item}>
              <ProfilePhoto />
            </motion.div>

            <motion.p variants={item} className="text-text-muted leading-relaxed">
              Sou um profissional híbrido que une código, design e estratégia de
              crescimento. Não me contento em entregar um site bonito — quero que
              cada pixel e cada linha de código gere resultado real para o negócio.
            </motion.p>
            <motion.p variants={item} className="text-text-muted leading-relaxed">
              Trabalho desde a arquitetura da solução até a análise de métricas
              pós-lançamento. Acredito que o melhor produto é aquele que as pessoas
              realmente usam — e que cresce de forma sustentável.
            </motion.p>

            <motion.ul variants={item} className="flex flex-col gap-2.5 mt-1">
              {AREAS.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2.5 text-text-muted text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                  {area}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: stat cards with CountUp */}
          <div className="flex flex-col gap-4">
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={item}
                className="bg-background border border-border rounded-theme p-6 flex flex-col gap-1"
              >
                <span className="text-4xl font-display font-bold text-primary">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-sm text-text-muted">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
