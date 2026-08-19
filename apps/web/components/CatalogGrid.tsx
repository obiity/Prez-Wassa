"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ContentItem } from "@/types/content";
import { MovieCard } from "./MovieCard";
import { BackButton } from "./BackButton";
import { CategorySlider } from "./CategorySlider";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

interface CatalogGridProps {
  initialItems: ContentItem[];
  title?: string;
  type: "film" | "serie";
}

export function CatalogGrid({ initialItems, title, type }: CatalogGridProps) {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const allLabel = t.catalog.allGenres;
  const initialGenre = searchParams.get("genre") || allLabel;
  const initialRegion = searchParams.get("region") || allLabel;

  const [items, setItems] = useState<ContentItem[]>(initialItems);
  const [genreFilter, setGenreFilter] = useState(initialGenre);
  const [regionFilter, setRegionFilter] = useState(initialRegion);
  const [sortOrder, setSortOrder] = useState(t.catalog.popular);
  
  // Sync state if URL changes
  useEffect(() => {
    if (searchParams.has("genre")) setGenreFilter(searchParams.get("genre") as string);
    if (searchParams.has("region")) setRegionFilter(searchParams.get("region") as string);
  }, [searchParams]);
  
  // Extract unique genres based on current language
  const genres = useMemo(() => {
    const all = new Set<string>();
    initialItems.forEach(item => {
      const itemGenres = language === "en" && item.genres_en ? item.genres_en : item.genres;
      itemGenres.forEach(g => all.add(g));
    });
    return [allLabel, ...Array.from(all).sort()];
  }, [initialItems, allLabel, language]);

  const filteredItems = useMemo(() => {
    let result = [...initialItems];

    if (genreFilter !== allLabel) {
      result = result.filter(item => {
        const itemGenres = language === "en" && item.genres_en ? item.genres_en : item.genres;
        return itemGenres.includes(genreFilter) || item.genres.includes(genreFilter);
      });
    }
    if (regionFilter !== allLabel) {
      result = result.filter(item => item.country === regionFilter);
    }

    if (sortOrder === "A-Z") {
      result.sort((a, b) => {
        const titleA = language === "en" && a.title_en ? a.title_en : a.title;
        const titleB = language === "en" && b.title_en ? b.title_en : b.title;
        return titleA.localeCompare(titleB);
      });
    } else if (sortOrder === t.catalog.newest || sortOrder === "Nouveauté") {
      result.sort((a, b) => (b.year || 0) - (a.year || 0));
    }
    
    return result;
  }, [initialItems, genreFilter, regionFilter, sortOrder, allLabel, t, language]);

  const displayTitle = title || (type === "film" ? t.catalog.moviesTitle : t.catalog.seriesTitle);
  const displaySubtitle = type === "film" ? t.catalog.moviesSubtitle : t.catalog.seriesSubtitle;

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <BackButton className="mb-6" />
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary">{displayTitle}</h1>
          <p className="text-sm md:text-base text-brand-primary font-serif italic tracking-wide mt-2">
            {displaySubtitle}
          </p>
        </div>
        
        {/* Minimal Filters */}
        <div className="sticky top-24 z-40 bg-background/90 backdrop-blur-md py-4 border-b border-border flex flex-wrap gap-6 items-center text-sm font-sans">
          
          <div className="flex-1 min-w-0 flex items-center gap-3">
            <span className="text-muted font-medium uppercase tracking-wider text-xs hidden sm:inline">{t.catalog.genreLabel}</span>
            <CategorySlider 
              items={genres.map(g => ({ id: g, label: g }))}
              activeId={genreFilter}
              onSelect={(id) => setGenreFilter(id)}
              className="flex-1"
            />
          </div>

          <div className="flex gap-2 items-center ml-auto">
            <span className="text-muted font-medium uppercase tracking-wider text-xs">{t.catalog.sortBy}</span>
            <div className="flex gap-4">
              {[t.catalog.popular, t.catalog.newest, "A-Z"].map(s => (
                <button 
                  key={s} 
                  onClick={() => setSortOrder(s)}
                  className={`transition-colors ${sortOrder === s ? "text-brand-primary font-bold" : "text-foreground hover:text-gray-400"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-24 border-t border-white/5 bg-secondary/30 rounded-3xl mt-8">
          <h2 className="text-2xl font-display font-bold mb-4">{t.catalog.noResultsTitle}</h2>
          <p className="text-muted font-sans">{t.catalog.noResultsDesc}</p>
          <button onClick={() => { setGenreFilter(allLabel); setRegionFilter(allLabel); }} className="mt-4 text-brand-primary hover:underline">{t.catalog.resetFilters}</button>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8"
        >
          {filteredItems.map(item => (
            <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MovieCard movie={item} aspectRatio={type === "serie" ? "video" : "poster"} hoverEffect="lift" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
