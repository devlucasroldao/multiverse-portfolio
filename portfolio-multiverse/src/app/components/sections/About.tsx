"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";

const TITLES: Record<ThemeId, string> = {
  default:   "Sobre Mim",
  retro2000: "ABOUT.exe",
  western:   "O Pistoleiro",
  cyberpunk: "PROFILE_DATA",
  arcade:    "PLAYER INFO",
};

const STATS = [
  { value: "7+",  label: "anos de experiência" },
  { value: "50+", label: "projetos entregues"   },
  { value: "3",   label: "áreas de atuação"     },
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
        <motion.h2
          variants={item}
          className="text-3xl sm:text-4xl font-display font-bold text-text mb-12"
        >
          {TITLES[theme]}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Text + areas */}
          <div className="flex flex-col gap-5">
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
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {area}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Stat cards */}
          <div className="flex flex-col gap-4">
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={item}
                className="bg-background border border-border rounded-theme p-6 flex flex-col gap-1"
              >
                <span className="text-4xl font-display font-bold text-primary">
                  {stat.value}
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
