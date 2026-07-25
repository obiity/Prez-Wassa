"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Users, Radio, Calendar, Clock, Sparkles, Tv } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/BackButton";

const TV_CHANNELS = [
  {
    id: "rts1",
    name: "RTS 1 Sénégal",
    category: "Information & Culture",
    viewers: "14.2k",
    imageUrl: "/RTS1.png",
    currentProgram: "Le Journal Télévisé de 20h - Édition Spéciale",
    nextProgram: "21h30 - Sénégal en Marche (Documentaire)",
    description: "Le journal télévisé de 20h en direct de Dakar, avec l'actualité nationale et internationale analysée par la rédaction de la RTS.",
    isLive: true,
  },
  {
    id: "tfm",
    name: "TFM Sénégal",
    category: "Société & Divertissement",
    viewers: "9.8k",
    imageUrl: "/TFM.png",
    currentProgram: "Quartier Général Spécial - Débat Culturel",
    nextProgram: "22h00 - Yeewuleen Replay",
    description: "L'émission culte Quartier Général en direct : débats, analyses sociétales et invités prestigieux.",
    isLive: true,
  },
  {
    id: "2stv",
    name: "2sTV Direct",
    category: "Sport & Musique",
    viewers: "18.5k",
    imageUrl: "/2STV.png",
    currentProgram: "Grand Combat de Lutte avec Frappe - Arène Nationale",
    nextProgram: "23h00 - 2s Soirée Concert",
    description: "En direct de l'Arène Nationale de Dakar : vivez le grand choc de lutte sénégalaise opposant les meilleurs lutteurs.",
    isLive: true,
  },
  {
    id: "sentv",
    name: "Sen TV",
    category: "Culture & Religion",
    viewers: "7.4k",
    imageUrl: "/SEN TV.png",
    currentProgram: "Grandes Figures de l'Histoire Sénégalaise",
    nextProgram: "21h45 - Les Contes du Soir",
    description: "Émission spéciale consacrée à l'histoire, aux traditions et au patrimoine spirituel sénégalais.",
    isLive: true,
  },
  {
    id: "wassalive",
    name: "WASSA Live 1",
    category: "Cinéma & Avant-premières",
    viewers: "22.1k",
    imageUrl: "/Wassa TV.png",
    currentProgram: "Soirée Avant-Première : Le Cinéma Sénégalais à l'Honneur",
    nextProgram: "22h30 - Rediffusion Banel & Adama",
    description: "La chaîne exclusive WASSA TV dédiée aux diffusions en direct d'avant-premières, tapis rouges et interviews exclusives.",
    isLive: true,
  }
];

const PROGRAM_SCHEDULE = [
  { time: "08:00 - 10:00", title: "La Matinale Info Direct", channel: "RTS 1", status: "Terminé" },
  { time: "12:00 - 13:00", title: "Midi Actu & Édition Spéciale", channel: "TFM", status: "Terminé" },
  { time: "18:00 - 19:30", title: "Sport 2s : Avant-Combat", channel: "2sTV", status: "Terminé" },
  { time: "20:00 - 21:30", title: "Journal Télévisé 20h - Direct", channel: "RTS 1", status: "En cours", active: true },
  { time: "20:30 - 22:00", title: "Quartier Général Spécial", channel: "TFM", status: "En cours", active: true },
  { time: "21:00 - 23:30", title: "Grand Combat de Lutte Live", channel: "2sTV", status: "En cours", active: true },
  { time: "22:00 - 23:30", title: "Sénégal en Marche (Documentaire)", channel: "RTS 1", status: "À venir" },
];

