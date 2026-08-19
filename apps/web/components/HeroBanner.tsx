"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export interface HeroMovie {
  id: string;
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  imageUrl: string;
  logoUrl?: string;
}

interface HeroBannerProps {
  movies: HeroMovie[];
}

export function HeroBanner({ movies }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { t, language } = useLanguage();

  const slideNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  useEffect(() => {
    if (!movies || movies.length <= 1) return;
    
    const interval = setInterval(() => {
      slideNext();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  const currentMovie = movies[currentIndex];
  if (!currentMovie) return null;

  const displayTitle = (language === "en" && currentMovie.title_en) ? currentMovie.title_en : currentMovie.title;
  const displayDescription = (language === "en" && currentMovie.description_en) ? currentMovie.description_en : currentMovie.description;

  return (
    <motion.div 
      className="relative w-full h-[95vh] flex items-center overflow-hidden bg-background cursor-grab active:cursor-grabbing"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={(e, { offset }) => {
        if (offset.x < -50) {
          slideNext();
        } else if (offset.x > 50) {
          slidePrev();
        }
      }}
    >
      {/* Preload next slide image */}
      <div className="hidden">
        <img src={movies[(currentIndex + 1) % movies.length]?.imageUrl} alt="preload next" />
      </div>

      <AnimatePresence custom={direction}>
        {currentMovie && (
          <motion.div
            key={currentMovie.id}
            custom={direction}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0 origin-center"
          >
            {/* Background Image with Cinematic Gradients */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src={currentMovie.imageUrl} 
                alt={displayTitle} 
                className="w-full h-full object-cover select-none"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent w-[85%]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent"></div>
              <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/60 dark:from-black/60 to-transparent z-0"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full mt-20 pointer-events-none">
        <AnimatePresence mode="wait" custom={direction}>
          {currentMovie && (
            <motion.div 
              key={`content-${currentMovie.id}-${language}`}
              custom={direction}
              initial={{ opacity: 0, x: direction === 1 ? 50 : direction === -1 ? -50 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 1 ? -50 : direction === -1 ? 50 : 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl pointer-events-auto"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-[2px] bg-brand-primary"></span>
                <span className="text-foreground font-sans font-bold tracking-[0.2em] text-xs md:text-sm uppercase drop-shadow-md">
                  {t.hero.featured}
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-display font-bold text-foreground mb-6 leading-[1.1] drop-shadow-xl tracking-tight">
                {displayTitle}
              </h1>
              
              <p className="text-xl md:text-2xl font-sans text-foreground/80 mb-10 line-clamp-3 font-light leading-relaxed max-w-2xl drop-shadow-lg">
                {displayDescription}
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href={`/watch/${currentMovie.id}`} 
                  className="flex items-center justify-center gap-3 bg-brand-primary hover:bg-brand-hover text-black px-10 py-5 rounded-full font-sans font-semibold text-lg transition-all shadow-glow-primary hover:scale-105 active:scale-95"
                >
                  <Play fill="currentColor" size={24} />
                  {t.hero.watch}
                </Link>
                
                <Link 
                  href={`/movie/${currentMovie.id}`}
                  className="flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/20 text-white px-10 py-5 rounded-full font-sans font-semibold text-lg transition-all hover:scale-105 active:scale-95"
                >
                  <Info size={24} />
                  {t.hero.moreInfo}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {movies.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentIndex ? "w-8 bg-brand-primary" : "w-2 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
