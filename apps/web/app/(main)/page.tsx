"use client";

import { HeroBanner } from "@/components/HeroBanner";
import { HeroZone } from "@/components/HeroZone";
import { FeaturedMixedRow } from "@/components/FeaturedMixedRow";
import { CategoryRow } from "@/components/CategoryRow";
import { AfricanCinemaSection } from "@/components/AfricanCinemaSection";
import { BrandManifesto } from "@/components/BrandManifesto";
import { HowItWorks } from "@/components/HowItWorks";
import { PricingSection } from "@/components/PricingSection";
import { useLanguage } from "@/lib/LanguageContext";
import { 
  FLAGSHIP_VOD, 
  TOP_LIVE_STREAM, 
  HERO_MIXED_CARDS, 
  EXCLUSIVES_MOVIES, 
  TRENDING_MOVIES, 
  CLASSIC_MOVIES, 
  WASSA_SERIES
} from "@/lib/data";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background text-foreground w-full transition-colors duration-300 relative">
      <div className="absolute inset-0 z-0 senegal-pattern pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Full-width Hero Banner Carousel with bilingual data */}
        <HeroBanner 
          movies={[
            {
              id: "saloum",
              title: "Saloum",
              title_en: "Saloum",
              description: "Fuyant un coup d'État en Guinée-Bissau, les Hyènes de Bangui, un trio de mercenaires d'élite, doivent faire face à des forces mystiques dans la région du Sine-Saloum au Sénégal.",
              description_en: "Fleeing a coup in Guinea-Bissau, the Bangui Hyenas, an elite mercenary trio, find refuge in Senegal's Sine-Saloum region, only to awaken ancient supernatural forces.",
              imageUrl: "/saloum.jpg"
            },
            {
              id: "tirailleurs",
              title: "Tirailleurs",
              title_en: "Father & Soldier (Tirailleurs)",
              description: "1917. Bakary Diallo s'enrôle dans l'armée française pour rejoindre Thierno, son fils de 17 ans, recruté de force. Envoyés sur le front, père et fils vont devoir affronter la guerre ensemble.",
              description_en: "1917. Bakary Diallo enlists in the French army to join his 17-year-old son Thierno, who was forcibly recruited. Sent to the front lines, father and son face war together.",
              imageUrl: "/tirailleurs.jpg"
            },
            {
              id: "banel-adama",
              title: "Banel & Adama",
              title_en: "Banel & Adama",
              description: "Banel et Adama s'aiment d'un amour absolu. Mais dans leur village au nord du Sénégal, il n'y a pas de place pour les passions individuelles.",
              description_en: "Banel and Adama are deeply in love. But in their remote village in northern Senegal, their desire to live for themselves threatens community traditions.",
              imageUrl: "/banel-et-adama.jpg"
            }
          ]}
        />

        {/* Structured 2-column Hero Zone (VOD + Live Stream) */}
        <div className="mt-[-60px] md:mt-[-100px] relative z-20">
          <HeroZone 
            vodItem={FLAGSHIP_VOD} 
            liveItem={TOP_LIVE_STREAM} 
          />

          {/* Row below Hero: 4 preview cards */}
          <FeaturedMixedRow 
            items={HERO_MIXED_CARDS} 
          />
        </div>

        {/* Category Rows with Translated Headings */}
        <div className="pt-6 pb-20 relative z-20">
          <CategoryRow 
            title={t.categories.exclusivesTitle} 
            tagline={t.categories.exclusivesTagline}
            movies={EXCLUSIVES_MOVIES} 
            aspectRatio="poster"
          />
          
          <CategoryRow 
            title={t.categories.trendingTitle} 
            tagline={t.categories.trendingTagline}
            movies={TRENDING_MOVIES} 
            aspectRatio="poster"
          />

          <CategoryRow 
            title={t.categories.classicsTitle} 
            tagline={t.categories.classicsTagline}
            movies={CLASSIC_MOVIES} 
            aspectRatio="poster"
          />

          <CategoryRow 
            title={t.categories.seriesTitle} 
            tagline={t.categories.seriesTagline}
            movies={WASSA_SERIES} 
            aspectRatio="video"
          />
        </div>

        {/* Pan-African Section with Category Navigation Pills */}
        <AfricanCinemaSection />

        <BrandManifesto />
        <HowItWorks />
        <PricingSection />
      </div>
    </main>
  );
}
