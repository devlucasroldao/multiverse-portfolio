"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";
import { timeline } from "@/app/data/timeline";

const SECTION_LABELS: Record<ThemeId, string> = {
  default:   "// Trajetória",
  retro2000: ">> HISTORY.log",
  western:   "— A Longa Jornada —",
  cyberpunk: "TIMELINE_DATA >>",
  arcade:    "STORY MODE",
  oldfilm:   "— O Roteiro da Vida —",
  sketch:    "// Minha Jornada",
  rpg:       "⚔ LORE DO HERÓI",
};

const TITLES: Record<ThemeId, string> = {
  default:   "Trajetória",
  retro2000: "HISTORY.log",
  western:   "A Longa Jornada",
  cyberpunk: "TIMELINE_DATA",
  arcade:    "STORY MODE",
  oldfilm:   "O Roteiro da Vida",
  sketch:    "Minha Jornada",
  rpg:       "LORE DO HERÓI",
};

const TYPE_ICONS: Record<string, string> = {
  work:        "💼",
  education:   "🎓",
  achievement: "🏆",
};

const TYPE_COLORS: Record<string, string> = {
  work:        "var(--color-primary)",
  education:   "var(--color-secondary)",
  achievement: "var(--color-accent)",
};

export function Timeline() {
  const { theme } = useTheme();
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 px-6 bg-background relative overflow-hidden">
      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none bg-glow-right" aria-hidden />

      <div className="max-w-3xl mx-auto relative">

        {/* Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-label block mb-4">{SECTION_LABELS[theme]}</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-text">
            {TITLES[theme]}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line — desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, transparent, var(--color-border) 10%, var(--color-border) 90%, transparent)" }}
          />

          <div className="flex flex-col gap-10">
            {timeline.map((entry, index) => {
              const isLeft     = index % 2 === 0;
              const typeColor  = TYPE_COLORS[entry.type] ?? "var(--color-primary)";

              return (
                <motion.div
                  key={entry.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
                  className={[
                    "relative flex md:items-center gap-6 md:gap-0",
                    isLeft ? "md:flex-row" : "md:flex-row-reverse",
                  ].join(" ")}
                >
                  {/* Card */}
                  <div
                    className={[
                      "md:w-[calc(50%-2rem)]",
                      isLeft ? "md:pr-8" : "md:pl-8",
                    ].join(" ")}
                  >
                    <motion.div
                      whileHover={{ scale: 1.01, boxShadow: "var(--shadow-glow)" }}
                      className="bg-surface border border-border rounded-theme p-5 flex flex-col gap-2.5 transition-all duration-300 hover:border-primary/25 relative overflow-hidden group"
                    >
                      {/* Top accent line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
                        style={{ background: `linear-gradient(90deg, ${typeColor}, transparent)` }}
                      />

                      {/* Header row */}
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-display font-semibold text-text text-sm leading-snug">
                          {entry.title}
                        </span>
                        <span
                          className="text-lg shrink-0 w-8 h-8 flex items-center justify-center rounded-full"
                          style={{ background: `${typeColor}18`, fontSize: "1rem" }}
                        >
                          {TYPE_ICONS[entry.type]}
                        </span>
                      </div>

                      {/* Company */}
                      <span className="text-xs font-mono font-medium" style={{ color: typeColor }}>
                        {entry.company}
                      </span>

                      {/* Date */}
                      <span className="text-xs text-text-dim font-mono">
                        {entry.date}
                      </span>

                      {/* Description */}
                      <p className="text-sm text-text-muted leading-relaxed">
                        {entry.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Glowing dot on center line — desktop */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: index * 0.12 + 0.3, duration: 0.35 }}
                    className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-background shrink-0 z-10 timeline-dot"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
