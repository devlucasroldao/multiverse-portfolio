"use client";

import { useRef, useState, memo, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";
import { stack, type StackItem } from "@/app/data/stack";

type Category = StackItem["category"] | "all";

const SECTION_LABELS: Record<ThemeId, string> = {
  default:   "// Tech Stack",
  retro2000: ">> SKILLS.dat",
  western:   "— Ferramentas do Ofício —",
  cyberpunk: "TECH_MATRIX >>",
  arcade:    "POWER-UPS",
  oldfilm:   "— Equipamentos —",
  sketch:    "// Meu Arsenal",
  rpg:       "⚔ HABILIDADES",
};

const TITLES: Record<ThemeId, string> = {
  default:   "Tech Stack",
  retro2000: "SKILLS.dat",
  western:   "Ferramentas do Ofício",
  cyberpunk: "TECH_MATRIX",
  arcade:    "POWER-UPS",
  oldfilm:   "Equipamentos",
  sketch:    "Meu Arsenal",
  rpg:       "HABILIDADES",
};

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "all",       label: "Todos"     },
  { value: "frontend",  label: "Frontend"  },
  { value: "backend",   label: "Backend"   },
  { value: "design",    label: "Design"    },
  { value: "devops",    label: "DevOps"    },
  { value: "marketing", label: "Marketing" },
];

const CAT_LABELS: Record<StackItem["category"], string> = {
  frontend:  "Frontend",
  backend:   "Backend",
  design:    "Design",
  devops:    "DevOps",
  marketing: "Marketing",
};

function levelLabel(level: number): string {
  if (level >= 90) return "Expert";
  if (level >= 75) return "Avançado";
  if (level >= 60) return "Intermediário";
  return "Iniciante";
}

// ── Skill bar with gradient + glow ────────────────────────────────────────
function SkillBar({ level, inView }: { level: number; inView: boolean }) {
  return (
    <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-visible relative">
      <motion.div
        className="h-full skill-bar-gradient relative"
        style={{ borderRadius: "9999px" }}
        initial={{ width: 0 }}
        animate={{ width: inView ? `${level}%` : 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
      >
        {/* Glow dot at end of bar */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
          style={{
            background: "var(--color-primary)",
            boxShadow: "0 0 8px var(--color-primary-glow), 0 0 16px var(--color-primary-glow)",
            marginRight: "-5px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.85, duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}

const cardContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardItem = {
  hidden:  { opacity: 0, scale: 0.93, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

interface CardProps {
  s: StackItem;
  inView: boolean;
}

const SkillCard = memo(function SkillCard({ s, inView }: CardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardItem}
      whileHover={{ y: -3, boxShadow: "var(--shadow-glow)" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative bg-surface border border-border rounded-theme p-5 flex flex-col gap-3 cursor-default transition-all duration-300 hover:border-primary/30 overflow-hidden group"
    >
      {/* Inner glow overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-theme"
        style={{ background: "radial-gradient(circle at 50% 0%, var(--color-primary-glow), transparent 60%)" }}
      />

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 bg-text text-background text-[10px] font-mono px-2.5 py-1 rounded whitespace-nowrap z-20 pointer-events-none"
          >
            {levelLabel(s.level)}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-text" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon + name */}
      <div className="flex items-center gap-3 relative z-10">
        <span className="text-2xl leading-none w-8 text-center shrink-0">{s.icon}</span>
        <span className="font-mono text-sm text-text font-medium">{s.name}</span>
      </div>

      {/* Skill bar */}
      <div className="relative z-10">
        <SkillBar level={s.level} inView={inView} />
      </div>

      {/* Level label + % */}
      <div className="flex justify-between items-center relative z-10">
        <span className="text-[11px] text-text-dim font-mono">
          {levelLabel(s.level)}
        </span>
        <span className="text-[11px] text-primary font-mono font-medium">
          {s.level}%
        </span>
      </div>
    </motion.div>
  );
});

// ── Component ─────────────────────────────────────────────────────────────
export function Stack() {
  const { theme } = useTheme();
  const [active, setActive] = useState<Category>("all");
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered   = active === "all" ? stack : stack.filter((s) => s.category === active);
  const categories = (["frontend", "backend", "design", "devops", "marketing"] as const).filter(
    (cat) => active === "all" || cat === active
  );

  return (
    <section ref={ref} className="py-28 px-6 bg-background relative overflow-hidden">
      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none bg-glow-left" aria-hidden />

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="section-label block mb-4">{SECTION_LABELS[theme]}</span>
          <div className="flex flex-wrap items-baseline gap-4">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text">
              {TITLES[theme]}
            </h2>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm font-mono text-text-muted"
            >
              {stack.length} tecnologias
            </motion.span>
          </div>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {CATEGORIES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={[
                "px-4 py-1.5 rounded-full text-sm font-mono border transition-all duration-200 cursor-pointer",
                active === value
                  ? "bg-primary text-background border-primary shadow-theme-sm"
                  : "bg-surface text-text-muted border-border hover:border-primary hover:text-primary",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Cards — grouped when viewing all, flat otherwise */}
        {active === "all" ? (
          <div className="flex flex-col gap-12">
            {categories.map((cat) => {
              const items = stack.filter((s) => s.category === cat);
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4 }}
                >
                  {/* Category divider */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1 bg-border" />
                    <h3 className="text-[11px] font-mono text-text-dim uppercase tracking-widest px-2">
                      {CAT_LABELS[cat]}
                    </h3>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <motion.div
                    variants={cardContainer}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {items.map((s) => (
                      <SkillCard key={s.name} s={s} inView={inView} />
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            key={active}
            variants={cardContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((s) => (
              <SkillCard key={s.name} s={s} inView={inView} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
