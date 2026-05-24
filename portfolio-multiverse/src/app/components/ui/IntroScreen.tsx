"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortalButton } from "./PortalButton";

const INTRO_KEY = "portfolio-intro-seen";

const PHRASES = [
  { text: "Nem todo portfólio deveria ser apenas um site.", delay: 700 },
  { text: "Alguns são portais.", delay: 2100 },
  { text: "Você está prestes a explorar universos criativos instáveis.", delay: 3500 },
];

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

function StarField() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 55 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() > 0.88 ? 2.5 : Math.random() > 0.6 ? 1.5 : 1,
        duration: 3 + Math.random() * 7,
        delay: Math.random() * 9,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0, 0.65, 0.2, 0.9, 0] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export function IntroScreen() {
  const [visible, setVisible] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [visiblePhrases, setVisiblePhrases] = useState<number[]>([]);
  const [showTitle, setShowTitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [glitchFlash, setGlitchFlash] = useState(false);
  const [exitFlash, setExitFlash] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(INTRO_KEY);
    const first = !seen;
    setIsFirstVisit(first);
    setVisible(true);

    const timers: ReturnType<typeof setTimeout>[] = [];

    if (first) {
      PHRASES.forEach((p, i) => {
        timers.push(setTimeout(() => setVisiblePhrases((prev) => [...prev, i]), p.delay));
      });

      // Glitch flash before title
      timers.push(setTimeout(() => setGlitchFlash(true), 4700));
      timers.push(setTimeout(() => setGlitchFlash(false), 4850));

      timers.push(setTimeout(() => setShowTitle(true), 5100));
      timers.push(setTimeout(() => setShowButton(true), 6300));
    } else {
      // Return visit — brief splash
      timers.push(setTimeout(() => setShowTitle(true), 150));
      // Auto-dismiss after 1.6s total
      timers.push(
        setTimeout(() => {
          setExitFlash(true);
          setTimeout(() => setExiting(true), 180);
        }, 1600)
      );
    }

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = () => {
    setExitFlash(true);
    setTimeout(() => {
      setExiting(true);
      localStorage.setItem(INTRO_KEY, "1");
    }, 180);
  };

  if (!visible) return null;

  return (
    <>
      {/* Exit flash — rendered outside AnimatePresence so it's not affected by exit animation */}
      <AnimatePresence>
        {exitFlash && (
          <motion.div
            key="exit-flash"
            className="fixed inset-0 pointer-events-none"
            style={{
              zIndex: 600,
              background:
                "radial-gradient(circle at center, rgba(139,92,246,0.75) 0%, rgba(88,28,135,0.3) 40%, transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence onExitComplete={() => setVisible(false)}>
        {!exiting && (
          <motion.div
            key="intro"
            className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden select-none"
            style={{ zIndex: 500, backgroundColor: "#000" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
          >
            <StarField />

            {/* Purple nebula */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 65% 45% at 50% 55%, rgba(88,28,135,0.18) 0%, transparent 70%)",
              }}
            />

            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.88) 100%)",
              }}
            />

            {/* Glitch flash during first visit */}
            <AnimatePresence>
              {glitchFlash && (
                <motion.div
                  key="glitch"
                  className="absolute inset-0 pointer-events-none z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.22, 0, 0.12, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(139,92,246,0.6), rgba(236,72,153,0.35))",
                  }}
                />
              )}
            </AnimatePresence>

            <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-lg px-6">
              {/* Sequential phrases — first visit only */}
              {isFirstVisit && (
                <div className="flex flex-col gap-3 min-h-[90px] justify-end">
                  {PHRASES.map((phrase, idx) => (
                    <AnimatePresence key={idx}>
                      {visiblePhrases.includes(idx) && (
                        <motion.p
                          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          transition={{ duration: 0.85, ease: "easeOut" }}
                          className={[
                            "font-mono leading-relaxed",
                            idx === 1
                              ? "text-base text-gray-200 font-semibold"
                              : "text-sm text-gray-500",
                          ].join(" ")}
                        >
                          {phrase.text}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  ))}
                </div>
              )}

              {/* Title */}
              <AnimatePresence>
                {showTitle && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, filter: "blur(14px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.95, ease: "easeOut" }}
                    className="flex flex-col items-center gap-2"
                  >
                    <h1
                      className="text-5xl sm:text-6xl font-bold tracking-tight text-white"
                      style={{
                        textShadow: [
                          "0 0 30px rgba(139,92,246,0.9)",
                          "0 0 65px rgba(139,92,246,0.5)",
                          "0 0 110px rgba(139,92,246,0.2)",
                        ].join(", "),
                      }}
                    >
                      Portalfólio
                    </h1>
                    <motion.span
                      className="text-3xl"
                      animate={{ rotate: [0, 8, -8, 8, 0] }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    >
                      🌌
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Portal button — first visit only, requires click */}
              <AnimatePresence>
                {showButton && isFirstVisit && (
                  <motion.div
                    initial={{ opacity: 0, y: 18, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                  >
                    <PortalButton onClick={handleEnter} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hint text */}
              <AnimatePresence>
                {showButton && isFirstVisit && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 1.2 }}
                    className="text-[10px] tracking-[0.3em] uppercase font-mono"
                    style={{ color: "rgba(107,114,128,0.8)" }}
                  >
                    Clique no portal para explorar
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
