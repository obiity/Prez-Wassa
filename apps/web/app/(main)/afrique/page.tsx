"use client";

import { useEffect, useState } from "react";
import { BackButton } from "@/components/BackButton";
import { CategoryRow } from "@/components/CategoryRow";
import { CategorySlider } from "@/components/CategorySlider";
import { 
  NOLLYWOOD_MOVIES, 
  IVOIRIAN_MOVIES, 
  MALIAN_MOVIES, 
  NORTH_AFRICAN_MOVIES, 
  PANAFRICAN_MOVIES 
} from "@/lib/data";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function AfriquePage() {
  const { t } = useLanguage();

  const regionsData = [
    { id: "nollywood", label: t.africanCinema.regions.nollywood.label, tagline: t.africanCinema.regions.nollywood.tagline, data: NOLLYWOOD_MOVIES },
    { id: "ivoirien", label: t.africanCinema.regions.ivoirian.label, tagline: t.africanCinema.regions.ivoirian.tagline, data: IVOIRIAN_MOVIES },
    { id: "malien", label: t.africanCinema.regions.malian.label, tagline: t.africanCinema.regions.malian.tagline, data: MALIAN_MOVIES },
    { id: "nord", label: t.africanCinema.regions.northAfrica.label, tagline: t.africanCinema.regions.northAfrica.tagline, data: NORTH_AFRICAN_MOVIES },
    { id: "panafricain", label: t.africanCinema.regions.panafrican.label, tagline: t.africanCinema.regions.panafrican.tagline, data: PANAFRICAN_MOVIES },
  ];

  const [activeSection, setActiveSection] = useState(regionsData[0]?.id || "nollywood");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 180;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [regionsData]);

  return (
    <main className="min-h-screen bg-background relative flex flex-col">
      {/* Editorial Hero */}
      <section className="relative w-full pt-32 pb-24 bg-secondary overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 senegal-pattern pointer-events-none opacity-20"></div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="mb-8">
            <BackButton className="mb-4" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h2 className="text-brand-primary font-sans font-bold tracking-widest text-xs md:text-sm uppercase mb-4 drop-shadow-sm">
              {t.africanCinema.hubBadge}
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight tracking-tight">
              {t.manifesto.titleMain} <br/>
              <span className="text-muted font-light italic">{t.manifesto.titleSub}</span>
            </h1>
            <p className="text-lg md:text-xl font-sans text-muted font-light leading-relaxed">
              {t.africanCinema.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Sub-Nav Slider */}
      <div className="sticky top-24 z-40 w-full bg-background/90 backdrop-blur-xl border-b border-white/10 shadow-sm py-1">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <CategorySlider 
            items={regionsData.map(r => ({ id: r.id, label: r.label }))}
            activeId={activeSection}
            onSelect={(id) => scrollToSection(id)}
          />
        </div>
      </div>

      {/* Content Sections */}
      <div className="py-8 flex flex-col max-w-[1600px] mx-auto w-full">
        {regionsData.map(region => (
          <div key={region.id} id={region.id} className="scroll-mt-48">
            <CategoryRow title={region.label} tagline={region.tagline} movies={region.data} aspectRatio="poster" />
          </div>
        ))}
      </div>

    </main>
  );
}
