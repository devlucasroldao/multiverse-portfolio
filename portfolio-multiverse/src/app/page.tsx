"use client";

import { ThemeTransition } from "@/app/components/ui/ThemeTransition";
import { ThemeIndicator } from "@/app/components/ui/ThemeIndicator";
import { SoundToggle } from "@/app/components/ui/SoundToggle";
import { Hero } from "@/app/components/sections/Hero";
import { About } from "@/app/components/sections/About";
import { Stack } from "@/app/components/sections/Stack";
import { Projects } from "@/app/components/sections/Projects";
import { Timeline } from "@/app/components/sections/TimeLine";
import { Contact } from "@/app/components/sections/Contact";

export default function Home() {
  return (
    <>
      <ThemeTransition />
      <ThemeIndicator />
      <SoundToggle />
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Timeline />
      <Contact />
    </>
  );
}
