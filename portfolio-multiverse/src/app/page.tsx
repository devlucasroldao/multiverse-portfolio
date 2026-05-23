"use client";

import { ThemeTransition } from "@/app/components/ui/ThemeTransition";
import { ThemeIndicator } from "@/app/components/ui/ThemeIndicator";
import { SoundToggle } from "@/app/components/ui/SoundToggle";
import { Hero } from "@/app/components/sections/Hero";

export default function Home() {
  return (
    <>
      <ThemeTransition />
      <ThemeIndicator />
      <SoundToggle />
      <Hero />
    </>
  );
}
