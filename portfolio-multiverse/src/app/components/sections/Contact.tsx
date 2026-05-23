"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link2, GitBranch, MessageCircle, Mail } from "lucide-react";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";

const TITLES: Record<ThemeId, string> = {
  default:   "Vamos Conversar",
  retro2000: "CONTATO.html",
  western:   "Mande um Telegrama",
  cyberpunk: "CONNECT_REQUEST",
  arcade:    "CONTINUE?",
};

const TAGLINES: Record<ThemeId, string> = {
  default:   "Aberto a projetos, collabs e conversas que gerem valor.",
  retro2000: ">> Clique em um dos links abaixo para me contatar <<",
  western:   "Se você tem um trabalho, eu sou o parceiro certo.",
  cyberpunk: "Inicializando canal de comunicação seguro...",
  arcade:    "INSERT COIN — press any link to start",
};

const EASTER_EGGS: Record<ThemeId, string> = {
  default:   "feat: add human to project — closes #42",
  retro2000: "Powered by Internet Explorer 6.0 ☆ Best viewed in 800×600",
  western:   "Nenhum pixel foi ferido durante a criação deste portfólio.",
  cyberpunk: "// TODO: hire this dev before the competition does",
  arcade:    "↑ ↑ ↓ ↓ ← → ← → B A — you found the easter egg",
};

const CONTACTS = [
  {
    label: "LinkedIn",
    href:  "https://linkedin.com/in/seunome",
    Icon:  Link2,
    color: "#0A66C2",
  },
  {
    label: "GitHub",
    href:  "https://github.com/seunome",
    Icon:  GitBranch,
    color: "#6366F1",
  },
  {
    label: "WhatsApp",
    href:  "https://wa.me/5511999999999",
    Icon:  MessageCircle,
    color: "#25D366",
  },
  {
    label: "E-mail",
    href:  "mailto:contato@seunome.dev",
    Icon:  Mail,
    color: "#F472B6",
  },
] as const;

export function Contact() {
  const { theme } = useTheme();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-surface">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-10 text-center">
        {/* Heading */}
        <div className="flex flex-col items-center gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-5xl font-display font-bold text-text"
          >
            {TITLES[theme]}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-text-muted text-lg max-w-sm"
          >
            {TAGLINES[theme]}
          </motion.p>
        </div>

        {/* Contact buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {CONTACTS.map(({ label, href, Icon, color }, index) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 + index * 0.08 }}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.96 }}
              className="flex flex-col items-center gap-3 bg-background border border-border rounded-theme p-5 text-text-muted hover:text-text hover:border-primary transition-colors duration-200"
            >
              <span style={{ color }}>
                <Icon size={24} />
              </span>
              <span className="text-xs font-mono">{label}</span>
            </motion.a>
          ))}
        </div>

        {/* Easter egg */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs text-text-dim font-mono opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-default"
        >
          {EASTER_EGGS[theme]}
        </motion.p>
      </div>
    </section>
  );
}
