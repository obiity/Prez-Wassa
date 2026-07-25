"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MovieCard } from "@/components/MovieCard";
import { BackButton } from "@/components/BackButton";
import { EXCLUSIVES_MOVIES, TRENDING_MOVIES, CLASSIC_MOVIES, WASSA_SERIES, NOLLYWOOD_MOVIES, IVOIRIAN_MOVIES, MALIAN_MOVIES, NORTH_AFRICAN_MOVIES, PANAFRICAN_MOVIES } from "@/lib/data";
import { ContentItem } from "@/types/content";

const ALL_CONTENT = [
  ...EXCLUSIVES_MOVIES,
  ...TRENDING_MOVIES,
  ...CLASSIC_MOVIES,
  ...WASSA_SERIES,
  ...NOLLYWOOD_MOVIES,
  ...IVOIRIAN_MOVIES,
  ...MALIAN_MOVIES,
  ...NORTH_AFRICAN_MOVIES,
  ...PANAFRICAN_MOVIES
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Advanced filters state
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [region, setRegion] = useState("");

  const results = useMemo(() => {
    if (!query && !director && !year && !region) return null; // null means show default state
    
    return ALL_CONTENT.filter(item => {
      let matches = true;
      
      if (query) {
        const q = query.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesActors = item.actors?.some(a => a.toLowerCase().includes(q));
        const matchesGenres = item.genres.some(g => g.toLowerCase().includes(q));
        matches = matches && (matchesTitle || !!matchesActors || matchesGenres);
      }
      
      if (director) {
        matches = matches && !!item.director?.toLowerCase().includes(director.toLowerCase());
      }
      
      if (year) {
        matches = matches && item.year?.toString() === year;
      }
      
      if (region) {
        matches = matches && item.country?.toLowerCase() === region.toLowerCase();
      }
      
      return matches;
    });
  }, [query, director, year, region]);

  return (
    <>
      <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto flex flex-col items-center">
      
      <div className="w-full mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <BackButton className="mb-6" />
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary mb-2">Recherche</h1>
          <p className="text-xl text-muted font-sans font-light">
            Trouvez vos films, séries et acteurs préférés.
          </p>
        </div>
      </div>

      {/* Search Input Area */}
      <div className={`w-full max-w-4xl transition-all duration-500 ${results === null ? "mt-[20vh]" : "mt-0 mb-12"}`}>
        <div className="relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="h-8 w-8 text-muted group-focus-within:text-brand-primary transition-colors" />
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Films, séries, acteurs, réalisateurs..."
            className="w-full bg-secondary/50 border border-white/10 text-white text-2xl md:text-4xl font-display rounded-full py-6 pl-20 pr-16 outline-none focus:bg-secondary focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/20 transition-all placeholder:text-muted/50"
            autoFocus
          />
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute inset-y-0 right-4 flex items-center justify-center w-12 h-12 rounded-full my-auto transition-colors ${showFilters ? "bg-brand-primary text-black" : "text-muted hover:text-white"}`}
            aria-label="Filtres"
          >
            <SlidersHorizontal className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full max-w-4xl overflow-hidden mb-12"
          >
            <div className="bg-secondary/30 border border-border rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-bold">Réalisateur</label>
                <input type="text" value={director} onChange={e => setDirector(e.target.value)} className="w-full bg-black/50 border border-border rounded-lg px-4 py-2 text-white outline-none focus:border-brand-primary" placeholder="Ex: Sembène" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-bold">Année</label>
                <input type="number" value={year} onChange={e => setYear(e.target.value)} className="w-full bg-black/50 border border-border rounded-lg px-4 py-2 text-white outline-none focus:border-brand-primary" placeholder="Ex: 2023" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-2 font-bold">Pays/Région</label>
                <select value={region} onChange={e => setRegion(e.target.value)} className="w-full bg-black/50 border border-border rounded-lg px-4 py-2 text-white outline-none focus:border-brand-primary appearance-none">
                  <option value="">Tous</option>
                  <option value="Sénégal">Sénégal</option>
                  <option value="Nigeria">Nollywood (Nigeria)</option>
                  <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                  <option value="Mali">Mali</option>
                  <option value="Maroc">Maroc (Afrique du Nord)</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Area */}
      <div className="w-full">
        {results === null ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center opacity-70">
            <h2 className="text-xl font-display text-muted mb-8 text-center">Titres Tendances</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 w-full">
              {TRENDING_MOVIES.slice(0, 6).map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </motion.div>
        ) : results.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="w-full py-32 mt-12 flex flex-col items-center justify-center text-center bg-secondary/30 rounded-3xl border border-white/5 relative overflow-hidden"
          >
            {/* Bogolan Motif Background */}
            <div className="absolute inset-0 z-0 senegal-pattern opacity-10 pointer-events-none mix-blend-overlay"></div>
            
            <div className="relative z-10 max-w-lg px-6">
              <h2 className="text-3xl font-serif font-bold mb-4">Aucun résultat trouvé</h2>
              <p className="text-lg text-muted font-sans font-light">
                Nous n'avons trouvé aucun film ou série correspondant à "{query}".
                Essayez de modifier vos termes de recherche ou vos filtres.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-12"
          >
            {results.map(item => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <MovieCard movie={item} aspectRatio={item.type === "serie" ? "video" : "poster"} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

    </main>
    </>
  );
}