export default function TVPage() {
  const [selectedChannelId, setSelectedChannelId] = useState("rts1");
  const selectedChannel = (TV_CHANNELS.find(c => c.id === selectedChannelId) || TV_CHANNELS[0])!;

  return (
    <main className="min-h-screen bg-background text-foreground pt-28 pb-20 px-4 sm:px-6 md:px-12 max-w-[1600px] mx-auto relative transition-colors duration-300">
      <div className="absolute inset-0 z-0 senegal-pattern pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header navigation */}
        <div className="mb-6 flex items-center justify-between">
          <BackButton />
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-600 dark:text-red-500 text-xs font-sans font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            5 Chaînes en direct
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Tv className="w-8 h-8 text-brand-primary" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-foreground tracking-tight">
              TV en Direct
            </h1>
          </div>
          <p className="text-muted font-sans text-sm sm:text-base max-w-2xl">
            Suivez en direct vos chaînes de télévision sénégalaises préférées : informations, sports, débats et grands événements.
          </p>
        </div>

        {/* ============================================================ */}
        {/* MAIN LIVE FEATURE PLAYER                                    */}
        {/* ============================================================ */}
        <div className="mb-12 rounded-2xl overflow-hidden bg-card border border-border shadow-2xl hover:border-brand-primary/60 hover:shadow-[0_20px_40px_rgba(255,106,0,0.25)] transition-all duration-300 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedChannel.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-video max-h-[550px] w-full bg-black flex flex-col justify-end overflow-hidden"
            >
              {/* Background preview image */}
              <img 
                src={selectedChannel.imageUrl} 
                alt={selectedChannel.name}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

              {/* Top info bar */}
              <div className="absolute top-4 inset-x-4 sm:inset-x-6 z-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white font-sans font-bold text-xs uppercase tracking-wider shadow-lg animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    EN DIRECT
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-xs font-medium">
                    <Users size={14} className="text-brand-primary" />
                    {selectedChannel.viewers} spectateurs
                  </span>
                </div>

                <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-brand-primary font-sans font-bold text-xs uppercase tracking-widest border border-white/10">
                  {selectedChannel.name}
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <Link
                  href={`/watch/live-${selectedChannel.id}`}
                  className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-primary hover:bg-brand-hover text-black flex items-center justify-center shadow-glow-primary hover:scale-110 active:scale-95 transition-all"
                >
                  <Play fill="currentColor" size={32} className="ml-1" />
                </Link>
              </div>

              {/* Bottom Content Metadata */}
              <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col justify-end">
                <span className="text-xs font-sans font-bold text-brand-primary uppercase tracking-widest mb-1 flex items-center gap-1">
                  <Radio size={14} />
                  {selectedChannel.category}
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white mb-2 leading-tight drop-shadow-md">
                  {selectedChannel.currentProgram}
                </h2>

                <p className="text-xs sm:text-sm text-gray-200 font-sans line-clamp-2 max-w-2xl mb-4 font-normal leading-relaxed">
                  {selectedChannel.description}
                </p>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/watch/live-${selectedChannel.id}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-sans font-bold text-sm transition-all shadow-lg hover:scale-105 active:scale-95"
                  >
                    <Play fill="currentColor" size={18} />
                    Regarder le direct
                  </Link>

                  <span className="text-xs text-gray-400 font-sans hidden sm:inline-block">
                    Suivant : <strong className="text-gray-200">{selectedChannel.nextProgram}</strong>
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Channel selector strip below main player */}
          <div className="p-4 bg-card border-t border-border flex gap-3 overflow-x-auto scrollbar-hide">
            {TV_CHANNELS.map((ch) => {
              const isSelected = ch.id === selectedChannelId;
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
                    <div className="font-display font-bold text-sm leading-tight text-foreground">{ch.name}</div>
                    <div className="text-[11px] font-sans text-muted">{ch.viewers} spec.</div>
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
              Bouquet des Chaînes Sénégalaises
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TV_CHANNELS.map((ch) => (
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
                    alt={ch.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider animate-pulse">
                      EN DIRECT
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium border border-white/20">
                      {ch.viewers}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-sans font-semibold text-brand-primary uppercase tracking-wider block mb-1">
                      {ch.category}
                    </span>
                    <h3 className="font-display font-bold text-lg text-foreground mb-1 group-hover:text-brand-primary transition-colors">
                      {ch.name}
                    </h3>
                    <p className="text-xs text-muted font-sans line-clamp-2 mb-3">
                      {ch.currentProgram}
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
                    Regarder le direct
                  </button>
                </div>
              </div>
            ))}
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
                Grille des Programmes d'Aujourd'hui
              </h2>
            </div>
            <span className="text-xs text-muted font-sans">Mise à jour en direct</span>
          </div>

          <div className="divide-y divide-border">
            {PROGRAM_SCHEDULE.map((prog, idx) => (
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
                      {prog.title}
                      {prog.active && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white uppercase tracking-wider animate-pulse">
                          En direct
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted font-sans">Chaîne : {prog.channel}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    prog.active ? "bg-red-600/10 text-red-600 font-bold" : "bg-secondary text-muted"
                  }`}>
                    {prog.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
