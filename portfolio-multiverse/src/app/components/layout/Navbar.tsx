"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";
import { ScrollProgress } from "@/app/components/ui/ScrollProgress";
import { SoundToggle } from "@/app/components/ui/SoundToggle";

const NAV_LINKS: { label: Record<ThemeId, string>; href: string }[] = [
  {
    label: {
      default:   "Sobre",
      retro2000: "ABOUT",
      western:   "O Pistoleiro",
      cyberpunk: "PROFILE",
      arcade:    "PLAYER",
      oldfilm:   "O Diretor",
      sketch:    "Quem sou",
      rpg:       "HERÓI",
    },
    href: "#sobre",
  },
  {
    label: {
      default:   "Stack",
      retro2000: "STACK.txt",
      western:   "Ferramentas",
      cyberpunk: "TECH_STACK",
      arcade:    "WEAPONS",
      oldfilm:   "Equipamentos",
      sketch:    "Rabiscos",
      rpg:       "HABILIDADES",
    },
    href: "#stack",
  },
  {
    label: {
      default:   "Projetos",
      retro2000: "PORTFOLIO",
      western:   "Missões",
      cyberpunk: "PROJECTS",
      arcade:    "SCORES",
      oldfilm:   "Filmografia",
      sketch:    "Obras",
      rpg:       "MISSÕES",
    },
    href: "#projetos",
  },
  {
    label: {
      default:   "Trajetória",
      retro2000: "HISTORY",
      western:   "Jornada",
      cyberpunk: "TIMELINE",
      arcade:    "STORY",
      oldfilm:   "Filmografia",
      sketch:    "Jornada",
      rpg:       "LORE",
    },
    href: "#trajetoria",
  },
  {
    label: {
      default:   "Contato",
      retro2000: "CONTACT",
      western:   "Telegrama",
      cyberpunk: "CONNECT",
      arcade:    "CONTINUE",
      oldfilm:   "Contato",
      sketch:    "Fale comigo",
      rpg:       "ALIANÇA",
    },
    href: "#contato",
  },
];

const LOGO: Record<ThemeId, string> = {
  default:   "< LR />",
  retro2000: "LUCAS_ROLDAO.exe",
  western:   "⚡ L.Roldão",
  cyberpunk: "LUCAS://ROLDAO",
  arcade:    "▶ LUCAS ROLDÃO",
  oldfilm:   "Lucas Roldão",
  sketch:    "Lucas Roldão",
  rpg:       "Lucas, o Desenvolvedor",
};

export function Navbar() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function scrollTo(href: string) {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={mounted ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono font-bold text-primary text-sm tracking-tight hover:opacity-80 transition-opacity cursor-pointer"
        >
          {LOGO[theme]}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-xs font-mono text-text-muted hover:text-primary transition-colors duration-150 cursor-pointer"
            >
              {link.label[theme]}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <SoundToggle className="relative bottom-auto right-auto w-8 h-8" />

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-text-muted hover:text-primary transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-surface border-t border-border"
          >
            <nav className="flex flex-col px-6 py-4 gap-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm font-mono text-text-muted hover:text-primary transition-colors text-left py-1 cursor-pointer"
                >
                  {link.label[theme]}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
