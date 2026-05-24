"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";

// ── TIPOS ──────────────────────────────────────────────────────────────────
export type ThemeId =
  | "default"
  | "retro2000"
  | "western"
  | "cyberpunk"
  | "arcade"
  | "oldfilm"
  | "sketch"
  | "rpg";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  emoji: string;
  description: string;
  soundFile?: string;
  /** Classe CSS adicional no body para efeitos desse tema */
  bodyClass?: string;
}

export interface ThemeContextValue {
  theme: ThemeId;
  themeConfig: ThemeConfig;
  allThemes: ThemeConfig[];
  isTransitioning: boolean;
  isMuted: boolean;
  visitedThemes: Set<ThemeId>;
  switchTheme: (next?: ThemeId) => void;
  toggleMute: () => void;
}

// ── CONFIGURAÇÃO DOS TEMAS ─────────────────────────────────────────────────
export const THEMES: ThemeConfig[] = [
  {
    id: "default",
    name: "Tech Premium",
    emoji: "💻",
    description: "Minimalismo escuro sofisticado",
    soundFile: "/sounds/transition.mp3",
  },
  {
    id: "retro2000",
    name: "Anos 2000",
    emoji: "📟",
    description: "Saudade do Orkut e MSN",
    soundFile: "/sounds/click-retro.mp3",
    bodyClass: "film-grain",
  },
  {
    id: "western",
    name: "Velho Oeste",
    emoji: "🤠",
    description: "O deserto digital te espera",
    soundFile: "/sounds/click-western.mp3",
    bodyClass: "film-grain",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    emoji: "🕶️",
    description: "Hack the planet",
    soundFile: "/sounds/transition.mp3",
    bodyClass: "scanlines-overlay",
  },
  {
    id: "arcade",
    name: "Arcade",
    emoji: "🕹️",
    description: "Insert coin to continue",
    soundFile: "/sounds/blip-arcade.mp3",
  },
  {
    id: "oldfilm",
    name: "Filme Antigo",
    emoji: "🎬",
    description: "Preto e branco. Grão. Nostalgia.",
    soundFile: "/sounds/click-western.mp3",
    bodyClass: "film-grain oldfilm-effect",
  },
  {
    id: "sketch",
    name: "Rabisco",
    emoji: "✏️",
    description: "Como se fosse desenhado à mão.",
    soundFile: "/sounds/blip-arcade.mp3",
  },
  {
    id: "rpg",
    name: "RPG Medieval",
    emoji: "⚔️",
    description: "Desperte o aventureiro interior.",
    soundFile: "/sounds/click-western.mp3",
    bodyClass: "rpg-particles",
  },
];

const THEME_ORDER: ThemeId[] = THEMES.map((t) => t.id);
const DEFAULT_THEME: ThemeId = "default";
const LS_THEME_KEY = "portfolio-theme";
const LS_MUTE_KEY  = "portfolio-muted";
const LS_VISITED_KEY = "portfolio-visited-themes";

// ── CONTEXT ────────────────────────────────────────────────────────────────
const ThemeContext = createContext<ThemeContextValue | null>(null);

// ── PROVIDER ───────────────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [visitedThemes, setVisitedThemes] = useState<Set<ThemeId>>(
    new Set([DEFAULT_THEME])
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Restaurar estado do localStorage (client-only) ─────────────────────
  useEffect(() => {
    const savedTheme   = localStorage.getItem(LS_THEME_KEY) as ThemeId | null;
    const savedMuted   = localStorage.getItem(LS_MUTE_KEY) === "true";
    const savedVisited = localStorage.getItem(LS_VISITED_KEY);

    if (savedTheme && THEME_ORDER.includes(savedTheme)) {
      applyThemeToDOM(savedTheme);
      setTheme(savedTheme);
    }

    setIsMuted(savedMuted);

    if (savedVisited) {
      try {
        const parsed = JSON.parse(savedVisited) as ThemeId[];
        setVisitedThemes(new Set(parsed));
      } catch (_) {
        // ignora JSON inválido
      }
    }
  }, []);

  // ── Aplica o data-theme no DOM sem React re-render extra ──────────────
  function applyThemeToDOM(nextTheme: ThemeId) {
    const html = document.documentElement;
    const body = document.body;

    // Remove classes de efeito de temas anteriores (suporta múltiplas classes separadas por espaço)
    THEMES.forEach((t) => {
      if (t.bodyClass) t.bodyClass.split(" ").forEach((c) => body.classList.remove(c));
    });

    // Aplica o novo tema
    html.setAttribute("data-theme", nextTheme);
    html.classList.add("theme-transition");

    const cfg = THEMES.find((t) => t.id === nextTheme);
    if (cfg?.bodyClass) cfg.bodyClass.split(" ").forEach((c) => body.classList.add(c));

    // Remove classe de transição após animação
    setTimeout(() => html.classList.remove("theme-transition"), 600);
  }

  // ── Toca efeito sonoro do tema ─────────────────────────────────────────
  const playThemeSound = useCallback(
    (themeId: ThemeId) => {
      if (isMuted) return;

      const cfg = THEMES.find((t) => t.id === themeId);
      if (!cfg?.soundFile) return;

      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        const audio = new Audio(cfg.soundFile);
        audio.volume = 0.35;
        audio.play().catch(() => {
          // Autoplay bloqueado — silencia sem erro
        });
        audioRef.current = audio;
      } catch (_) {
        // Audio não suportado
      }
    },
    [isMuted]
  );

  // ── Troca de tema ──────────────────────────────────────────────────────
  const switchTheme = useCallback(
    (next?: ThemeId) => {
      if (isTransitioning) return;

      // Calcula o próximo tema (circular se não especificado)
      const currentIndex = THEME_ORDER.indexOf(theme);
      const nextTheme =
        next ?? THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];

      if (nextTheme === theme) return;

      setIsTransitioning(true);

      // Aguarda o overlay de transição atingir o pico (300ms)
      transitionTimeoutRef.current = setTimeout(() => {
        applyThemeToDOM(nextTheme);
        setTheme(nextTheme);
        playThemeSound(nextTheme);

        // Persiste
        localStorage.setItem(LS_THEME_KEY, nextTheme);

        // Atualiza temas visitados
        setVisitedThemes((prev) => {
          const next = new Set(prev);
          next.add(nextTheme);
          localStorage.setItem(LS_VISITED_KEY, JSON.stringify([...next]));
          return next;
        });

        // Finaliza transição após a saída do overlay (300ms)
        setTimeout(() => setIsTransitioning(false), 350);
      }, 300);
    },
    [theme, isTransitioning, playThemeSound]
  );

  // ── Toggle de mute ─────────────────────────────────────────────────────
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      localStorage.setItem(LS_MUTE_KEY, String(next));
      if (audioRef.current) {
        audioRef.current.muted = next;
      }
      return next;
    });
  }, []);

  // ── Cleanup ────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const themeConfig = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeConfig,
        allThemes: THEMES,
        isTransitioning,
        isMuted,
        visitedThemes,
        switchTheme,
        toggleMute,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// ── HOOK ───────────────────────────────────────────────────────────────────
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme deve ser usado dentro de <ThemeProvider>");
  }
  return ctx;
}