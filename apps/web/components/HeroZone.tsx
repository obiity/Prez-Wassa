"use client";

import Link from "next/link";
import { Play, Info, Sparkles, Users, Radio, Volume2, VolumeX } from "lucide-react";
import { ContentItem } from "@/types/content";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface HeroZoneProps {
  vodItem: ContentItem;
  liveItem: ContentItem;
}

export function HeroZone({ vodItem, liveItem }: HeroZoneProps) {
  const [vodIsMuted, setVodIsMuted] = useState(true);
  const [liveIsMuted, setLiveIsMuted] = useState(true);
  const [vodVideoFailed, setVodVideoFailed] = useState(false);
  const [liveVideoFailed, setLiveVideoFailed] = useState(false);
  const { t, language } = useLanguage();

  const vodVideoRef = useRef<HTMLVideoElement>(null);
  const liveVideoRef = useRef<HTMLVideoElement>(null);

  const vodTitle = language === "en" && vodItem.title_en ? vodItem.title_en : vodItem.title;
  const vodSynopsis = language === "en" && vodItem.synopsis_en ? vodItem.synopsis_en : vodItem.synopsis;

  const liveTitle = language === "en" && liveItem.title_en ? liveItem.title_en : liveItem.title;
  const liveSynopsis = language === "en" && liveItem.synopsis_en ? liveItem.synopsis_en : liveItem.synopsis;
  const liveChannel = language === "en" && liveItem.channelName_en ? liveItem.channelName_en : (liveItem.channelName || "WASSA Live");

  return (
    <section className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-4 z-30">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: FLAGSHIP VOD                                   */}
        {/* ============================================================ */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="group relative flex flex-col justify-end rounded-2xl overflow-hidden bg-card border border-border shadow-xl hover:border-brand-primary/60 hover:shadow-[0_20px_40px_rgba(255,106,0,0.25),0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-300 min-h-[380px] sm:min-h-[440px] md:min-h-[500px]"
        >
          {/* Background Video or Image Fallback */}
          <div className="absolute inset-0 z-0 bg-secondary overflow-hidden">
            {vodItem.videoUrl && !vodVideoFailed ? (
              <video
                ref={vodVideoRef}
                src={vodItem.videoUrl}
                poster={vodItem.imageUrl}
                autoPlay
                muted={vodIsMuted}
                loop
                playsInline
                onError={() => setVodVideoFailed(true)}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            ) : (
              <img 
                src={vodItem.imageUrl} 
                alt={vodTitle}
                className="w-full h-full object-cover object-top md:object-center transition-transform duration-1000 group-hover:scale-105"
              />
            )}

            {/* Gradients for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Sound toggle button */}
          {vodItem.videoUrl && !vodVideoFailed && (
            <button 
              onClick={() => setVodIsMuted(!vodIsMuted)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-black/80 transition-all cursor-pointer"
              title={vodIsMuted ? t.hero.unmute : t.hero.mute}
              aria-label={vodIsMuted ? t.hero.unmute : t.hero.mute}
            >
              {vodIsMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          )}

          {/* Content overlay */}
          <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col justify-end h-full">
            {/* Category / Featured pill */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary text-black font-sans font-bold text-xs uppercase tracking-wider shadow-glow-primary">
                <Sparkles size={14} className="fill-black" />
                {t.hero.topVod}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-white border border-white/20 text-xs font-medium">
                {vodItem.classification}
              </span>
              <span className="text-xs text-gray-300 font-sans font-medium">
                {vodItem.year} • {vodItem.duration}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mb-3 tracking-tight drop-shadow-lg leading-tight">
              {vodTitle}
            </h1>

            {/* 2-line Description */}
            <p className="text-sm sm:text-base text-gray-200 font-sans line-clamp-2 mb-6 max-w-xl font-normal leading-relaxed drop-shadow">
              {vodSynopsis}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link 
                href={`/watch/${vodItem.id}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-brand-primary hover:bg-brand-hover text-black font-sans font-bold text-base transition-all shadow-glow-primary hover:scale-[1.03] active:scale-95"
              >
                <Play fill="currentColor" size={20} />
                {t.hero.watch}
              </Link>

              <Link 
                href={`/movie/${vodItem.id}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white font-sans font-semibold text-base transition-all hover:scale-[1.03] active:scale-95"
              >
                <Info size={20} />
                {t.hero.moreInfo}
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: TOP LIVE STREAM                               */}
        {/* ============================================================ */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="group relative flex flex-col justify-end rounded-2xl overflow-hidden bg-card border border-border shadow-xl hover:border-brand-primary/60 hover:shadow-[0_20px_40px_rgba(255,106,0,0.25),0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-300 min-h-[380px] sm:min-h-[440px] md:min-h-[500px]"
        >
          {/* Background Video or Preview Image Fallback */}
          <div className="absolute inset-0 z-0 bg-secondary overflow-hidden">
            {liveItem.videoUrl && !liveVideoFailed ? (
              <video
                ref={liveVideoRef}
                src={liveItem.videoUrl}
                poster={liveItem.imageUrl}
                autoPlay
                muted={liveIsMuted}
                loop
                playsInline
                onError={() => setLiveVideoFailed(true)}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            ) : (
              <img 
                src={liveItem.imageUrl} 
                alt={liveTitle}
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />
            )}

            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Top Header Controls: EN DIRECT Badge & Sound button */}
          <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white font-sans font-bold text-xs uppercase tracking-wider shadow-lg animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                {t.hero.liveNow}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-xs font-medium">
                <Users size={14} className="text-brand-primary" />
                {liveItem.viewerCount} {t.hero.viewers}
              </span>
            </div>

            {liveItem.videoUrl && !liveVideoFailed && (
              <button 
                onClick={() => setLiveIsMuted(!liveIsMuted)}
                className="pointer-events-auto p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-black/80 transition-all cursor-pointer"
                title={liveIsMuted ? t.hero.unmute : t.hero.mute}
                aria-label={liveIsMuted ? t.hero.unmute : t.hero.mute}
              >
                {liveIsMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            )}
          </div>

          {/* Content overlay */}
          <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col justify-end h-full">
            {/* Channel badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-brand-primary font-sans font-bold text-xs uppercase tracking-widest">
                <Radio size={16} />
                {liveChannel}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mb-3 tracking-tight drop-shadow-lg leading-tight">
              {liveTitle}
            </h2>

            {/* 2-line Description */}
            <p className="text-sm sm:text-base text-gray-200 font-sans line-clamp-2 mb-6 max-w-xl font-normal leading-relaxed drop-shadow">
              {liveSynopsis}
            </p>

            {/* Action button */}
            <div className="flex items-center gap-4">
              <Link 
                href={`/watch/${liveItem.id}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-sans font-bold text-base transition-all shadow-lg hover:scale-[1.03] active:scale-95"
              >
                <Play fill="currentColor" size={20} />
                {t.hero.watchLive}
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
