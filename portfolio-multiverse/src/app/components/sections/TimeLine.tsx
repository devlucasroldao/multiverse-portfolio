"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";
import { timeline } from "@/app/data/timeline";

const TITLES: Record<ThemeId, string> = {
  default:   "Trajetória",
  retro2000: "HISTORY.log",
  western:   "A Longa Jornada",
  cyberpunk: "TIMELINE_DATA",
  arcade:    "STORY MODE",
};

const TYPE_ICONS: Record<string, string> = {
  work:        "💼",
  education:   "🎓",
  achievement: "🏆",
};

export function Timeline() {
  const { theme } = useTheme();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-display font-bold text-text mb-16 text-center"
        >
          {TITLES[theme]}
        </motion.h2>

        <div className="relative">
          {/* Central vertical line — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="flex flex-col gap-10">
            {timeline.map((entry, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={entry.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.12,
                    ease: "easeOut",
                  }}
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
                    <div className="bg-surface border border-border rounded-theme p-5 flex flex-col gap-2 hover:shadow-theme-sm transition-shadow">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-display font-semibold text-text text-sm leading-snug">
                          {entry.title}
                        </span>
                        <span className="text-xl shrink-0">
                          {TYPE_ICONS[entry.type]}
                        </span>
                      </div>
                      <span className="text-xs text-primary font-mono">
                        {entry.company}
                      </span>
                      <span className="text-xs text-text-dim font-mono">
                        {entry.date}
                      </span>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {entry.description}
                      </p>
                    </div>
                  </div>

                  {/* Dot on the center line — desktop only */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-primary border-2 border-background shadow-theme-glow shrink-0" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
