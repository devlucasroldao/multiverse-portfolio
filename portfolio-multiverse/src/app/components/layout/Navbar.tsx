"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";
import { ScrollProgress } from "@/app/components/ui/ScrollProgress";
import { SoundToggle } from "@/app/components/ui/SoundToggle";

const NAV_LINKS: { label: Record<ThemeId, string>; href: string; id: string }[] = [
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
    id:   "sobre",
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
    id:   "stack",
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
    id:   "projetos",
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
    id:   "trajetoria",
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
    id:   "contato",
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
  const [open, setOpen]               = useState(false);
  const [mounted, setMounted]         = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [activeSection, setActive]    = useState("");

  /* scroll detection */
  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* active section via IntersectionObserver */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.25, rootMargin: "-80px 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollTo(href: string) {
    setOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={mounted ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-surface/90 backdrop-blur-xl border-b border-border shadow-theme-sm"
          : "bg-transparent backdrop-blur-sm border-b border-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono font-bold text-primary text-sm tracking-tight hover:opacity-75 transition-opacity duration-200 cursor-pointer"
        >
          {LOGO[theme]}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={[
                  "relative px-4 py-2 text-xs font-mono rounded-full transition-colors duration-200 cursor-pointer",
                  isActive ? "text-primary" : "text-text-muted hover:text-text",
                ].join(" ")}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                {link.label[theme]}
              </button>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <SoundToggle className="relative bottom-auto right-auto w-8 h-8" />

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-text-muted hover:text-primary transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="md:hidden fixed inset-0 top-16 z-40 bg-surface/97 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => scrollTo(link.href)}
                    className={[
                      "text-3xl font-display font-bold transition-colors cursor-pointer",
                      isActive ? "text-primary" : "text-text-muted hover:text-primary",
                    ].join(" ")}
                  >
                    {link.label[theme]}
                  </motion.button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
