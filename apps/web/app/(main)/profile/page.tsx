"use client";

import Link from "next/link";
import { User, CreditCard, LogOut, Settings } from "lucide-react";
import { CategoryRow } from "@/components/CategoryRow";
import { BackButton } from "@/components/BackButton";
import { EXCLUSIVES_MOVIES, WASSA_SERIES } from "@/lib/data";

export default function ProfilePage() {
  const historyItems = EXCLUSIVES_MOVIES.slice(0, 4);
  const favorites = WASSA_SERIES.slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground pb-24">

      <div className="pt-32 max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="mb-8">
          <BackButton />
        </div>
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 border-b border-border pb-12 mb-12">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-brand-primary/10 border-2 border-brand-primary flex items-center justify-center shrink-0">
            <User className="w-12 h-12 md:w-16 md:h-16 text-brand-primary" />
          </div>
          
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">Mamadou Diop</h1>
            <div className="flex items-center gap-3 text-muted">
              <span className="bg-brand-primary text-black font-bold text-xs uppercase tracking-wider px-2 py-1 rounded-sm">Premium 4K</span>
              <span>Membre depuis 2024</span>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto mt-6 md:mt-0">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-secondary/50 hover:bg-secondary border border-border px-6 py-3 rounded-full font-sans font-medium transition-colors text-sm">
              <Settings size={16} />
              Gérer mon profil
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-6 py-3 rounded-full font-sans font-medium transition-colors text-sm">
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Shelves */}
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-display font-bold mb-6">Reprendre la lecture</h2>
            <CategoryRow title="" movies={historyItems} aspectRatio="video" />
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold">Ma Liste & Favoris</h2>
              <Link href="/mylist" className="text-sm font-bold text-brand-primary hover:text-white transition-colors">
                Voir tout
              </Link>
            </div>
            <CategoryRow title="" movies={favorites} />
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-6">Mon Abonnement</h2>
            <div className="bg-secondary/30 border border-border rounded-2xl p-8 max-w-2xl flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="text-brand-primary" />
                  <h3 className="font-display font-bold text-xl">Forfait Premium</h3>
                </div>
                <p className="text-muted font-sans text-sm mb-4">4 Écrans • Ultra HD 4K • Sans publicité</p>
                <p className="text-sm font-sans">Prochain prélèvement : <span className="font-bold text-white">12 Août 2024 (4.900 FCFA)</span></p>
              </div>
              <button className="whitespace-nowrap bg-white text-black font-bold px-6 py-3 rounded-full text-sm hover:scale-105 transition-transform shadow-glow-subtle">
                Changer d'offre
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
