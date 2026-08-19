"use client";

import Link from "next/link";
import { EXCLUSIVES_MOVIES, TRENDING_MOVIES, CLASSIC_MOVIES, WASSA_SERIES, NOLLYWOOD_MOVIES, IVOIRIAN_MOVIES, MALIAN_MOVIES, NORTH_AFRICAN_MOVIES, PANAFRICAN_MOVIES, WASSA_PODCASTS } from "@/lib/data";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/lib/LanguageContext";

export default function CategoriesPage() {
  const { t } = useLanguage();

  const categoriesData = [
    {
      title: t.categoriesPage.items.movies.title,
      subtitle: t.categoriesPage.items.movies.subtitle,
      image: TRENDING_MOVIES[0]?.imageUrl || "/placeholder.jpg",
      link: "/movies"
    },
    {
      title: t.categoriesPage.items.series.title,
      subtitle: t.categoriesPage.items.series.subtitle,
      image: WASSA_SERIES[0]?.imageUrl || "/placeholder.jpg",
      link: "/series"
    },
    {
      title: t.categoriesPage.items.podcasts.title,
      subtitle: t.categoriesPage.items.podcasts.subtitle,
      image: WASSA_PODCASTS[0]?.imageUrl || "/placeholder.jpg",
      link: "/podcasts"
    },
    {
      title: t.categoriesPage.items.classics.title,
      subtitle: t.categoriesPage.items.classics.subtitle,
      image: CLASSIC_MOVIES[0]?.imageUrl || "/placeholder.jpg",
      link: "/movies?genre=Classique"
    },
    {
      title: t.categoriesPage.items.nollywood.title,
      subtitle: t.categoriesPage.items.nollywood.subtitle,
      image: NOLLYWOOD_MOVIES[0]?.imageUrl || "/placeholder.jpg",
      link: "/movies?region=Nigeria"
    },
    {
      title: t.categoriesPage.items.ivoirian.title,
      subtitle: t.categoriesPage.items.ivoirian.subtitle,
      image: IVOIRIAN_MOVIES[0]?.imageUrl || "/placeholder.jpg",
      link: "/movies?region=Côte%20d%27Ivoire"
    },
    {
      title: t.categoriesPage.items.malian.title,
      subtitle: t.categoriesPage.items.malian.subtitle,
      image: MALIAN_MOVIES[0]?.imageUrl || "/placeholder.jpg",
      link: "/movies?region=Mali"
    },
    {
      title: t.categoriesPage.items.northAfrica.title,
      subtitle: t.categoriesPage.items.northAfrica.subtitle,
      image: NORTH_AFRICAN_MOVIES[0]?.imageUrl || "/placeholder.jpg",
      link: "/movies?region=Maroc"
    },
    {
      title: t.categoriesPage.items.drama.title,
      subtitle: t.categoriesPage.items.drama.subtitle,
      image: PANAFRICAN_MOVIES[0]?.imageUrl || "/placeholder.jpg",
      link: "/movies?genre=Drame"
    }
  ];

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
      <div className="mb-12">
        <BackButton className="mb-6" />
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary mb-4">{t.categoriesPage.title}</h1>
        <p className="text-xl text-muted font-sans font-light max-w-2xl">
          {t.categoriesPage.subtitle}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
        {categoriesData.map((category, idx) => {
          const isWide = idx === 0 || idx === 3;
          return (
            <Link 
              href={category.link} 
              key={idx} 
              className={`group relative w-full ${isWide ? 'md:col-span-2' : 'md:col-span-2 lg:col-span-1'} md:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden block shadow-lg border border-white/5`}
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-300 group-hover:from-black/80"></div>
              
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
  );
}
