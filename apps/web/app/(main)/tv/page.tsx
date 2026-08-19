"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Users, Radio, Calendar, Clock, Sparkles, Tv } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/lib/LanguageContext";

const TV_CHANNELS = [
  {
    id: "rts1",
    name: "RTS 1 Sénégal",
    name_en: "RTS 1 Senegal",
    category: "Information & Culture",
    category_en: "News & Culture",
    viewers: "14.2k",
    imageUrl: "/RTS1.png",
    currentProgram: "Le Journal Télévisé de 20h - Édition Spéciale",
    currentProgram_en: "8 PM Evening News - Special Edition",
    nextProgram: "21h30 - Sénégal en Marche (Documentaire)",
    nextProgram_en: "9:30 PM - Senegal on the Move (Documentary)",
    description: "Le journal télévisé de 20h en direct de Dakar, avec l'actualité nationale et internationale analysée par la rédaction de la RTS.",
    description_en: "The 8 PM news live from Dakar, covering national and international events analyzed by RTS newsroom.",
    isLive: true,
  },
  {
    id: "tfm",
    name: "TFM Sénégal",
    name_en: "TFM Senegal",
    category: "Société & Divertissement",
    category_en: "Society & Entertainment",
    viewers: "9.8k",
    imageUrl: "/TFM.png",
    currentProgram: "Quartier Général Spécial - Débat Culturel",
    currentProgram_en: "Special General Quarter - Cultural Debate",
    nextProgram: "22h00 - Yeewuleen Replay",
    nextProgram_en: "10:00 PM - Yeewuleen Replay",
    description: "L'émission culte Quartier Général en direct : débats, analyses sociétales et invités prestigieux.",
    description_en: "The hit show General Quarter live: in-depth debates, societal analysis, and distinguished guests.",
    isLive: true,
  },
  {
    id: "2stv",
    name: "2sTV Direct",
    name_en: "2sTV Live",
    category: "Sport & Musique",
    category_en: "Sports & Music",
    viewers: "18.5k",
    imageUrl: "/2STV.png",
    currentProgram: "Grand Combat de Lutte avec Frappe - Arène Nationale",
    currentProgram_en: "Grand Traditional Wrestling Championship - National Arena",
    nextProgram: "23h00 - 2s Soirée Concert",
    nextProgram_en: "11:00 PM - 2s Concert Night",
    description: "En direct de l'Arène Nationale de Dakar : vivez le grand choc de lutte sénégalaise opposant les meilleurs lutteurs.",
    description_en: "Live from Dakar's National Arena: experience the clash of Senegalese wrestling champions.",
    isLive: true,
  },
  {
    id: "sentv",
    name: "Sen TV",
    name_en: "Sen TV",
    category: "Culture & Religion",
    category_en: "Culture & Religion",
    viewers: "7.4k",
    imageUrl: "/SEN TV.png",
    currentProgram: "Grandes Figures de l'Histoire Sénégalaise",
    currentProgram_en: "Great Figures of Senegalese History",
    nextProgram: "21h45 - Les Contes du Soir",
    nextProgram_en: "9:45 PM - Evening Folklore Tales",
    description: "Émission spéciale consacrée à l'histoire, aux traditions et au patrimoine spirituel sénégalais.",
    description_en: "Special program dedicated to the rich history, folklore traditions, and spiritual heritage of Senegal.",
    isLive: true,
  },
  {
    id: "wassalive",
    name: "WASSA Live 1",
    name_en: "WASSA Live 1",
    category: "Cinéma & Avant-premières",
    category_en: "Cinema & Premieres",
    viewers: "22.1k",
    imageUrl: "/Wassa TV.png",
    currentProgram: "Soirée Spéciale Cinéma Panafricain - Table Ronde & Diffusion",
    currentProgram_en: "Pan-African Cinema Night - Roundtable & Screening",
    nextProgram: "22h30 - Masterclass Réalisateurs",
    nextProgram_en: "10:30 PM - Filmmakers Masterclass",
    description: "La chaîne exclusive WASSA dédiée aux grandes diffusions de films, avant-premières et entretiens exclusifs.",
    description_en: "The exclusive WASSA channel dedicated to major film broadcasts, premieres, and creator interviews.",
    isLive: true,
  },
  {
    id: "wassaafrique",
    name: "WASSA Afrique Live",
    name_en: "WASSA Africa Live",
    category: "Musique & Concerts",
    category_en: "Music & Live Concerts",
    viewers: "11.3k",
    imageUrl: "/wassa-musique.png",
    currentProgram: "Festival Acoustique de Dakar - Live Session",
    currentProgram_en: "Dakar Acoustic Festival - Live Session",
    nextProgram: "23h15 - Nuit Afrobeat & Mbalax",
    nextProgram_en: "11:15 PM - Afrobeat & Mbalax Night",
    description: "Concerts en direct, festivals et sessions acoustiques des plus grands artistes du continent africain.",
    description_en: "Live concerts, music festivals, and intimate acoustic sessions from Africa's greatest recording artists.",
    isLive: true,
  }
];

