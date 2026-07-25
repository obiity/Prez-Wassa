"use client";

import Link from "next/link";
import { Play, Users, Radio, Film, Tv } from "lucide-react";
import { ContentItem } from "@/types/content";
import { motion } from "framer-motion";

interface FeaturedMixedRowProps {
  items: ContentItem[];
}

export function FeaturedMixedRow({ items }: FeaturedMixedRowProps) {
  return (
    <section className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-6 z-20">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Tv className="w-5 h-5 text-brand-primary" />
            <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground tracking-tight">
              Sélection En Direct & À la Une
            </h2>
          </div>
          <p className="text-xs md:text-sm text-brand-primary font-serif italic tracking-wide mt-0.5">
            Vos directs TV et contenus phares du jour en temps réel
          </p>
        </div>
        <span className="text-xs md:text-sm text-muted font-sans font-medium hidden sm:inline">
          4 programmes phares
        </span>
      </div>

      {/* Grid of 4 Mixed Preview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, idx) => {
          const isLive = item.type === "live" || item.isLive;
          const isSubRequired = item.isExclusive || item.requiresSubscription;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1, ease: "easeOut" }}
            >
              <Link
                href={`/watch/${item.id}`}
                className={`group relative flex flex-col justify-end rounded-2xl overflow-hidden bg-card shadow-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:z-30 h-[220px] sm:h-[240px] md:h-[260px] cursor-pointer ${
                  isSubRequired
                    ? "border border-brand-primary/80 dark:border-brand-primary shadow-[0_0_12px_rgba(255,106,0,0.25)] hover:border-brand-primary hover:shadow-[0_20px_40px_rgba(255,106,0,0.25),0_10px_20px_rgba(0,0,0,0.5)]" 
                    : "border border-border hover:border-brand-primary/60 hover:shadow-[0_20px_40px_rgba(255,106,0,0.2),0_10px_20px_rgba(0,0,0,0.5)]"
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 bg-secondary overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Top Badges (Live vs VOD Visual Signaling) */}
                <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
                  {isLive ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600 text-white font-sans font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-md animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      EN DIRECT
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 font-sans font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                      <Film size={12} className="text-brand-primary" />
                      VOD
                    </span>
                  )}

                  {isLive && item.viewerCount ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-[10px] sm:text-xs font-medium">
                      <Users size={12} className="text-brand-primary" />
                      {item.viewerCount}
                    </span>
                  ) : !isLive && (item.duration || item.year) ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-gray-200 border border-white/20 text-[10px] sm:text-xs font-medium">
                      {item.year ? `${item.year}` : ""} {item.duration ? `• ${item.duration}` : ""}
                    </span>
                  ) : null}
                </div>

                {/* Play icon overlay on hover */}
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px]">
                  <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center shadow-glow-primary transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play fill="currentColor" size={20} className="text-black ml-0.5" />
                  </div>
                </div>

                {/* Bottom Content Metadata */}
                <div className="relative z-10 p-4 flex flex-col justify-end">
                  {isLive && item.channelName && (
                    <span className="text-[11px] font-sans font-semibold text-brand-primary uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Radio size={12} />
                      {item.channelName}
                    </span>
                  )}

                  <h3 className="font-display font-bold text-white text-base md:text-lg line-clamp-1 group-hover:text-brand-primary transition-colors leading-tight drop-shadow">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-300 font-sans line-clamp-1 mt-1 font-normal opacity-90">
                    {item.synopsis}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
