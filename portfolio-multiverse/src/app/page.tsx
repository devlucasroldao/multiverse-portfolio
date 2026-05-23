"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/app/context/ThemeContext";

import { ThemeTransition } from "@/app/components/ui/ThemeTransition";
import { ThemeIndicator } from "@/app/components/ui/ThemeIndicator";
import { AchievementToast } from "@/app/components/ui/AchievementToast";
import { CustomCursor } from "@/app/components/ui/CustomCursor";

import { Navbar } from "@/app/components/layout/Navbar";

import { ParticleField } from "@/app/components/effects/ParticleField";
import { ScanLines } from "@/app/components/effects/ScanLines";
import { CRTEffect } from "@/app/components/effects/CRTEffect";
import { FilmGrain } from "@/app/components/effects/FilmGrain";

import { Hero } from "@/app/components/sections/Hero";
import { About } from "@/app/components/sections/About";
import { Stack } from "@/app/components/sections/Stack";
import { Projects } from "@/app/components/sections/Projects";
import { Timeline } from "@/app/components/sections/TimeLine";
import { Contact } from "@/app/components/sections/Contact";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const ALL_THEMES_ACHIEVEMENT = "Multiverse Explorer — você visitou todos os universos!";
const KONAMI_ACHIEVEMENT = "↑↑↓↓←→←→BA — você conhece os clássicos!";

export default function Home() {
  const { visitedThemes } = useTheme();
  const [achievement, setAchievement] = useState<string | null>(null);
  const [konamiDone, setKonamiDone] = useState(false);
  const [allThemesDone, setAllThemesDone] = useState(false);
  const konamiRef = { current: 0 };

  const showAchievement = useCallback((msg: string) => {
    setAchievement(null);
    // Slight delay so AnimatePresence re-mounts for same message
    requestAnimationFrame(() => setAchievement(msg));
  }, []);

  // All themes achievement
  useEffect(() => {
    if (!allThemesDone && visitedThemes.size >= 5) {
      setAllThemesDone(true);
      showAchievement(ALL_THEMES_ACHIEVEMENT);
    }
  }, [visitedThemes, allThemesDone, showAchievement]);

  // Konami code
  useEffect(() => {
    if (konamiDone) return;
    let idx = 0;

    function onKey(e: KeyboardEvent) {
      if (e.key === KONAMI[idx]) {
        idx++;
        if (idx === KONAMI.length) {
          setKonamiDone(true);
          showAchievement(KONAMI_ACHIEVEMENT);
          idx = 0;
        }
      } else {
        idx = e.key === KONAMI[0] ? 1 : 0;
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [konamiDone, showAchievement]);

  return (
    <>
      {/* Global effects */}
      <ThemeTransition />
      <CustomCursor />
      <ParticleField />
      <ScanLines />
      <CRTEffect />
      <FilmGrain />

      {/* UI overlays */}
      <ThemeIndicator />
      <AchievementToast message={achievement} onDismiss={() => setAchievement(null)} />

      {/* Layout */}
      <Navbar />

      <main className="pt-14">
        <Hero />
        <section id="sobre"><About /></section>
        <section id="stack"><Stack /></section>
        <section id="projetos"><Projects /></section>
        <section id="trajetoria"><Timeline /></section>
        <section id="contato"><Contact /></section>
      </main>
    </>
  );
}
