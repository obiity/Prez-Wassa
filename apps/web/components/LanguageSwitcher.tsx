"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

interface LanguageSwitcherProps {
  variant?: "header" | "mobile";
}

export function LanguageSwitcher({ variant = "header" }: LanguageSwitcherProps) {
  const [mounted, setMounted] = useState(false);
  const { language, toggleLanguage, setLanguage } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 md:w-11 md:h-11" />;
  }

  // Mobile layout variant
  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-2 p-1.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full w-full justify-center">
        <button
          onClick={() => setLanguage("fr")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full text-sm font-semibold transition-all ${
            language === "fr"
              ? "bg-brand-primary text-black shadow-glow-primary font-bold"
              : "text-muted hover:text-foreground"
          }`}
        >
          <span>🇫🇷</span>
          <span>Français</span>
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full text-sm font-semibold transition-all ${
            language === "en"
              ? "bg-brand-primary text-black shadow-glow-primary font-bold"
              : "text-muted hover:text-foreground"
          }`}
        >
          <span>🇬🇧</span>
          <span>English</span>
        </button>
      </div>
    );
  }

  const isFr = language === "fr";

  // Header instant toggle with Globe icon + FR/EN badge
  return (
    <button
      onClick={toggleLanguage}
      className="relative flex items-center justify-center gap-1.5 h-9 md:h-11 px-2.5 md:px-3 rounded-full text-black dark:text-white hover:bg-brand-primary/10 hover:text-brand-primary dark:hover:bg-brand-primary/20 dark:hover:text-brand-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary group"
      aria-label="Basculer la langue / Toggle language"
      title={isFr ? "Passer en Anglais (English)" : "Switch to French (Français)"}
    >
      <Globe className="w-5 h-5 md:w-[22px] md:h-[22px] shrink-0 text-black dark:text-white group-hover:text-brand-primary transition-colors" strokeWidth={2} />
      
      <div className="relative w-6 h-4 overflow-hidden flex items-center justify-center">
        <motion.span
          key={language}
          initial={{ y: isFr ? -12 : 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: isFr ? 12 : -12, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-foreground group-hover:text-brand-primary"
        >
          {language.toUpperCase()}
        </motion.span>
      </div>
    </button>
  );
}
