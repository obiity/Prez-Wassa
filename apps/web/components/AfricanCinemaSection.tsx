"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CategoryRow } from "./CategoryRow";
import { CategorySlider } from "./CategorySlider";
import { useLanguage } from "@/lib/LanguageContext";
import { 
  NOLLYWOOD_MOVIES, 
  IVOIRIAN_MOVIES, 
  MALIAN_MOVIES, 
  NORTH_AFRICAN_MOVIES, 
  PANAFRICAN_MOVIES 
} from "@/lib/data";

export function AfricanCinemaSection() {
  const { t } = useLanguage();
  const regionsData = [
    { id: "afrique-nollywood", label: t.africanCinema.regions.nollywood.label, tagline: t.africanCinema.regions.nollywood.tagline, data: NOLLYWOOD_MOVIES },
    { id: "afrique-ivoirien", label: t.africanCinema.regions.ivoirian.label, tagline: t.africanCinema.regions.ivoirian.tagline, data: IVOIRIAN_MOVIES },
    { id: "afrique-malien", label: t.africanCinema.regions.malian.label, tagline: t.africanCinema.regions.malian.tagline, data: MALIAN_MOVIES },
    { id: "afrique-nord", label: t.africanCinema.regions.northAfrica.label, tagline: t.africanCinema.regions.northAfrica.tagline, data: NORTH_AFRICAN_MOVIES },
    { id: "afrique-panafricain", label: t.africanCinema.regions.panafrican.label, tagline: t.africanCinema.regions.panafrican.tagline, data: PANAFRICAN_MOVIES },
  ];

  const [activeSection, setActiveSection] = useState(regionsData[0]?.id || "afrique-nollywood");

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

      for (const region of regionsData) {
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
  }, [regionsData]);

  return (
    <section className="relative z-20 mt-16 pb-20">
      {/* Section Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-[2px] bg-brand-primary"></span>
            <span className="text-brand-primary font-sans font-bold tracking-widest text-xs uppercase">
              {t.africanCinema.hubBadge}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground tracking-tight">
            {t.africanCinema.title}
          </h2>
          <p className="text-muted font-sans max-w-2xl text-sm md:text-base mt-2">
            {t.africanCinema.description}
          </p>
        </div>

        <Link 
          href="/afrique" 
          className="inline-flex items-center gap-2 text-brand-primary font-sans font-bold text-sm hover:text-brand-hover transition-colors group"
        >
          <span>{t.africanCinema.viewAll}</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      {/* Category Pills Bar (Quick Access Slider) */}
      <div className="sticky top-20 z-30 w-full bg-background/90 backdrop-blur-xl border-y border-white/10 my-6 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-1">
          <CategorySlider 
            items={regionsData.map(r => ({ id: r.id, label: r.label }))}
            activeId={activeSection}
            onSelect={(id) => scrollToSection(id)}
          />
        </div>
      </div>

      {/* Content Rows */}
      <div className="flex flex-col max-w-[1600px] mx-auto w-full">
        {regionsData.map(region => (
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
