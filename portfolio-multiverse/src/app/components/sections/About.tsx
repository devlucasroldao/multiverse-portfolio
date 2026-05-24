"use client";

import { useRef, useState } from "react";
import Image from "next/image";
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
  oldfilm:   "O Diretor",
  sketch:    "Quem Sou Eu?",
  rpg:       "FICHA DO HERÓI",
};

const STATS = [
  { value: 1,  suffix: " ano",  label: "de estudos intensos"        },
  { value: 5,  suffix: "+",     label: "projetos em desenvolvimento" },
  { value: 7,  suffix: "+",     label: "linguagens e ferramentas"    },
  { value: "∞", suffix: "",     label: "criatividade disponível"     },
];

const AREAS = [
  "Desenvolvimento Front-end",
  "UI/UX — Design & Experiência",
  "Edição de Vídeo & Roteiro",
  "Automações com IA",
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
  const [imgError, setImgError] = useState(false);

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
      {/* Inner circle — photo or initials fallback */}
      <div className="absolute inset-0.75 rounded-full bg-background overflow-hidden z-10">
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
            <span className="font-display font-bold text-3xl text-primary select-none">LR</span>
          </div>
        )}
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

          {/* Right: stat cards */}
          <div className="flex flex-col gap-4">
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={item}
                className="bg-background border border-border rounded-theme p-6 flex flex-col gap-1"
              >
                <span className="text-4xl font-display font-bold text-primary">
                  {typeof stat.value === "number"
                    ? <CountUp end={stat.value} suffix={stat.suffix} />
                    : <>{stat.value}{stat.suffix}</>
                  }
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
