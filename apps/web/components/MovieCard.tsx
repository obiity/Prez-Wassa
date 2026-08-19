"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play, Plus, Minus } from "lucide-react";
import { ContentItem } from "@/types/content";
import { useFavorites } from "@/lib/FavoritesContext";
import { useLanguage } from "@/lib/LanguageContext";

interface MovieCardProps {
  movie: ContentItem;
  aspectRatio?: "video" | "poster";
  hoverEffect?: "expand" | "lift";
  onClickOverride?: () => void;
  showRemoveIcon?: boolean;
}

export function MovieCard({ 
  movie, 
  aspectRatio = "poster",
  hoverEffect = "expand",
  onClickOverride,
  showRemoveIcon = false
}: MovieCardProps) {
  const router = useRouter();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { t, language } = useLanguage();
  const favorite = isFavorite(movie.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite || showRemoveIcon) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const isSerie = movie.type === "serie";
  const displayTitle = language === "en" && movie.title_en ? movie.title_en : movie.title;
  const displaySynopsis = language === "en" && movie.synopsis_en ? movie.synopsis_en : movie.synopsis;
  const displayGenres = language === "en" && movie.genres_en ? movie.genres_en : movie.genres;

  const badgeText = movie.isExclusive 
    ? (language === "en" ? "Exclusive" : "Exclusif") 
    : isSerie 
      ? `${movie.seasons || 1} ${t.movieCard.season}s` 
      : movie.duration || (language === "en" ? "Movie" : "Film");

  const navigateToDetails = () => {
    if (onClickOverride) {
      onClickOverride();
      return;
    }
    router.push(`/${movie.type === 'serie' ? 'series' : 'movie'}/${movie.id}`);
  };

  const isSubRequired = movie.requiresSubscription || movie.isExclusive || movie.isPremium;

  const widthHeightClasses = aspectRatio === "video"
    ? "h-[160px] md:h-[210px] w-[260px] md:w-[340px]"
    : "h-[240px] md:h-[330px] w-[160px] md:w-[220px]";

  const baseClasses = `group relative flex-none cursor-pointer rounded-2xl overflow-hidden bg-card shadow-md ${widthHeightClasses} ${
    isSubRequired 
      ? "border border-brand-primary/80 dark:border-brand-primary shadow-[0_0_10px_rgba(255,106,0,0.25)]" 
      : "border border-border"
  }`;
  const expandClasses = aspectRatio === "video"
    ? "transition-[width] duration-500 ease-out hover:shadow-2xl hover:w-[340px] md:hover:w-[460px]"
    : "transition-[width] duration-500 ease-out hover:shadow-2xl hover:w-[320px] md:hover:w-[450px]";
  const liftClasses = "transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(255,106,0,0.2),0_10px_20px_rgba(0,0,0,0.5)] hover:border-brand-primary/60 hover:z-30";

  return (
    <div 
      onClick={navigateToDetails}
      className={`${baseClasses} ${hoverEffect === "expand" ? expandClasses : liftClasses}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-secondary">
        <img 
          src={movie.imageUrl} 
          alt={displayTitle} 
          draggable={false}
          className="w-full h-full object-cover object-top md:object-center filter-none transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Persistent subtle gradient */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none"></div>
      
      {/* Dark gradient for bottom title */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10 pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>

      {/* Permanent SÉRIE Badge */}
      {isSerie && (
        <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10 px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/20">
          <span className="text-[10px] md:text-xs font-sans font-bold tracking-wider text-white">{t.movieCard.serie}</span>
        </div>
      )}

      {/* Permanent Title & Metadata Block */}
      <div className="absolute bottom-0 inset-x-0 p-2.5 md:p-3.5 z-10 flex flex-col justify-end pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="font-display font-bold text-white text-xs md:text-sm line-clamp-1 leading-tight drop-shadow-md mb-1">
          {displayTitle}
        </h3>
        <div className="flex items-center justify-between text-[9px] md:text-[10px] font-sans font-medium text-gray-300">
          <span>{movie.year}</span>
          <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded border border-white/20 text-white font-sans">
            {badgeText}
          </span>
        </div>
      </div>

      {/* Hover Overlay with Metadata */}
      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end">
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black via-black/80 to-transparent"></div>

        <div className="relative p-4 md:p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 flex flex-col w-full h-full justify-end">
          
          <div className={`flex ${hoverEffect === 'expand' ? 'items-end justify-between' : 'flex-col justify-end'} mb-3`}>
            <div className={`flex-1 min-w-0 ${hoverEffect === 'expand' ? 'pr-4' : 'mb-3'}`}>
              <h3 className={`font-display font-bold text-white ${hoverEffect === 'expand' ? 'text-xl md:text-2xl' : 'text-lg whitespace-normal leading-tight'} mb-1 md:mb-2 ${hoverEffect === 'expand' ? 'truncate' : 'line-clamp-2'} drop-shadow-md`}>
                {displayTitle}
              </h3>
              
              <div className="flex items-center flex-wrap gap-1.5 md:gap-2 text-[9px] md:text-[10px] font-sans font-medium mb-1 opacity-90">
                <span className="text-white border border-white/40 px-1 rounded-sm">{movie.classification}</span>
                <span className="text-gray-300">{movie.year}</span>
                <span className="text-gray-300">{badgeText}</span>
                {hoverEffect === "expand" && (
                  <span className="text-brand-primary hidden md:inline-block">{displayGenres.join(", ")}</span>
                )}
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center gap-2">
              <button 
                onClick={toggleFavorite}
                className="w-8 h-8 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors"
                title={favorite ? t.movieCard.removeFromList : t.movieCard.addToList}
              >
                {favorite || showRemoveIcon ? <Minus size={16} className="text-white" /> : <Plus size={16} className="text-white" />}
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/watch/${movie.id}${movie.type === 'serie' ? '-e1' : ''}`);
                }}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-all shadow-glow-subtle"
                title={t.movieCard.watch}
              >
                <Play fill="currentColor" size={14} className="text-black ml-0.5" />
              </button>
            </div>
          </div>

          {hoverEffect === "expand" && (
            <p className="text-xs md:text-sm text-gray-300 line-clamp-2 font-sans mb-3 md:mb-4">
              {displaySynopsis}
            </p>
          )}

          {/* Episode Strip for Series */}
          {isSerie && movie.episodes && hoverEffect === "expand" && (
            <div className="mt-auto border-t border-white/10 pt-3">
              <span className="text-[10px] text-gray-400 font-sans uppercase tracking-wider mb-2 block">{t.movieCard.season} 1</span>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide snap-x">
                {movie.episodes.map((ep) => {
                  const epTitle = language === "en" && ep.title_en ? ep.title_en : ep.title;
                  return (
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/watch/${movie.id}-${ep.id}`);
                      }}
                      key={ep.id} 
                      className="relative group/ep flex-none w-[100px] md:w-[130px] aspect-video rounded overflow-hidden snap-start border border-transparent hover:border-brand-primary transition-colors cursor-pointer"
                    >
                      <img src={ep.imageUrl} alt={epTitle} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/ep:opacity-100 transition-opacity">
                        <Play fill="currentColor" size={16} className="text-white" />
                      </div>
                      <div className="absolute bottom-1 left-1 text-[9px] font-bold bg-black/60 px-1 rounded text-white backdrop-blur-sm">
                        E{ep.num}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
