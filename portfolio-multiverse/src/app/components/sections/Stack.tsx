"use client";

import { useRef, useState } from "react";
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
};

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "all",       label: "Todos"     },
  { value: "frontend",  label: "Frontend"  },
  { value: "backend",   label: "Backend"   },
  { value: "design",    label: "Design"    },
  { value: "devops",    label: "DevOps"    },
  { value: "marketing", label: "Marketing" },
];

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
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export function Stack() {
  const { theme } = useTheme();
  const [active, setActive] = useState<Category>("all");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    active === "all" ? stack : stack.filter((s) => s.category === active);

  return (
    <section ref={ref} className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-display font-bold text-text mb-10"
        >
          {TITLES[theme]}
        </motion.h2>

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

        {/* Cards grid */}
        <motion.div
          key={active}
          variants={cardContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((s) => (
            <motion.div
              key={s.name}
              variants={cardItem}
              whileHover={{ scale: 1.03, boxShadow: "var(--shadow-glow)" }}
              className="bg-surface border border-border rounded-theme p-5 flex flex-col gap-3 cursor-default"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl leading-none w-8 text-center">
                  {s.icon}
                </span>
                <span className="font-mono text-sm text-text">{s.name}</span>
              </div>
              <SkillBar level={s.level} inView={inView} />
              <span className="text-[11px] text-text-dim text-right font-mono">
                {s.level}%
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
