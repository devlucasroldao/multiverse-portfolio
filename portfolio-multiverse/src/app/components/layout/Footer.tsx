"use client";

import { Link2, GitBranch } from "lucide-react";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";

const COPYRIGHT: Record<ThemeId, string> = {
  default:   "Feito com ☕ e muitas linhas de código — Lucas Roldão © 2025",
  retro2000: "Feito com FrontPage 2000 e saudade 💾 — Lucas Roldão © 2025",
  western:   "Forjado à mão no sul do Brasil 🤠 — Lucas Roldão © 2025",
  cyberpunk: "COMPILED_BY: LUCAS_ROLDAO // BUILD: 2025 // STATUS: ONLINE",
  arcade:    "MADE WITH ♥ AND ∞ LIVES // LUCAS ROLDÃO © 2025",
  oldfilm:   "Uma produção Lucas Roldão — Arroio do Sal, RS — 2025",
  sketch:    "Rabiscado com carinho por Lucas Roldão ✏️ — 2025",
  rpg:       "⚔️ Que sua jornada seja épica — Lucas Roldão, Nível 1 · 2025",
};

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/devlucasroldao/", Icon: Link2 },
  { label: "GitHub",   href: "https://github.com/devlucasroldao",           Icon: GitBranch },
];

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xs font-mono text-text-muted hover:text-primary transition-colors cursor-pointer"
        >
          ↑ Voltar ao topo
        </button>

        {/* Copyright */}
        <p className="text-xs font-mono text-text-dim text-center">
          {COPYRIGHT[theme]}
        </p>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-muted hover:text-primary transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
