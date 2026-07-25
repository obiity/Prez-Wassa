"use client";

import { Play, Plus, Minus, Info, ChevronDown } from "lucide-react";
import Link from "next/link";
import { ContentItem } from "@/types/content";
import { useFavorites } from "@/lib/FavoritesContext";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  movie: ContentItem;
  aspectRatio?: "video" | "poster";
  showRemoveIcon?: boolean;
  hoverEffect?: "expand" | "lift";
  onClickOverride?: () => void;
}

export function MovieCard({ movie, aspectRatio = "poster", showRemoveIcon = false, hoverEffect = "expand", onClickOverride }: MovieCardProps) {
  const router = useRouter();
  const isSerie = movie.type === "serie";
  const badgeText = isSerie ? (movie.progress || `${movie.seasons} Saison${movie.seasons && movie.seasons > 1 ? 's' : ''}`) : movie.duration;

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const navigateToDetails = () => {
    if (onClickOverride) {
      onClickOverride();
      return;
    }
    router.push(`/${movie.type === 'serie' ? 'series' : 'movie'}/${movie.id}`);
  };

  const isSubRequired = movie.requiresSubscription || movie.isExclusive || movie.isPremium;

  const baseClasses = `group relative flex-none cursor-pointer rounded-2xl overflow-hidden bg-card shadow-md h-[240px] md:h-[330px] w-[160px] md:w-[220px] ${
    isSubRequired 
      ? "border border-brand-primary/80 dark:border-brand-primary shadow-[0_0_10px_rgba(255,106,0,0.25)]" 
      : "border border-border"
  }`;
  const expandClasses = "transition-[width] duration-500 ease-out hover:shadow-2xl hover:w-[320px] md:hover:w-[450px]";
  const liftClasses = "transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(255,106,0,0.2),0_10px_20px_rgba(0,0,0,0.5)] hover:border-brand-primary/60 hover:z-30";

  return (
    <div 
      onClick={navigateToDetails}
      className={`${baseClasses} ${hoverEffect === "expand" ? expandClasses : liftClasses}`}
    >
      {/* Background Image - Clean poster thumbnail with filter-none */}
      <div className="absolute inset-0 z-0 bg-secondary">
        <img 
          src={movie.imageUrl} 
          alt={movie.title} 
          draggable={false}
          className="w-full h-full object-cover object-top md:object-center filter-none transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Persistent subtle gradient for readability of permanent badges */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>

      {/* Permanent SÉRIE Badge (Top Left) */}
      {isSerie && (
        <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10 px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/20">
          <span className="text-[10px] md:text-xs font-sans font-bold tracking-wider text-white">SÉRIE</span>
        </div>
      )}

      {/* Permanent Season Count / Duration Indicator (Bottom Right before hover) */}
      <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 z-10 px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/20 group-hover:opacity-0 transition-opacity duration-300">
        <span className="text-[10px] md:text-xs font-sans font-medium text-white">{badgeText}</span>
      </div>

      {/* Hover Overlay with Metadata */}
      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end">
        {/* Full gradient scrim on hover to cover the image for text/episodes readability */}
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black via-black/80 to-transparent"></div>

        <div className="relative p-4 md:p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 flex flex-col w-full h-full justify-end">
          
          <div className={`flex ${hoverEffect === 'expand' ? 'items-end justify-between' : 'flex-col justify-end'} mb-3`}>
            <div className={`flex-1 min-w-0 ${hoverEffect === 'expand' ? 'pr-4' : 'mb-3'}`}>
              <h3 className={`font-display font-bold text-white ${hoverEffect === 'expand' ? 'text-xl md:text-2xl' : 'text-lg whitespace-normal leading-tight'} mb-1 md:mb-2 ${hoverEffect === 'expand' ? 'truncate' : 'line-clamp-2'} drop-shadow-md`}>
                {movie.title}
              </h3>
              
              <div className="flex items-center flex-wrap gap-1.5 md:gap-2 text-[9px] md:text-[10px] font-sans font-medium mb-1 opacity-90">
                <span className="text-white border border-white/40 px-1 rounded-sm">{movie.classification}</span>
                <span className="text-gray-300">{movie.year}</span>
                <span className="text-gray-300">{badgeText}</span>
                {hoverEffect === "expand" && (
                  <span className="text-brand-primary hidden md:inline-block">{movie.genres.join(", ")}</span>
                )}
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center gap-2">
              <button 
                onClick={toggleFavorite}
                className="w-8 h-8 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors"
                title={favorite ? "Retirer de Ma Liste" : "Ajouter à Ma Liste"}
              >
                {favorite || showRemoveIcon ? <Minus size={16} className="text-white" /> : <Plus size={16} className="text-white" />}
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/watch/${movie.id}${movie.type === 'serie' ? '-e1' : ''}`);
                }}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-all shadow-glow-subtle"
              >
                <Play fill="currentColor" size={14} className="text-black ml-0.5" />
              </button>
            </div>
          </div>

          {hoverEffect === "expand" && (
            <p className="text-xs md:text-sm text-gray-300 line-clamp-2 font-sans mb-3 md:mb-4">
              {movie.synopsis}
            </p>
          )}

          {/* Episode Strip for Series - Only show in expand mode to avoid squishing */}
          {isSerie && movie.episodes && hoverEffect === "expand" && (
            <div className="mt-auto border-t border-white/10 pt-3">
              <span className="text-[10px] text-gray-400 font-sans uppercase tracking-wider mb-2 block">Saison 1</span>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide snap-x">
                {movie.episodes.map((ep) => (
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/watch/${movie.id}-${ep.id}`);
                    }}
                    key={ep.id} 
                    className="relative group/ep flex-none w-[100px] md:w-[130px] aspect-video rounded overflow-hidden snap-start border border-transparent hover:border-brand-primary transition-colors cursor-pointer"
                  >
                    <img src={ep.imageUrl} alt={ep.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/ep:opacity-100 transition-opacity">
                      <Play fill="currentColor" size={16} className="text-white" />
                    </div>
                    {/* Ep Number */}
                    <div className="absolute bottom-1 left-1 text-[9px] font-bold bg-black/60 px-1 rounded text-white backdrop-blur-sm">
                      E{ep.num}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
