"use client";

import { useRef, useState, MouseEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieCard } from "./MovieCard";
import { useLanguage } from "@/lib/LanguageContext";
import { ContentItem } from "@/types/content";

interface CategoryRowProps {
  title: string;
  tagline?: string;
  movies: ContentItem[];
  aspectRatio?: "video" | "poster";
}

export function CategoryRow({ title, tagline, movies, aspectRatio = "poster" }: CategoryRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth + 100 : scrollLeft + clientWidth - 100;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!rowRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - rowRef.current.offsetLeft);
    setScrollLeft(rowRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !rowRef.current) return;
    e.preventDefault();
    setHasDragged(true);
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    rowRef.current.scrollLeft = scrollLeft - walk;
  };

  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (hasDragged) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div className="w-full relative py-8">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground flex items-center gap-3">
            {title}
          </h2>
          <span className="text-brand-primary text-sm font-sans font-bold cursor-pointer hover:text-brand-hover transition-colors hidden md:block">
            {t.categories.viewAll}
          </span>
        </div>
        {tagline && (
          <p className="text-xs md:text-sm text-brand-primary font-serif italic tracking-wide mt-1">
            {tagline}
          </p>
        )}
      </div>

      <div className="group relative max-w-[1600px] mx-auto">
        <button 
          onClick={() => scroll("left")}
          className={`absolute left-0 top-0 z-40 ${aspectRatio === "video" ? "h-[160px] md:h-[210px]" : "h-[240px] md:h-[330px]"} w-16 bg-gradient-to-r from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-start pl-4 text-foreground cursor-pointer disabled:opacity-0`}
        >
          <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary transition-colors text-black">
            <ChevronLeft size={24} className="dark:text-white" />
          </div>
        </button>

        <div 
          ref={rowRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onClickCapture={onClickCapture}
          className={`flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-12 pt-4 scroll-smooth flex-nowrap ${isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"}`}
          style={{ userSelect: "none" }}
        >
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className={`snap-start scroll-ml-6 md:scroll-ml-12`}
            >
              <MovieCard 
                movie={movie} 
                aspectRatio={aspectRatio}
              />
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll("right")}
          className={`absolute right-0 top-0 z-40 ${aspectRatio === "video" ? "h-[160px] md:h-[210px]" : "h-[240px] md:h-[330px]"} w-16 bg-gradient-to-l from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end pr-4 text-foreground cursor-pointer`}
        >
          <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary transition-colors text-black">
            <ChevronRight size={24} className="dark:text-white" />
          </div>
        </button>
      </div>
    </div>
  );
}
