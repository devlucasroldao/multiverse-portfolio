"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";
import { projects } from "@/app/data/projects";

const TITLES: Record<ThemeId, string> = {
  default:   "Projetos",
  retro2000: "PORTFOLIO.dir",
  western:   "Missões Concluídas",
  cyberpunk: "PROJECT_LOG",
  arcade:    "HIGH SCORES",
};

export function Projects() {
  const { theme } = useTheme();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-surface">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-display font-bold text-text mb-12"
        >
          {TITLES[theme]}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative bg-background border border-border rounded-theme overflow-hidden flex flex-col hover:shadow-theme-glow transition-shadow duration-300"
            >
              {/* Color accent strip */}
              <div
                className="h-1 w-full flex-shrink-0"
                style={{ backgroundColor: project.color }}
              />

              <div className="flex flex-col gap-4 p-6 flex-1">
                <h3 className="font-display font-semibold text-lg text-text">
                  {project.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded-full bg-surface border border-border text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-1">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors"
                    >
                      <ExternalLink size={13} />
                      Ver projeto
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors"
                    >
                      <GitBranch size={13} />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center justify-center">
                <span
                  className="text-sm font-mono font-semibold px-4 py-2 rounded-full"
                  style={{
                    backgroundColor: project.color + "22",
                    color: project.color,
                    border: `1px solid ${project.color}55`,
                  }}
                >
                  Ver projeto →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
