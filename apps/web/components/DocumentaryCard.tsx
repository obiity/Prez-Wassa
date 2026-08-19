"use client";

import { Play, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { ContentItem } from "@/types/content";
import { useFavorites } from "@/lib/FavoritesContext";
import { useLanguage } from "@/lib/LanguageContext";

interface DocumentaryCardProps {
  movie: ContentItem;
}

export function DocumentaryCard({ movie }: DocumentaryCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { t, language } = useLanguage();
  const favorite = isFavorite(movie.id);
  const isSubRequired = movie.requiresSubscription || movie.isExclusive || movie.isPremium;

  const displayTitle = language === "en" && movie.title_en ? movie.title_en : movie.title;
  const displaySynopsis = language === "en" && movie.synopsis_en ? movie.synopsis_en : movie.synopsis;
  const displayGenre = language === "en" && movie.genres_en && movie.genres_en[0] ? movie.genres_en[0] : movie.genres[0];

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className={`group relative flex-none cursor-pointer rounded-2xl overflow-hidden bg-card shadow-md hover:shadow-2xl transition-all duration-500 ease-out flex flex-col h-full w-full max-w-[400px] ${
      isSubRequired
        ? "border border-brand-primary/80 dark:border-brand-primary shadow-[0_0_10px_rgba(255,106,0,0.2)] hover:border-brand-primary"
        : "border border-border"
    }`}>
      {/* Landscape Image Section - 16:9 */}
      <div className="relative w-full aspect-video bg-secondary overflow-hidden">
        <img 
          src={movie.imageUrl} 
          alt={displayTitle} 
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
        
        {/* Play overlay on image */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link href={`/movie/${movie.id}`} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center hover:scale-110 hover:bg-white transition-all shadow-glow-subtle group/play">
            <Play fill="currentColor" size={20} className="text-white group-hover/play:text-black ml-1" />
          </Link>
        </div>
      </div>

      {/* Persistent Info Section */}
      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between bg-[#1a1a1a] dark:bg-[#121212] border-t border-white/5">
        <div>
          <h3 className="font-display font-bold text-white text-lg md:text-xl mb-2 line-clamp-2">
            {displayTitle}
          </h3>
          <p className="text-sm text-gray-400 font-sans line-clamp-2 mb-4">
            {displaySynopsis}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center flex-wrap gap-2 text-xs font-sans font-medium">
            <span className="text-brand-primary uppercase tracking-wider">{displayGenre}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-300">{movie.duration}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">{movie.year}</span>
          </div>
          
          <button 
            onClick={toggleFavorite}
            className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-colors ml-2 flex-shrink-0"
            title={favorite ? t.movieCard.removeFromList : t.movieCard.addToList}
          >
            {favorite ? <Minus size={16} className="text-white" /> : <Plus size={16} className="text-white" />}
          </button>
        </div>
      </div>
    </div>
  );
}
