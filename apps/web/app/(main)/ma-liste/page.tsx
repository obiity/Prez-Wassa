"use client";

import { BackButton } from "@/components/BackButton";
import { MovieCard } from "@/components/MovieCard";
import { ContentItem } from "@/types/content";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useFavorites } from "@/lib/FavoritesContext";

export default function MyListPage() {
  const { favorites: myFavorites } = useFavorites();

  return (
    <>
      <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto flex flex-col">
        <div className="mb-12">
          <BackButton className="mb-4" />
          <h1 className="text-4xl md:text-6xl font-serif font-bold">Ma Liste</h1>
        </div>

        {myFavorites.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto py-20">
            {/* Pictogram */}
            <div className="w-24 h-24 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-8">
              <Plus className="w-10 h-10 text-brand-primary" strokeWidth={1.5} />
            </div>
            
            <h2 className="text-2xl font-display font-bold mb-4">Votre liste est vide pour l'instant</h2>
            <p className="text-muted font-sans mb-10 leading-relaxed">
              Ajoutez des films et séries en appuyant sur + où que vous les trouviez, pour les retrouver facilement ici.
            </p>
            
            <Link 
              href="/movies"
              className="bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-full font-sans font-bold text-sm transition-all shadow-glow-subtle hover:-translate-y-1"
            >
              Parcourir le catalogue
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-12">
            {myFavorites.map(item => (
              <MovieCard key={item.id} movie={item} showRemoveIcon={true} hoverEffect="lift" />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
