import Link from "next/link";
import { EXCLUSIVES_MOVIES, TRENDING_MOVIES, CLASSIC_MOVIES, WASSA_SERIES, NOLLYWOOD_MOVIES, IVOIRIAN_MOVIES, MALIAN_MOVIES, NORTH_AFRICAN_MOVIES, PANAFRICAN_MOVIES, WASSA_PODCASTS } from "@/lib/data";
import { BackButton } from "@/components/BackButton";

const CATEGORIES = [
  {
    title: "Films",
    subtitle: "Le meilleur du cinéma.",
    image: TRENDING_MOVIES[0]?.imageUrl || "/placeholder.jpg",
    link: "/movies"
  },
  {
    title: "Séries",
    subtitle: "Des histoires captivantes, épisode après épisode.",
    image: WASSA_SERIES[0]?.imageUrl || "/placeholder.jpg",
    link: "/series"
  },
  {
    title: "Podcasts",
    subtitle: "Émissions audio, débats et récits passionnants du Sénégal.",
    image: WASSA_PODCASTS[0]?.imageUrl || "/placeholder.jpg",
    link: "/podcasts"
  },
  {
    title: "Classiques Sénégalais",
    subtitle: "Les œuvres fondatrices de notre patrimoine.",
    image: CLASSIC_MOVIES[0]?.imageUrl || "/placeholder.jpg",
    link: "/movies?genre=Classique"
  },
  {
    title: "Nollywood",
    subtitle: "Le géant du cinéma africain.",
    image: NOLLYWOOD_MOVIES[0]?.imageUrl || "/placeholder.jpg",
    link: "/movies?region=Nigeria"
  },
  {
    title: "Cinéma Ivoirien",
    subtitle: "Humour et drame depuis Babi.",
    image: IVOIRIAN_MOVIES[0]?.imageUrl || "/placeholder.jpg",
    link: "/movies?region=Côte%20d%27Ivoire"
  },
  {
    title: "Cinéma Malien",
    subtitle: "Poésie et traditions.",
    image: MALIAN_MOVIES[0]?.imageUrl || "/placeholder.jpg",
    link: "/movies?region=Mali"
  },
  {
    title: "Afrique du Nord",
    subtitle: "Le cinéma maghrébin et égyptien.",
    image: NORTH_AFRICAN_MOVIES[0]?.imageUrl || "/placeholder.jpg",
    link: "/movies?region=Maroc"
  },
  {
    title: "Drame",
    subtitle: "Émotions fortes.",
    image: PANAFRICAN_MOVIES[0]?.imageUrl || "/placeholder.jpg",
    link: "/movies?genre=Drame"
  }
];

export default function CategoriesPage() {
  return (
    <>
      <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
      <div className="mb-12">
        <BackButton className="mb-6" />
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary mb-4">Catégories</h1>
        <p className="text-xl text-muted font-sans font-light max-w-2xl">
          Parcourez nos collections thématiques et laissez-vous porter par la diversité des œuvres.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
        {CATEGORIES.map((category, idx) => {
          // Asymmetric layout: Make the first and 4th card wider on desktop
          const isWide = idx === 0 || idx === 3;
          return (
          <Link href={category.link} key={idx} className={`group relative w-full ${isWide ? 'md:col-span-2' : 'md:col-span-2 lg:col-span-1'} md:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden block shadow-lg border border-white/5`}>
            {/* Background */}
            <div className="absolute inset-0 z-0">
              <img 
                src={category.image} 
                alt={category.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-300 group-hover:from-black/80"></div>
            
            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-10">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3 transition-transform duration-300 group-hover:-translate-y-1 drop-shadow-md">
                {category.title}
              </h2>
              <p className="text-gray-200 font-sans text-sm md:text-base max-w-sm opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 drop-shadow-sm">
                {category.subtitle}
              </p>
            </div>
          </Link>
          );
        })}
      </div>
    </main>
    </>
  );
}
