"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";

const SECTIONS = [
  { id: "sobre",      emoji: "👤", label: { default: "Sobre", retro2000: "ABOUT", western: "Pistoleiro", cyberpunk: "PROFILE", arcade: "PLAYER" } },
  { id: "stack",      emoji: "⚡", label: { default: "Stack", retro2000: "STACK", western: "Ferramentas", cyberpunk: "TECH", arcade: "WEAPONS" } },
  { id: "projetos",   emoji: "🚀", label: { default: "Projetos", retro2000: "PORTFOLIO", western: "Missões", cyberpunk: "PROJECTS", arcade: "SCORES" } },
  { id: "trajetoria", emoji: "📅", label: { default: "Trajetória", retro2000: "HISTORY", western: "Jornada", cyberpunk: "TIMELINE", arcade: "STORY" } },
  { id: "contato",    emoji: "💬", label: { default: "Contato", retro2000: "CONTACT", western: "Telegrama", cyberpunk: "CONNECT", arcade: "CONTINUE" } },
] as const satisfies Array<{ id: string; emoji: string; label: Record<ThemeId, string> }>;

// Arc positions: items fan from directly above (90°) to directly left (180°)
const RADIUS = 72;
const ARC_POSITIONS = SECTIONS.map((_, i) => {
  const angle = (90 + (90 / (SECTIONS.length - 1)) * i) * (Math.PI / 180);
  return {
    x: -Math.cos(angle) * RADIUS,
    y: -Math.sin(angle) * RADIUS,
  };
});

export function FloatingNav() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Show after 300px scroll
  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 300);
      if (window.scrollY <= 300) setIsOpen(false);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-floating-nav]")) setIsOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen]);

  function scrollTo(id: string) {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-floating-nav
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-50"
          style={{ pointerEvents: "none" }}
        >
          {/* Arc items */}
          <AnimatePresence>
            {isOpen &&
              SECTIONS.map((s, i) => {
                const pos = ARC_POSITIONS[i];
                const isActive = activeSection === s.id;
                return (
                  <motion.button
                    key={s.id}
                    data-floating-nav
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{ x: pos.x, y: pos.y, opacity: 1, scale: 1 }}
                    exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 28,
                      delay: i * 0.05,
                    }}
                    onClick={() => scrollTo(s.id)}
                    title={s.label[theme]}
                    className={[
                      "absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center text-base cursor-pointer transition-colors duration-150",
                      isActive
                        ? "bg-primary text-background shadow-theme-glow"
                        : "bg-surface border border-border text-text hover:border-primary",
                    ].join(" ")}
                    style={{ pointerEvents: "auto" }}
                  >
                    {s.emoji}
                  </motion.button>
                );
              })}
          </AnimatePresence>

          {/* Main toggle button */}
          <motion.button
            data-floating-nav
            onClick={() => setIsOpen((v) => !v)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            aria-label={isOpen ? "Fechar navegação" : "Abrir navegação"}
            className="relative w-12 h-12 rounded-full bg-primary text-background flex items-center justify-center shadow-theme-glow cursor-pointer"
            style={{ pointerEvents: "auto" }}
          >
            <motion.span
              key={String(isOpen)}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
