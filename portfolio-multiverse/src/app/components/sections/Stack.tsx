"use client";

import { useRef, useState, memo, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";
import { stack, type StackItem } from "@/app/data/stack";

type Category = StackItem["category"] | "all";

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

function SkillBar({ level, inView }: { level: number; inView: boolean }) {
  return (
    <div className="h-1 w-full bg-surface-2 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: inView ? `${level}%` : 0 }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
      />
    </div>
  );
}

const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardItem = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
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
      whileHover={{ scale: 1.03, boxShadow: "var(--shadow-glow)" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative bg-surface border border-border rounded-theme p-5 flex flex-col gap-3 cursor-default"
    >
      {/* Tooltip */}
      <AnimatePresenceInline show={hovered}>
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-text text-background text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
          {levelLabel(s.level)}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-text" />
        </div>
      </AnimatePresenceInline>

      <div className="flex items-center gap-3">
        <span className="text-2xl leading-none w-8 text-center shrink-0">{s.icon}</span>
        <span className="font-mono text-sm text-text">{s.name}</span>
      </div>
      <SkillBar level={s.level} inView={inView} />
      <div className="flex justify-between items-center">
        <span className="text-[11px] text-text-dim font-mono opacity-60">
          {levelLabel(s.level)}
        </span>
        <span className="text-[11px] text-text-dim text-right font-mono">
          {s.level}%
        </span>
      </div>
    </motion.div>
  );
});

// Lightweight inline AnimatePresence wrapper to avoid importing AnimatePresence at top level
function AnimatePresenceInline({
  show,
  children,
}: {
  show: boolean;
  children: ReactNode;
}) {
  if (!show) return null;
  return <>{children}</>;
}

export function Stack() {
  const { theme } = useTheme();
  const [active, setActive] = useState<Category>("all");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    active === "all" ? stack : stack.filter((s) => s.category === active);

  const categories = (["frontend", "backend", "design", "devops", "marketing"] as const).filter(
    (cat) => active === "all" || cat === active
  );

  return (
    <section ref={ref} className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Title + count */}
        <div className="flex flex-wrap items-baseline gap-4 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-display font-bold text-text"
          >
            {TITLES[theme]}
          </motion.h2>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm font-mono text-text-muted"
          >
            {stack.length} tecnologias dominadas
          </motion.span>
        </div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CATEGORIES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={[
                "px-4 py-1.5 rounded-full text-sm font-mono border transition-colors duration-200 cursor-pointer",
                active === value
                  ? "bg-primary text-background border-primary"
                  : "bg-surface text-text-muted border-border hover:border-primary hover:text-primary",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Cards — grouped when viewing all, flat otherwise */}
        {active === "all" ? (
          <div className="flex flex-col gap-10">
            {categories.map((cat) => {
              const items = stack.filter((s) => s.category === cat);
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-xs font-mono text-text-dim uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="flex-1 h-px bg-border" />
                    {CAT_LABELS[cat]}
                    <span className="flex-1 h-px bg-border" />
                  </h3>
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
