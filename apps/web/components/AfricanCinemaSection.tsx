"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CategoryRow } from "./CategoryRow";
import { CategorySlider } from "./CategorySlider";
import { 
  NOLLYWOOD_MOVIES, 
  IVOIRIAN_MOVIES, 
  MALIAN_MOVIES, 
  NORTH_AFRICAN_MOVIES, 
  PANAFRICAN_MOVIES 
} from "@/lib/data";

const REGIONS = [
  { id: "afrique-nollywood", label: "Nollywood (Nigeria)", tagline: "L'énergie et l'audace de la première industrie cinématographique d'Afrique", data: NOLLYWOOD_MOVIES },
  { id: "afrique-ivoirien", label: "Cinéma Ivoirien", tagline: "Humour, comédies urbaines et drames captivants d'Abidjan", data: IVOIRIAN_MOVIES },
  { id: "afrique-malien", label: "Cinéma Malien", tagline: "Les récits poétiques et engagés des grands maîtres maliens", data: MALIAN_MOVIES },
  { id: "afrique-nord", label: "Afrique du Nord", tagline: "Cinéma d'auteur et histoires intenses du Maghreb", data: NORTH_AFRICAN_MOVIES },
  { id: "afrique-panafricain", label: "Panorama Panafricain", tagline: "Une sélection vibrante des meilleurs longs-métrages du continent", data: PANAFRICAN_MOVIES },
];

export function AfricanCinemaSection() {
  const [activeSection, setActiveSection] = useState(REGIONS[0]?.id || "afrique-nollywood");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (const region of REGIONS) {
        const element = document.getElementById(region.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(region.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative z-20 mt-16 pb-20">
      {/* Section Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-[2px] bg-brand-primary"></span>
            <span className="text-brand-primary font-sans font-bold tracking-widest text-xs uppercase">
              Hub Panafricain
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground tracking-tight">
            Explorez le cinéma africain
          </h2>
          <p className="text-muted font-sans max-w-2xl text-sm md:text-base mt-2">
            Découvrez les œuvres majeures des grandes industries cinématographiques du continent.
          </p>
        </div>

        <Link 
          href="/afrique" 
          className="inline-flex items-center gap-2 text-brand-primary font-sans font-bold text-sm hover:text-brand-hover transition-colors group"
        >
          <span>Voir tout le catalogue</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      {/* Category Pills Bar (Quick Access Slider) */}
      <div className="sticky top-20 z-30 w-full bg-background/90 backdrop-blur-xl border-y border-white/10 my-6 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-1">
          <CategorySlider 
            items={REGIONS.map(r => ({ id: r.id, label: r.label }))}
            activeId={activeSection}
            onSelect={(id) => scrollToSection(id)}
          />
        </div>
      </div>

      {/* Content Rows */}
      <div className="flex flex-col max-w-[1600px] mx-auto w-full">
        {REGIONS.map(region => (
          <div key={region.id} id={region.id} className="scroll-mt-36">
            <CategoryRow 
              title={region.label} 
              tagline={region.tagline} 
              movies={region.data} 
              aspectRatio="poster" 
            />
          </div>
        ))}
      </div>
    </section>
  );
}
