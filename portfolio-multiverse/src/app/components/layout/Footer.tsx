"use client";

import { motion } from "framer-motion";
import { Link2, GitBranch, Mail, Camera, MapPin, ChevronUp } from "lucide-react";
import { useTheme, THEMES, type ThemeId } from "@/app/context/ThemeContext";

const CLOSING_QUOTES: Record<ThemeId, string> = {
  default:   "\"A criatividade é se divertindo.\" — Albert Einstein",
  retro2000: "\"ERROR 404: Tédio não encontrado.\"",
  western:   "\"Um bom cowboy nunca para no pôr do sol.\"",
  cyberpunk: "\"IN CODE WE TRUST. IN ART WE BREATHE.\"",
  arcade:    "\"GAME OVER? NUNCA. INSERT COIN.\"",
  oldfilm:   "\"Cada linha é uma cena do roteiro da vida.\"",
  sketch:    "\"O papel aguarda. A ideia não espera.\"",
  rpg:       "\"A aventura não termina — ela evolui.\"",
};

const UNIVERSE_LINKS: { label: string; id: ThemeId }[] = [
  { label: "Cyberpunk",    id: "cyberpunk"  },
  { label: "Old Web",      id: "retro2000"  },
  { label: "Faroeste",     id: "western"    },
  { label: "Filme Antigo", id: "oldfilm"    },
  { label: "Arcade",       id: "arcade"     },
];

const SOCIALS = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/devlucasroldao/", Icon: Link2     },
  { label: "GitHub",    href: "https://github.com/devlucasroldao",           Icon: GitBranch },
  { label: "Instagram", href: "https://instagram.com/devlucasroldao",        Icon: Camera    },
  { label: "E-mail",    href: "mailto:lucasroldao2802@gmail.com",            Icon: Mail      },
];

const NAV_LINKS = [
  { label: "Sobre mim",  href: "sobre"      },
  { label: "Tech Stack", href: "stack"      },
  { label: "Projetos",   href: "projetos"   },
  { label: "Trajetória", href: "trajetoria" },
  { label: "Contato",    href: "contato"    },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Footer() {
  const { theme, switchTheme } = useTheme();

  const nextTheme = () => {
    const idx = THEMES.findIndex((t) => t.id === theme);
    const next = THEMES[(idx + 1) % THEMES.length];
    switchTheme(next.id);
  };

  return (
    <footer className="border-t border-border bg-surface relative overflow-hidden">
      {/* Atmospheric glow — top center */}
      <div className="absolute inset-0 pointer-events-none bg-glow-top" aria-hidden />

      {/* ── Main content ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-12 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 — Logo + description + socials */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-6">
            <div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="font-mono font-bold text-primary text-lg cursor-pointer hover:opacity-80 transition-opacity"
              >
                &lt; LR /&gt;
              </button>
              <p className="text-text-muted text-sm leading-relaxed mt-3 max-w-xs">
                Explorando universos criativos através de código, design e experiências digitais.
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all duration-200"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-text-dim">
              Navegação
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Outros universos */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-text-dim">
              Outros Universos
            </h4>
            <ul className="flex flex-col gap-3">
              {UNIVERSE_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => switchTheme(id)}
                    className="text-sm text-text-muted hover:text-primary transition-colors cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={nextTheme}
                  className="text-sm text-text-dim hover:text-text-muted transition-colors cursor-pointer"
                >
                  + Mais universos secretos
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 — CTA + Contato */}
          <div className="flex flex-col gap-6">
            {/* CTA card */}
            <div className="border border-border rounded-theme p-5 flex flex-col gap-3 bg-background/50 hover:border-primary/30 transition-colors duration-300">
              <h4 className="font-display font-semibold text-text text-sm leading-snug">
                Pronto para explorar?
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Atravesse portais e descubra novos universos.
              </p>
              <button
                onClick={nextTheme}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-background text-xs font-mono font-bold rounded-theme hover:opacity-90 transition-opacity cursor-pointer"
              >
                🌌 ABRIR PORTAL
              </button>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:lucasroldao2802@gmail.com"
                className="flex items-center gap-2 text-xs text-text-muted hover:text-primary transition-colors"
              >
                <Mail size={12} />
                lucasroldao2802@gmail.com
              </a>
              <div className="flex items-center gap-2 text-xs text-text-dim">
                <MapPin size={12} />
                Brasil
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5" aria-hidden>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                </span>
                <span className="text-xs text-primary">Disponível para novos desafios</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────── */}
      <div className="border-t border-border relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-mono text-text-dim text-center sm:text-left">
            © 2025 Lucas RMV. Todos os direitos reservados.
          </p>

          <p className="text-xs font-mono text-text-dim text-center italic hidden md:block">
            {CLOSING_QUOTES[theme]}
          </p>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all duration-200 cursor-pointer shrink-0"
            aria-label="Voltar ao topo"
          >
            <ChevronUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
