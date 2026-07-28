"use client";

import { useState } from "react";
import { Mic, Play, Pause, Headphones, Radio, Sparkles, Volume2, Clock } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { WASSA_PODCASTS } from "@/lib/data";
import { ContentItem } from "@/types/content";

export default function PodcastsPage() {
  const [activePodcast, setActivePodcast] = useState<ContentItem | null>(WASSA_PODCASTS[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>("Tous");

  const genres = ["Tous", "Culture", "Histoire", "Société", "Débat", "Cinéma", "Technologie"];

  const filteredPodcasts = selectedGenre === "Tous" 
    ? WASSA_PODCASTS 
    : WASSA_PODCASTS.filter(p => p.genres.includes(selectedGenre));

  const togglePlay = (podcast: ContentItem) => {
    if (activePodcast?.id === podcast.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActivePodcast(podcast);
      setIsPlaying(true);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-32 px-6 md:px-12 max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="mb-12">
        <BackButton className="mb-6" />
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-gradient-to-r from-[#FF8A00] via-[#FF6A00] to-[#E65100] text-black font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-glow-primary">
            <Mic className="w-3.5 h-3.5 stroke-[2.5]" />
            Nouveau sur WASSA
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary mb-4">
          Podcasts Sénégalais & Africains
        </h1>
        <p className="text-lg md:text-xl text-muted font-sans font-light max-w-3xl">
          Écoutez les voix, les débats, la culture et la musique du Sénégal partout où vous allez. Une immersion sonore authentique.
        </p>
      </div>

      {/* Hero Featured Podcast Player Banner */}
      {activePodcast && (
        <div className="relative rounded-3xl overflow-hidden mb-16 bg-gradient-to-r from-[#181818] via-[#121212] to-[#1a120b] border border-white/10 p-8 md:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full filter blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
              <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl shrink-0 group border border-white/10">
                <img 
                  src={activePodcast.imageUrl} 
                  alt={activePodcast.title}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button 
                    onClick={() => togglePlay(activePodcast)}
                    className="w-16 h-16 rounded-full bg-brand-primary text-black flex items-center justify-center shadow-glow-primary hover:scale-110 active:scale-95 transition-transform"
                    aria-label={isPlaying ? "Mettre en pause" : "Écouter le podcast"}
                  >
                    {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white">
                    Podcast WASSA
                  </span>
                  <span className="text-xs text-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {activePodcast.audioDuration}
                  </span>
                  <span className="text-xs text-brand-primary font-medium">
                    {activePodcast.episodesCount} Épisodes
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
                  {activePodcast.title}
                </h2>
                
                <p className="text-brand-primary font-medium text-sm md:text-base mb-4">
                  Présenté par {activePodcast.host}
                </p>

                <p className="text-gray-300 font-sans text-sm md:text-base max-w-2xl leading-relaxed mb-6">
                  {activePodcast.synopsis}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <button 
                    onClick={() => togglePlay(activePodcast)}
                    className="px-8 py-3.5 rounded-full bg-brand-primary hover:bg-brand-hover text-black font-extrabold text-sm uppercase tracking-wider shadow-glow-primary flex items-center gap-2 transition-all hover:scale-105"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" /> En lecture
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" /> Écouter maintenant
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
        </div>
      )}

      {/* Genre Filter Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all shrink-0 ${
              selectedGenre === genre
                ? "bg-brand-primary text-black font-bold shadow-glow-primary"
                : "bg-secondary/60 hover:bg-secondary text-muted hover:text-foreground border border-white/5"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Podcasts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPodcasts.map((podcast) => {
          const isCurrentActive = activePodcast?.id === podcast.id;
          const isCurrentlyPlaying = isCurrentActive && isPlaying;

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
                    alt={podcast.title} 
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
                    {podcast.genres.map(g => (
                      <span key={g} className="text-[10px] uppercase font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">
                        {g}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white truncate group-hover:text-brand-primary transition-colors">
                    {podcast.title}
                  </h3>
                  <p className="text-xs text-muted mb-2">Par {podcast.host}</p>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1"><Clock size={12} /> {podcast.audioDuration}</span>
                    <span>•</span>
                    <span>{podcast.episodesCount} épisodes</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-300 font-sans line-clamp-2 leading-relaxed mb-4">
                {podcast.synopsis}
              </p>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <button 
                  onClick={(e) => { e.stopPropagation(); togglePlay(podcast); }}
                  className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1.5"
                >
                  {isCurrentlyPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Écouter l'émission
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
