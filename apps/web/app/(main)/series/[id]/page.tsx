"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Play, Film, Plus, ThumbsUp, Share2 } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { TrailerModal } from "@/components/TrailerModal";
import { useLanguage } from "@/lib/LanguageContext";
import { WASSA_SERIES } from "@/lib/data";

export default function SeriesDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const serie = WASSA_SERIES.find((s) => s.id === resolvedParams.id);
  const [activeTab, setActiveTab] = useState<'episodes' | 'details'>('episodes');
  const [showTrailer, setShowTrailer] = useState(false);
  const { t, language } = useLanguage();

  if (!serie) {
    notFound();
  }

  const displayTitle = language === "en" && serie.title_en ? serie.title_en : serie.title;
  const displaySynopsis = language === "en" && serie.synopsis_en ? serie.synopsis_en : serie.synopsis;
  const displayGenres = language === "en" && serie.genres_en ? serie.genres_en : serie.genres;

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 relative">
      {/* Cinematic Backdrop */}
      <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-background">
        <div className="absolute top-32 left-6 md:left-12 z-20">
          <BackButton />
        </div>
        <div className="absolute inset-0 z-0">
          <img 
            src={serie.imageUrl} 
            alt={displayTitle} 
            className="w-full h-full object-cover scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent w-full md:w-[75%] transition-colors duration-500"></div>
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/70 to-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 dark:from-black/60 to-transparent z-0 transition-colors duration-500"></div>
        </div>

        {/* Hero Metadata */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full h-full flex flex-col justify-end pb-12 md:pb-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-8xl font-display font-bold text-foreground mb-4 leading-tight drop-shadow-2xl uppercase">
              {displayTitle}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm md:text-base font-sans font-medium text-muted mb-6">
              <span className="text-brand-text font-bold">98% {t.detail.match}</span>
              <span>{serie.year || "2024"}</span>
              <span className="border border-border bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded text-foreground">{serie.seasons || 1} {t.movieCard.season}s</span>
              <span className="border border-border bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded text-foreground">4K Ultra HD</span>
              <span>{displayGenres.join(", ")}</span>
            </div>

            <p className="text-lg md:text-xl font-sans text-muted mb-8 line-clamp-3 md:line-clamp-4 font-light leading-relaxed max-w-2xl">
              {displaySynopsis}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href={`/watch/${serie.id}-s1e1`}
                className="flex items-center justify-center gap-3 bg-brand-primary hover:bg-brand-hover text-black px-10 py-4 rounded-full font-sans font-semibold text-lg transition-all shadow-glow-primary hover:scale-105 active:scale-95"
              >
                <Play fill="currentColor" size={24} />
                {t.detail.watchSeason1}
              </Link>

              <button 
                onClick={() => setShowTrailer(true)}
                className="flex items-center justify-center gap-2.5 bg-black/40 hover:bg-black/60 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white px-7 py-4 rounded-full font-sans font-semibold text-base md:text-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Film size={22} className="text-brand-primary" />
                {t.detail.trailer}
              </button>
              
              <button 
                className="w-14 h-14 rounded-full border border-border bg-black/10 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-black/20 dark:hover:bg-white/20 transition-all hover:scale-105 text-foreground"
                aria-label={t.detail.addToList}
              >
                <Plus size={28} />
              </button>

              <button 
                className="w-14 h-14 rounded-full border border-border bg-black/10 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-black/20 dark:hover:bg-white/20 transition-all hover:scale-105 text-foreground"
                aria-label={t.detail.rate}
              >
                <ThumbsUp size={24} />
              </button>

              <button 
                className="w-14 h-14 rounded-full border border-border bg-black/10 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-black/20 dark:hover:bg-white/20 transition-all hover:scale-105 text-foreground"
                aria-label={t.detail.share}
              >
                <Share2 size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <TrailerModal 
        isOpen={showTrailer} 
        onClose={() => setShowTrailer(false)} 
        title={displayTitle} 
        posterUrl={serie.imageUrl} 
      />

      {/* Details & Episodes Section */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-secondary/80 border border-border/60 backdrop-blur-md mb-8 shadow-sm">
          <button 
            className={`px-6 py-2.5 rounded-full font-sans font-bold text-sm transition-all cursor-pointer ${activeTab === 'episodes' ? 'bg-brand-primary text-black shadow-glow-subtle' : 'text-muted hover:text-foreground'}`}
            onClick={() => setActiveTab('episodes')}
          >
            {t.detail.episodesTab}
          </button>
          <button 
            className={`px-6 py-2.5 rounded-full font-sans font-bold text-sm transition-all cursor-pointer ${activeTab === 'details' ? 'bg-brand-primary text-black shadow-glow-subtle' : 'text-muted hover:text-foreground'}`}
            onClick={() => setActiveTab('details')}
          >
            {t.detail.detailsTab}
          </button>
        </div>

        {activeTab === 'episodes' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-display font-semibold">{t.detail.season} 1</h3>
              {serie.seasons && serie.seasons > 1 && (
                <select className="bg-secondary border border-border text-foreground font-sans rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer">
                  {Array.from({ length: serie.seasons }).map((_, i) => (
                    <option key={i}>{t.detail.season} {i + 1}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Episode List */}
            {serie.episodes ? serie.episodes.map((ep) => {
              const epTitle = language === "en" && ep.title_en ? ep.title_en : ep.title;
              return (
                <Link href={`/watch/${serie.id}-${ep.id}`} key={ep.id} className="flex flex-col md:flex-row gap-6 p-4 rounded-2xl hover:bg-secondary/50 transition-colors border border-transparent hover:border-border cursor-pointer group">
                  <div className="relative w-full md:w-64 aspect-video rounded-xl overflow-hidden shrink-0">
                    <img src={ep.imageUrl} className="w-full h-full object-cover" alt={epTitle} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                        <Play fill="currentColor" size={20} className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-display font-bold text-lg">{ep.num}. {epTitle}</h4>
                      <span className="text-muted font-sans text-sm">45m</span>
                    </div>
                    <p className="text-muted font-sans text-sm line-clamp-3">
                      {displaySynopsis}
                    </p>
                  </div>
                </Link>
              );
            }) : (
              <p className="text-muted">{t.detail.noEpisodes}</p>
            )}
          </div>
        )}

        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-sans">
            <div className="col-span-2 space-y-8">
              <div>
                <h4 className="text-muted text-sm uppercase tracking-wider mb-2">{t.detail.fullSynopsis}</h4>
                <p className="text-foreground leading-relaxed">
                  {displaySynopsis}
                </p>
              </div>
              
              <div>
                <h4 className="text-muted text-sm uppercase tracking-wider mb-2">{t.detail.languagesSubtitles}</h4>
                <div className="flex items-center gap-6 text-foreground">
                  <span>{t.detail.audioLang}</span>
                  <span>{t.detail.subLang}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-muted text-sm uppercase tracking-wider mb-1">{t.detail.cast}</h4>
                <p className="text-foreground">{serie.actors ? serie.actors.join(", ") : t.detail.notSpecified}</p>
              </div>
              <div>
                <h4 className="text-muted text-sm uppercase tracking-wider mb-1">{t.detail.director}</h4>
                <p className="text-foreground">{serie.director || t.detail.notSpecified}</p>
              </div>
              <div>
                <h4 className="text-muted text-sm uppercase tracking-wider mb-1">{t.detail.classification}</h4>
                <span className="inline-block border border-border px-2 py-1 rounded text-sm text-foreground mt-1">
                  {serie.classification}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