const PROGRAM_SCHEDULE = [
  { time: "20:00 - 21:15", title: "Le Journal Télévisé de 20h", title_en: "8 PM Evening News", channel: "RTS 1", status: "En cours", status_en: "Live Now", active: true },
  { time: "20:30 - 22:00", title: "Quartier Général Spécial", title_en: "Special General Quarter", channel: "TFM", status: "En cours", status_en: "Live Now", active: true },
  { time: "21:15 - 23:00", title: "Grand Combat de Lutte avec Frappe", title_en: "Traditional Wrestling Championship", channel: "2sTV", status: "À suivre", status_en: "Upcoming", active: false },
  { time: "21:30 - 22:45", title: "Sénégal en Marche (Documentaire)", title_en: "Senegal on the Move (Documentary)", channel: "RTS 1", status: "À suivre", status_en: "Upcoming", active: false },
  { time: "22:00 - 00:30", title: "Soirée Spéciale Cinéma Panafricain", title_en: "Pan-African Cinema Night", channel: "WASSA Live 1", status: "À suivre", status_en: "Upcoming", active: false },
];

export default function LiveTvPage() {
  const [selectedChannelId, setSelectedChannelId] = useState("rts1");
  const { t, language } = useLanguage();
  const selectedChannel = (TV_CHANNELS.find(c => c.id === selectedChannelId) || TV_CHANNELS[0]) as (typeof TV_CHANNELS)[number];

  const channelName = language === "en" && selectedChannel.name_en ? selectedChannel.name_en : selectedChannel.name;
  const channelCategory = language === "en" && selectedChannel.category_en ? selectedChannel.category_en : selectedChannel.category;
  const channelProgram = language === "en" && selectedChannel.currentProgram_en ? selectedChannel.currentProgram_en : selectedChannel.currentProgram;
  const channelNext = language === "en" && selectedChannel.nextProgram_en ? selectedChannel.nextProgram_en : selectedChannel.nextProgram;
  const channelDesc = language === "en" && selectedChannel.description_en ? selectedChannel.description_en : selectedChannel.description;

  return (
    <main className="min-h-screen bg-background text-foreground pt-28 pb-24 px-4 sm:px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header with BackButton */}
        <div className="mb-8">
          <BackButton className="mb-4" />
          <div className="flex items-center gap-3">
            <Tv className="w-8 h-8 text-brand-primary" />
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-foreground tracking-tight">
              {t.tv.title}
            </h1>
          </div>
          <p className="text-muted font-sans text-sm sm:text-base mt-2 max-w-2xl">
            {t.tv.subtitle}
          </p>
        </div>

        {/* ============================================================ */}
        {/* MAIN FEATURED LIVE PLAYER SPOTLIGHT                          */}
        {/* ============================================================ */}
        <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-2xl mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedChannel.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-video sm:aspect-[21/9] w-full bg-black flex items-end overflow-hidden"
            >
              {/* Background Poster Image */}
              <img 
                src={selectedChannel.imageUrl} 
                alt={channelName}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />

              {/* Cinematic Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />

              {/* LIVE Indicator Pill */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600 text-white font-sans font-bold text-xs uppercase tracking-wider shadow-lg animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  {t.tv.liveBadge}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-xs font-medium">
                  <Users size={14} className="text-brand-primary" />
                  {selectedChannel.viewers} {t.hero.viewers}
                </span>
              </div>

              {/* Channel Info & CTA */}
              <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-3xl">
                <div className="inline-flex items-center gap-1.5 text-brand-primary font-sans font-bold text-xs uppercase tracking-widest mb-2">
                  <Radio size={14} />
                  {channelCategory}
                </div>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mb-2 tracking-tight leading-tight">
                  {channelName}
                </h2>

                <h3 className="text-base sm:text-xl font-sans font-semibold text-brand-primary mb-3">
                  {channelProgram}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 font-sans line-clamp-2 mb-6 max-w-xl font-normal leading-relaxed">
                  {channelDesc}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={`/watch/${selectedChannel.id}`}
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-sans font-bold text-base transition-all shadow-lg hover:scale-105 active:scale-95"
                  >
                    <Play fill="currentColor" size={18} />
                    {t.tv.watchLive}
                  </Link>

                  <span className="text-xs text-gray-400 font-sans hidden sm:inline-block">
                    {t.tv.nextProgram} <strong className="text-gray-200">{channelNext}</strong>
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Channel selector strip */}
          <div className="p-4 bg-card border-t border-border flex gap-3 overflow-x-auto scrollbar-hide">
            {TV_CHANNELS.map((ch) => {
              const isSelected = ch.id === selectedChannelId;
              const name = language === "en" && ch.name_en ? ch.name_en : ch.name;
              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChannelId(ch.id)}
                  className={`flex-none px-4 py-3 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                    isSelected
                      ? "bg-brand-primary/15 border-brand-primary text-foreground shadow-sm"
                      : "bg-secondary/50 border-border text-muted hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${isSelected ? "bg-red-600 animate-pulse" : "bg-gray-400"}`} />
                  <div>
                    <div className="font-display font-bold text-sm leading-tight text-foreground">{name}</div>
                    <div className="text-[11px] font-sans text-muted">{ch.viewers} {language === 'en' ? 'viewers' : 'spec.'}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* TV BOUQUET CARDS GRID                                       */}
        {/* ============================================================ */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-brand-primary" />
            <h2 className="text-2xl font-serif font-bold text-foreground tracking-tight">
              {t.tv.channelsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TV_CHANNELS.map((ch) => {
              const name = language === "en" && ch.name_en ? ch.name_en : ch.name;
              const category = language === "en" && ch.category_en ? ch.category_en : ch.category;
              const currentProg = language === "en" && ch.currentProgram_en ? ch.currentProgram_en : ch.currentProgram;

              return (
                <div
                  key={ch.id}
                  onClick={() => setSelectedChannelId(ch.id)}
                  className={`group relative rounded-2xl overflow-hidden bg-card border border-border shadow-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:z-20 hover:border-brand-primary/60 hover:shadow-[0_20px_40px_rgba(255,106,0,0.2),0_10px_20px_rgba(0,0,0,0.5)] cursor-pointer ${
                    selectedChannelId === ch.id ? "ring-2 ring-brand-primary" : ""
                  }`}
                >
                  <div className="relative h-44 w-full bg-secondary overflow-hidden">
                    <img 
                      src={ch.imageUrl} 
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider animate-pulse">
                        {t.tv.liveBadge}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium border border-white/20">
                        {ch.viewers}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-sans font-semibold text-brand-primary uppercase tracking-wider block mb-1">
                        {category}
                      </span>
                      <h3 className="font-display font-bold text-lg text-foreground mb-1 group-hover:text-brand-primary transition-colors">
                        {name}
                      </h3>
                      <p className="text-xs text-muted font-sans line-clamp-2 mb-3">
                        {currentProg}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedChannelId(ch.id);
                      }}
                      className="w-full py-2.5 rounded-xl bg-secondary hover:bg-brand-primary hover:text-black text-foreground font-sans font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Play fill="currentColor" size={14} />
                      {t.tv.watchLive}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* PROGRAM GUIDE / GRILLE DES PROGRAMMES                       */}
        {/* ============================================================ */}
        <div className="rounded-2xl bg-card border border-border p-6 md:p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-brand-primary" />
              <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                {t.tv.scheduleTitle}
              </h2>
            </div>
            <span className="text-xs text-muted font-sans">{t.tv.liveBadge}</span>
          </div>

          <div className="divide-y divide-border">
            {PROGRAM_SCHEDULE.map((prog, idx) => {
              const progTitle = language === "en" && prog.title_en ? prog.title_en : prog.title;
              const progStatus = language === "en" && prog.status_en ? prog.status_en : prog.status;

              return (
                <div 
                  key={idx}
                  className={`py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    prog.active ? "bg-brand-primary/5 -mx-4 px-4 rounded-xl border-l-4 border-brand-primary" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-semibold text-muted flex items-center gap-1 min-w-[100px]">
                      <Clock size={14} className="text-brand-primary" />
                      {prog.time}
                    </span>
                    <div>
                      <div className="font-display font-bold text-sm text-foreground flex items-center gap-2">
                        {progTitle}
                        {prog.active && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white uppercase tracking-wider animate-pulse">
                            {t.tv.liveBadge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted font-sans">{language === 'en' ? 'Channel:' : 'Chaîne :'} {prog.channel}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      prog.active ? "bg-red-600/10 text-red-600 font-bold" : "bg-secondary text-muted"
                    }`}>
                      {progStatus}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}
