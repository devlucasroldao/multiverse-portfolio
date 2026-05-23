"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@/app/context/ThemeContext";
import { useKonamiCode } from "@/app/hooks/useKonamiCode";

// ── Dynamic imports — browser-only or heavy components ────────────────────
const ParticleField = dynamic(
  () => import("@/app/components/effects/ParticleField").then((m) => ({ default: m.ParticleField })),
  { ssr: false }
);
const ScanLines = dynamic(
  () => import("@/app/components/effects/ScanLines").then((m) => ({ default: m.ScanLines })),
  { ssr: false }
);
const CRTEffect = dynamic(
  () => import("@/app/components/effects/CRTEffect").then((m) => ({ default: m.CRTEffect })),
  { ssr: false }
);
const FilmGrain = dynamic(
  () => import("@/app/components/effects/FilmGrain").then((m) => ({ default: m.FilmGrain })),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import("@/app/components/ui/CustomCursor").then((m) => ({ default: m.CustomCursor })),
  { ssr: false }
);
const LoadingScreen = dynamic(
  () => import("@/app/components/ui/LoadingScreen").then((m) => ({ default: m.LoadingScreen })),
  { ssr: false }
);
const FloatingNav = dynamic(
  () => import("@/app/components/ui/FloatingNav").then((m) => ({ default: m.FloatingNav })),
  { ssr: false }
);

// ── Static imports ────────────────────────────────────────────────────────
import { ThemeTransition } from "@/app/components/ui/ThemeTransition";
import { ThemeIndicator } from "@/app/components/ui/ThemeIndicator";
import { AchievementToast } from "@/app/components/ui/AchievementToast";
import { ThemeSelector } from "@/app/components/ui/ThemeSelector";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { Hero } from "@/app/components/sections/Hero";
import { About } from "@/app/components/sections/About";
import { Stack } from "@/app/components/sections/Stack";
import { Projects } from "@/app/components/sections/Projects";
import { Timeline } from "@/app/components/sections/TimeLine";
import { Contact } from "@/app/components/sections/Contact";

// ── Constants ─────────────────────────────────────────────────────────────
const ALL_THEMES_ACHIEVEMENT = "Multiverse Explorer — você visitou todos os universos!";
const KONAMI_ACHIEVEMENT = "↑↑↓↓←→←→BA — você conhece os clássicos!";

// ── Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  const { visitedThemes } = useTheme();
  const [achievement, setAchievement] = useState<string | null>(null);
  const allThemesDone = useRef(false);
  const konamiDone = useRef(false);

  const showAchievement = useCallback((msg: string) => {
    setAchievement(null);
    requestAnimationFrame(() => setAchievement(msg));
  }, []);

  // All-themes achievement
  useEffect(() => {
    if (!allThemesDone.current && visitedThemes.size >= 5) {
      allThemesDone.current = true;
      showAchievement(ALL_THEMES_ACHIEVEMENT);
    }
  }, [visitedThemes, showAchievement]);

  // Konami code via isolated hook
  useKonamiCode(() => {
    if (!konamiDone.current) {
      konamiDone.current = true;
      showAchievement(KONAMI_ACHIEVEMENT);
    }
  });

  return (
    <>
      {/* Loading screen (first visit only) */}
      <LoadingScreen />

      {/* Visual effects */}
      <ParticleField />
      <ScanLines />
      <CRTEffect />
      <FilmGrain />

      {/* Theme */}
      <ThemeTransition />

      {/* Cursor */}
      <CustomCursor />

      {/* Overlays */}
      <ThemeIndicator />
      <ThemeSelector />
      <AchievementToast message={achievement} onDismiss={() => setAchievement(null)} />

      {/* Navigation */}
      <Navbar />
      <FloatingNav />

      {/* Main content */}
      <main className="pt-14">
        <Hero />
        <section id="sobre"><About /></section>
        <section id="stack"><Stack /></section>
        <section id="projetos"><Projects /></section>
        <section id="trajetoria"><Timeline /></section>
        <section id="contato"><Contact /></section>
        <Footer />
      </main>
    </>
  );
}
