"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

export function SoundToggle() {
  const { isMuted, toggleMute } = useTheme();

  return (
    <motion.button
      onClick={toggleMute}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      title={isMuted ? "Ativar som" : "Desativar som"}
      aria-label={isMuted ? "Ativar som" : "Desativar som"}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-colors duration-200 cursor-pointer"
    >
      <motion.span
        key={String(isMuted)}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </motion.span>
    </motion.button>
  );
}
