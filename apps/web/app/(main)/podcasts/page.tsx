"use client";

import { useState } from "react";
import { Mic2, Play, Pause, Clock, Radio } from "lucide-react";
import { ContentItem } from "@/types/content";
import { BackButton } from "@/components/BackButton";
import { WASSA_PODCASTS } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

export default function PodcastsPage() {
  const [activePodcast, setActivePodcast] = useState<ContentItem>(WASSA_PODCASTS[0] as ContentItem);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("Tous");
  const { t, language } = useLanguage();

  const togglePlay = (podcast: ContentItem) => {
    if (activePodcast?.id === podcast.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActivePodcast(podcast);
      setIsPlaying(true);
    }
  };

  const filteredPodcasts = selectedGenre === "Tous" || selectedGenre === "All"
    ? WASSA_PODCASTS
    : WASSA_PODCASTS.filter((p: ContentItem) => {
        const genres = language === "en" && p.genres_en ? p.genres_en : p.genres;
        return genres.includes(selectedGenre);
      });

  const activeTitle = language === "en" && activePodcast.title_en ? activePodcast.title_en : activePodcast.title;
  const activeSynopsis = language === "en" && activePodcast.synopsis_en ? activePodcast.synopsis_en : activePodcast.synopsis;

  return (
    <main className="min-h-screen bg-background text-foreground pt-28 pb-24 px-4 sm:px-6 md:px-12 transition-colors duration-300 max-w-[1600px] mx-auto">
      
      {/* Header with BackButton */}
      <div className="mb-10">
        <BackButton className="mb-4" />
        <div className="flex items-center gap-3">
          <Mic2 className="w-8 h-8 text-brand-primary" />
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">{t.podcasts.title}</h1>
        </div>
        <p className="text-muted font-sans text-base md:text-lg max-w-2xl mt-2">
          {t.podcasts.subtitle}
        </p>
      </div>

      {/* Hero Featured Podcast Player */}
      {activePodcast && (
        <div className="relative rounded-3xl overflow-hidden bg-secondary border border-white/10 shadow-2xl p-6 sm:p-10 mb-14">
          <div className="absolute inset-0 z-0 senegal-pattern opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 lg:gap-12">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-2xl shrink-0 border border-white/20">
              <img 
                src={activePodcast.imageUrl} 
                alt={activeTitle}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button 
                  onClick={() => togglePlay(activePodcast)}
                  className="w-16 h-16 rounded-full bg-brand-primary text-black flex items-center justify-center shadow-glow-primary hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  aria-label={isPlaying ? "Pause" : t.podcasts.listen}
                >
                  {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white">
                  WASSA Audio
                </span>
                <span className="text-xs text-muted flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {activePodcast.audioDuration}
                </span>
                <span className="text-xs text-brand-primary font-medium">
                  {activePodcast.episodesCount} {t.podcasts.episodes}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
                {activeTitle}
              </h2>
              
              <p className="text-brand-primary font-medium text-sm md:text-base mb-4">
                {activePodcast.host}
              </p>

              <p className="text-gray-300 font-sans text-sm md:text-base max-w-2xl leading-relaxed mb-6">
                {activeSynopsis}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <button 
                  onClick={() => togglePlay(activePodcast)}
                  className="px-8 py-3.5 rounded-full bg-brand-primary hover:bg-brand-hover text-black font-extrabold text-sm uppercase tracking-wider shadow-glow-primary flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" /> {t.podcasts.listen}
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 text-xs text-muted font-mono bg-black/40 px-4 py-3 rounded-full border border-white/5">
                  <Radio className="w-4 h-4 text-brand-primary animate-pulse" />
                  <span>Format Audio HD 320 kbps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Podcasts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPodcasts.map((podcast: ContentItem) => {
          const isCurrentActive = activePodcast?.id === podcast.id;
          const isCurrentlyPlaying = isCurrentActive && isPlaying;
          const podTitle = language === "en" && podcast.title_en ? podcast.title_en : podcast.title;
          const podSynopsis = language === "en" && podcast.synopsis_en ? podcast.synopsis_en : podcast.synopsis;
          const podGenres = language === "en" && podcast.genres_en ? podcast.genres_en : podcast.genres;

          return (
            <div 
              key={podcast.id}
              onClick={() => setActivePodcast(podcast)}
              className={`group relative rounded-2xl bg-card border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between p-6 ${
                isCurrentActive 
                  ? "border-brand-primary shadow-[0_0_20px_rgba(255,106,0,0.25)] bg-brand-primary/5" 
                  : "border-white/10 hover:border-white/20 hover:bg-secondary/40"
              }`}
            >
              <div className="flex gap-5 items-start mb-4">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <img 
                    src={podcast.imageUrl} 
                    alt={podTitle} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); togglePlay(podcast); }}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-primary text-black flex items-center justify-center shadow-lg">
                      {isCurrentlyPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </div>
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {podGenres.map((g: string) => (
                      <span key={g} className="text-[10px] uppercase font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">
                        {g}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white truncate group-hover:text-brand-primary transition-colors">
                    {podTitle}
                  </h3>
                  <p className="text-xs text-muted mb-2">{podcast.host}</p>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1"><Clock size={12} /> {podcast.audioDuration}</span>
                    <span>•</span>
                    <span>{podcast.episodesCount} {t.podcasts.episodes}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-300 font-sans line-clamp-2 leading-relaxed mb-4">
                {podSynopsis}
              </p>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <button 
                  onClick={(e) => { e.stopPropagation(); togglePlay(podcast); }}
                  className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  {isCurrentlyPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> {t.podcasts.listen}
                    </>
                  )}
                </button>
                <span className="text-[10px] text-muted uppercase font-mono">Audio HD</span>
              </div>
            </div>
          );
        })}
      </div>

    </main>
  );
}
