"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, GitBranch, X } from "lucide-react";
import { useTheme, type ThemeId } from "@/app/context/ThemeContext";
import { projects, type Project } from "@/app/data/projects";

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
  const [selected, setSelected] = useState<Project | null>(null);

  // ESC key closes modal
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent scroll while modal open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
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
                onClick={() => setSelected(project)}
                className="group relative bg-background border border-border rounded-theme overflow-hidden flex flex-col hover:shadow-theme-glow transition-shadow duration-300 cursor-pointer"
              >
                {/* Color accent strip */}
                <div
                  className="h-1 w-full shrink-0"
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

                  {/* Links (stop propagation so clicking a link doesn't open modal) */}
                  <div
                    className="flex items-center gap-4 pt-1"
                    onClick={(e) => e.stopPropagation()}
                  >
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
                    Ver detalhes →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 backdrop-blur-md bg-black/60"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" as const }}
              className="bg-surface border border-border rounded-theme max-w-lg w-full overflow-hidden shadow-theme-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient mockup */}
              <div
                className="w-full h-44 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${selected.color}1A 0%, ${selected.color}44 50%, ${selected.color}22 100%)`,
                }}
              >
                <span
                  className="font-display font-bold text-7xl opacity-20 select-none"
                  style={{ color: selected.color }}
                >
                  {selected.title[0]}
                </span>
                {/* Color strip at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: selected.color }}
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display font-bold text-xl text-text leading-tight">
                    {selected.title}
                  </h2>
                  <button
                    onClick={() => setSelected(null)}
                    className="shrink-0 text-text-muted hover:text-text transition-colors mt-0.5 cursor-pointer"
                    aria-label="Fechar"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="text-text-muted text-sm leading-relaxed">
                  {selected.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded-full bg-background border border-border text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-1">
                  {selected.url && (
                    <a
                      href={selected.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-theme bg-primary text-background text-xs font-mono font-semibold hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink size={13} />
                      Ver projeto
                    </a>
                  )}
                  {selected.github && (
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-theme border border-border text-text-muted text-xs font-mono hover:border-primary hover:text-primary transition-colors"
                    >
                      <GitBranch size={13} />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
