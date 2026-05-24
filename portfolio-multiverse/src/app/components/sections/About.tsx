"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";
import { TextReveal } from "@/app/components/effects/TextReveal";
import { CountUp } from "@/app/components/effects/CountUp";

const SECTION_LABELS: Record<ThemeId, string> = {
  default:   "// Sobre Mim",
  retro2000: ">> ABOUT.exe",
  western:   "— O Pistoleiro —",
  cyberpunk: "PROFILE_DATA >>",
  arcade:    "PLAYER INFO",
  oldfilm:   "— O Diretor —",
  sketch:    "// Quem sou",
  rpg:       "⚔ FICHA DO HERÓI",
};

const SUBTITLES: Record<ThemeId, string> = {
  default:   "Desenvolvedor  •  Criativo  •  Explorador de Universos",
  retro2000: "DEVELOPER • CREATIVE • EXPLORER",
  western:   "Desenvolvedor · Roteirista · Explorador",
  cyberpunk: "DEV:// CRIATIVO // EXPLORADOR",
  arcade:    "DEVELOPER • CREATIVE • EXPLORER",
  oldfilm:   "Diretor · Desenvolvedor · Sonhador",
  sketch:    "Desenvolvedor • Criativo • Explorador",
  rpg:       "HERÓI • CRIADOR • EXPLORADOR",
};

const STATS = [
  { value: 1,   suffix: "+",  label: "ano de estudos intensos",        icon: "🎓" },
  { value: 5,   suffix: "+",  label: "projetos em desenvolvimento",     icon: "</>" },
  { value: 7,   suffix: "+",  label: "linguagens e ferramentas",        icon: "🚀" },
  { value: "∞", suffix: "",   label: "criatividade disponível",         icon: "∞"  },
];

const TAGS = ["Curioso", "Persistente", "Criativo", "Apaixonado por aprender"];

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

// ── Profile photo ─────────────────────────────────────────────────────────
function ProfilePhoto() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-52 h-52 mx-auto shrink-0" aria-hidden>
      {/* Outer atmospheric glow */}
      <div
        className="absolute -inset-4 rounded-full opacity-25 blur-2xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-primary-glow), transparent 70%)" }}
      />
      {/* Spinning conic border */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, var(--color-primary) 0deg, var(--color-secondary) 90deg, transparent 180deg, var(--color-primary) 360deg)",
          padding: "2px",
          borderRadius: "9999px",
        }}
      />
      {/* Inner photo circle */}
      <div className="absolute inset-1 rounded-full bg-background overflow-hidden z-10">
        {!imgError ? (
          <Image
            src="/images/lucas-roldao.jpg"
            alt="Lucas Roldão"
            fill
            priority
            className="object-cover object-top"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display font-bold text-5xl text-primary select-none">LR</span>
          </div>
        )}
      </div>
      {/* Status badge */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-surface border border-border rounded-full px-3 py-1.5 whitespace-nowrap shadow-theme-sm">
        <span className="relative flex h-1.5 w-1.5" aria-hidden>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
        </span>
        <span className="text-[10px] font-mono text-text-muted tracking-wide">Explorando universos...</span>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────
export function About() {
  const { theme } = useTheme();
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 px-6 bg-surface relative overflow-hidden">
      {/* Atmospheric background glow */}
      <div className="absolute inset-0 pointer-events-none bg-glow-right" aria-hidden />

      <div className="max-w-6xl mx-auto relative">

        {/* Section header — full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="section-label block mb-4">{SECTION_LABELS[theme]}</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-text mb-3 leading-tight">
            Sou o{" "}
            <span className="text-primary">
              <TextReveal key={`about-name-${theme}`} text="Lucas" />
            </span>
          </h2>
          <p className="text-text-muted font-mono text-sm tracking-wider">
            {SUBTITLES[theme]}
          </p>
        </motion.div>

        {/* Two-column layout: photo | content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr] gap-12 lg:gap-20 items-start"
        >
          {/* Left: large photo */}
          <motion.div variants={item} className="flex justify-center md:justify-start pt-4">
            <ProfilePhoto />
          </motion.div>

          {/* Right: bio + tags + stats grid */}
          <div className="flex flex-col gap-8">
            {/* Bio paragraphs */}
            <div className="flex flex-col gap-5">
              <motion.p variants={item} className="text-text-muted leading-relaxed">
                Sou um maluco por tudo. Quando gosto de algo, coloco na cabeça e vou em frente — sem
                freio, sem desculpa. Teatro, humor, tecnologia, edição de vídeo, roteiro, código...
                tudo serve pra algo, tudo é experiência. Tenho 22 anos, nasci no último dia de fevereiro
                de 2004, e já fiz de tudo um pouco nessa vida.
              </motion.p>
              <motion.p variants={item} className="text-text-muted leading-relaxed">
                Entrei na faculdade de ADS achando que era só fazer as aulas — engano meu. Aprendi
                rápido que o jogo é outro: estudar por fora, entender o que está em alta, usar isso a
                favor. No início do ano nem sabia usar o GitHub direito. Hoje estou colocando um site no
                ar pra uma empresa de verdade. Isso é evolução, e eu não pretendo parar.
              </motion.p>
              <motion.p variants={item} className="text-text-muted leading-relaxed">
                O que eu quero construir? Qualquer coisa que seja bonita, funcional e que resolva um
                problema de verdade. Não tem sensação melhor do que ver alguém sorrir porque o que você
                criou aliviou o estresse do dia dele — ainda mais quando o projeto tá lindo pra caramba.
              </motion.p>
            </div>

            {/* Personality tags */}
            <motion.div variants={item} className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1.5 rounded-full border border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Stats — 2×2 grid */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={item}
                  whileHover={{ scale: 1.02, boxShadow: "var(--shadow-glow)" }}
                  className="bg-background border border-border rounded-theme p-5 flex flex-col gap-1.5 transition-all duration-300 cursor-default overflow-hidden relative group"
                >
                  {/* Subtle inner glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: "radial-gradient(circle at 50% 50%, var(--color-primary-glow), transparent 70%)" }}
                  />
                  <span className="text-3xl font-display font-bold text-primary leading-none relative z-10">
                    {typeof stat.value === "number"
                      ? <CountUp end={stat.value} suffix={stat.suffix} />
                      : <>{stat.value}{stat.suffix}</>
                    }
                  </span>
                  <span className="text-xs text-text-muted relative z-10 uppercase tracking-wide font-mono">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
