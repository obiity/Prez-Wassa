"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ContentItem } from "@/types/content";
import { MovieCard } from "./MovieCard";
import { BackButton } from "./BackButton";
import { CategorySlider } from "./CategorySlider";
import { motion } from "framer-motion";

interface CatalogGridProps {
  initialItems: ContentItem[];
  title: string;
  type: "film" | "serie";
}

export function CatalogGrid({ initialItems, title, type }: CatalogGridProps) {
  const searchParams = useSearchParams();
  const initialGenre = searchParams.get("genre") || "Tous";
  const initialRegion = searchParams.get("region") || "Tous";

  const [items, setItems] = useState<ContentItem[]>(initialItems);
  const [genreFilter, setGenreFilter] = useState(initialGenre);
  const [regionFilter, setRegionFilter] = useState(initialRegion);
  const [sortOrder, setSortOrder] = useState("Populaire");
  
  // Sync state if URL changes (useful for back navigation)
  useEffect(() => {
    if (searchParams.has("genre")) setGenreFilter(searchParams.get("genre") as string);
    if (searchParams.has("region")) setRegionFilter(searchParams.get("region") as string);
  }, [searchParams]);
  
  // Extract unique genres and regions
  const genres = useMemo(() => {
    const all = new Set<string>();
    initialItems.forEach(item => item.genres.forEach(g => all.add(g)));
    return ["Tous", ...Array.from(all).sort()];
  }, [initialItems]);

  const regions = useMemo(() => {
    const all = new Set<string>();
    initialItems.forEach(item => { if (item.country) all.add(item.country) });
    return ["Tous", ...Array.from(all).sort()];
  }, [initialItems]);

  const filteredItems = useMemo(() => {
    let result = [...initialItems];

    if (genreFilter !== "Tous") {
      result = result.filter(item => item.genres.includes(genreFilter));
    }
    if (regionFilter !== "Tous") {
      result = result.filter(item => item.country === regionFilter);
    }

    if (sortOrder === "A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "Nouveauté") {
      result.sort((a, b) => (b.year || 0) - (a.year || 0));
    }
    // "Populaire" is default mock order
    
    return result;
  }, [initialItems, genreFilter, regionFilter, sortOrder]);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <BackButton className="mb-6" />
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary">{title}</h1>
          <p className="text-sm md:text-base text-brand-primary font-serif italic tracking-wide mt-2">
            {type === "film" 
              ? "Tout le catalogue du cinéma sénégalais et africain réuni sur WASSA" 
              : "Les grandes sagas dramatiques et comédies captivantes d'Afrique"}
          </p>
        </div>
        
        {/* Minimal Filters */}
        <div className="sticky top-24 z-40 bg-background/90 backdrop-blur-md py-4 border-b border-border flex flex-wrap gap-6 items-center text-sm font-sans">
          
          <div className="flex-1 min-w-0 flex items-center gap-3">
            <span className="text-muted font-medium uppercase tracking-wider text-xs hidden sm:inline">Genre</span>
            <CategorySlider 
              items={genres.map(g => ({ id: g, label: g }))}
              activeId={genreFilter}
              onSelect={(id) => setGenreFilter(id)}
              className="flex-1"
            />
          </div>

          <div className="flex gap-2 items-center ml-auto">
            <span className="text-muted font-medium uppercase tracking-wider text-xs">Trier par</span>
            <div className="flex gap-4">
              {["Populaire", "Nouveauté", "A-Z"].map(s => (
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
          <h2 className="text-2xl font-display font-bold mb-4">Aucun résultat trouvé</h2>
          <p className="text-muted font-sans">Essayez de modifier vos filtres pour voir plus de contenu.</p>
          <button onClick={() => { setGenreFilter("Tous"); setRegionFilter("Tous"); }} className="mt-4 text-brand-primary hover:underline">Réinitialiser les filtres</button>
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
