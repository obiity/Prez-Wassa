import { HeroBanner } from "@/components/HeroBanner";
import { HeroZone } from "@/components/HeroZone";
import { FeaturedMixedRow } from "@/components/FeaturedMixedRow";
import { CategoryRow } from "@/components/CategoryRow";
import { AfricanCinemaSection } from "@/components/AfricanCinemaSection";
import { BrandManifesto } from "@/components/BrandManifesto";
import { HowItWorks } from "@/components/HowItWorks";
import { PricingSection } from "@/components/PricingSection";
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
  return (
    <main className="min-h-screen bg-background text-foreground w-full transition-colors duration-300 relative">
      <div className="absolute inset-0 z-0 senegal-pattern pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Full-width Hero Banner Carousel */}
        <HeroBanner 
          movies={[
            {
              id: "saloum",
              title: "Saloum",
              description: "Fuyant un coup d'état en Guinée-Bissau, les Hyènes de Bangui, un trio de mercenaires d'élite, doivent faire face à des forces mystiques dans la région du Sine-Saloum au Sénégal. Une aventure à la croisée du western et du fantastique.",
              imageUrl: "/saloum.jpg"
            },
            {
              id: "tirailleurs",
              title: "Tirailleurs",
              description: "1917. Bakary Diallo s'enrôle dans l'armée française pour rejoindre Thierno, son fils de 17 ans, recruté de force. Envoyés sur le front, père et fils vont devoir affronter la guerre ensemble.",
              imageUrl: "/tirailleurs.jpg"
            },
            {
              id: "banel-adama",
              title: "Banel & Adama",
              description: "Banel et Adama s'aiment d'un amour absolu. Mais dans leur village au nord du Sénégal, il n'y a pas de place pour les passions individuelles. Leur amour va être mis à l'épreuve par les conventions de la communauté.",
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

          {/* Row below Hero: 4 preview cards (2 Live + 2 VOD mixed) */}
          <FeaturedMixedRow 
            items={HERO_MIXED_CARDS} 
          />
        </div>

        {/* Existing Genre-Based Rows */}
        <div className="pt-6 pb-20 relative z-20">
          <CategoryRow 
            title="Nouveautés Exclusives" 
            tagline="Les dernières pépites et avant-premières en exclusivité sur WASSA"
            movies={EXCLUSIVES_MOVIES} 
            aspectRatio="poster"
          />
          
          <CategoryRow 
            title="Films Tendances" 
            tagline="Les œuvres plébiscitées par les spectateurs en ce moment"
            movies={TRENDING_MOVIES} 
            aspectRatio="poster"
          />

          <CategoryRow 
            title="Classiques Sénégalais" 
            tagline="Le patrimoine du cinéma sénégalais, restauré pour vous"
            movies={CLASSIC_MOVIES} 
            aspectRatio="poster"
          />

          <CategoryRow 
            title="Séries Originales WASSA" 
            tagline="Les productions originales au cœur de la culture sénégalaise"
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
