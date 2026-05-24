"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link2, GitBranch, MessageCircle, Mail } from "lucide-react";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";

const SECTION_LABELS: Record<ThemeId, string> = {
  default:   "// Vamos Conversar",
  retro2000: ">> CONTATO.html",
  western:   "— Mande um Telegrama —",
  cyberpunk: "CONNECT_REQUEST >>",
  arcade:    "CONTINUE?",
  oldfilm:   "— Entre em Contato —",
  sketch:    "// Bate um Papo",
  rpg:       "⚔ FORJAR ALIANÇA",
};

const TITLES: Record<ThemeId, string> = {
  default:   "Vamos Conversar",
  retro2000: "CONTATO.html",
  western:   "Mande um Telegrama",
  cyberpunk: "CONNECT_REQUEST",
  arcade:    "CONTINUE?",
  oldfilm:   "Entre em Contato",
  sketch:    "Bate um Papo",
  rpg:       "FORJAR ALIANÇA",
};

const TAGLINES: Record<ThemeId, string> = {
  default:   "Aberto a projetos, collabs e conversas que gerem valor.",
  retro2000: ">> Clique em um dos links abaixo para me contatar <<",
  western:   "Se você tem um trabalho, eu sou o parceiro certo.",
  cyberpunk: "Inicializando canal de comunicação seguro...",
  arcade:    "INSERT COIN — press any link to start",
  oldfilm:   "Uma boa história começa com uma conversa.",
  sketch:    "Toda grande obra começa com uma ideia compartilhada.",
  rpg:       "Todo herói precisa de uma missão. Vamos criar a sua.",
};

const CONTACTS = [
  {
    label:    "LinkedIn",
    href:     "https://www.linkedin.com/in/devlucasroldao/",
    Icon:     Link2,
    color:    "#0A66C2",
    bg:       "rgba(10,102,194,0.08)",
    desc:     "Conectar",
  },
  {
    label:    "GitHub",
    href:     "https://github.com/devlucasroldao",
    Icon:     GitBranch,
    color:    "#6e5494",
    bg:       "rgba(110,84,148,0.08)",
    desc:     "Ver código",
  },
  {
    label:    "WhatsApp",
    href:     "https://wa.me/5551999611692",
    Icon:     MessageCircle,
    color:    "#25D366",
    bg:       "rgba(37,211,102,0.08)",
    desc:     "Conversar",
  },
  {
    label:    "E-mail",
    href:     "mailto:lucasroldao2802@gmail.com",
    Icon:     Mail,
    color:    "#52B788",
    bg:       "rgba(82,183,136,0.08)",
    desc:     "Escrever",
  },
] as const;

export function Contact() {
  const { theme } = useTheme();
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 px-6 bg-surface relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none bg-glow-top" aria-hidden />

      <div className="max-w-3xl mx-auto flex flex-col items-center gap-12 text-center relative">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="section-label">{SECTION_LABELS[theme]}</span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-text leading-tight">
            {TITLES[theme]}
          </h2>
          <p className="text-text-muted text-lg max-w-sm leading-relaxed">
            {TAGLINES[theme]}
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {CONTACTS.map(({ label, href, Icon, color, bg, desc }, index) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 + index * 0.08 }}
              whileHover={{ scale: 1.05, y: -5, boxShadow: `0 8px 30px ${color}33` }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center gap-3 border border-border rounded-theme p-6 text-text-muted hover:text-text hover:border-primary/40 transition-all duration-250 relative overflow-hidden group"
              style={{ background: "var(--color-background)" }}
            >
              {/* Card background tint on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: bg }}
              />

              {/* Icon container */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-transform duration-200 group-hover:scale-110"
                style={{ background: bg, border: `1px solid ${color}33` }}
              >
                <Icon size={22} style={{ color }} />
              </div>

              <div className="flex flex-col gap-0.5 relative z-10">
                <span className="text-sm font-mono font-medium text-text">{label}</span>
                <span className="text-[11px] text-text-dim">{desc}</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Easter egg — dim, hover reveals */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs text-text-dim font-mono opacity-25 hover:opacity-70 transition-opacity duration-500 cursor-default"
        >
          Arroio do Sal — RS, Brasil · lucasroldao2802@gmail.com
        </motion.p>

        {/* Hidden selectable easter egg */}
        <p
          className="text-xs font-mono select-all"
          style={{ color: "transparent", userSelect: "text" }}
          aria-hidden
        >
          Você achou o easter egg! Me manda uma mensagem dizendo qual universo preferiu 😄 — @devlucasroldao
        </p>
      </div>
    </section>
  );
}
