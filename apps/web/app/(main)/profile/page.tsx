"use client";

import { useState } from "react";
import Link from "next/link";
import { User, CreditCard, LogOut, Settings, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { CategoryRow } from "@/components/CategoryRow";
import { BackButton } from "@/components/BackButton";
import { EXCLUSIVES_MOVIES, WASSA_SERIES } from "@/lib/data";

export default function ProfilePage() {
  const [isAutoRenew, setIsAutoRenew] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  const historyItems = EXCLUSIVES_MOVIES.slice(0, 4);
  const favorites = WASSA_SERIES.slice(0, 3);

  const toggleAutoRenew = () => {
    setIsAutoRenew(!isAutoRenew);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

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
              <span className="bg-brand-primary text-black font-bold text-xs uppercase tracking-wider px-2.5 py-1 rounded-full shadow-glow-primary">Premium 4K</span>
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

        {/* Notification Toast */}
        {showNotification && (
          <div className="fixed bottom-8 right-8 z-50 bg-black/90 text-white border border-brand-primary px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
            {isAutoRenew ? (
              <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0" />
            )}
            <p className="text-sm font-sans font-medium">
              {isAutoRenew 
                ? "Renouvellement automatique activé avec succès." 
                : "Renouvellement automatique désactivé. Votre abonnement s'arrêtera à l'échéance."}
            </p>
          </div>
        )}

        {/* Shelves */}
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-display font-bold mb-6">Reprendre la lecture</h2>
            <CategoryRow title="" movies={historyItems} aspectRatio="video" />
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold">Ma Liste & Favoris</h2>
              <Link href="/ma-liste" className="text-sm font-bold text-brand-primary hover:text-white transition-colors">
                Voir tout
              </Link>
            </div>
            <CategoryRow title="" movies={favorites} />
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-6">Mon Abonnement</h2>
            <div className="bg-secondary/30 border border-border rounded-2xl p-8 max-w-3xl flex flex-col space-y-6">
              
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <CreditCard className="text-brand-primary" />
                    <h3 className="font-display font-bold text-xl">Forfait Premium</h3>
                  </div>
                  <p className="text-muted font-sans text-sm mb-2">4 Écrans • Ultra HD 4K • Sans publicité</p>
                  <p className="text-sm font-sans">Prochain prélèvement : <span className="font-bold text-white">12 Août 2026 (4.900 FCFA)</span></p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={toggleAutoRenew}
                    className={`whitespace-nowrap flex items-center gap-2 font-bold px-6 py-3 rounded-full text-sm transition-all shadow-glow-subtle ${
                      isAutoRenew 
                        ? "bg-brand-primary text-black hover:bg-brand-hover" 
                        : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                    }`}
                  >
                    <RefreshCw className={`w-4 h-4 ${isAutoRenew ? "animate-spin-slow" : ""}`} />
                    Renouvellement automatique : {isAutoRenew ? "Actif" : "Désactivé"}
                  </button>
                  <button className="whitespace-nowrap bg-white text-black font-bold px-6 py-3 rounded-full text-sm hover:scale-105 transition-transform shadow-glow-subtle">
                    Changer d'offre
                  </button>
                </div>
              </div>

              {/* Bouton / Switch Renouvellement Automatique */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-black/40 border border-white/10 p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary mt-0.5">
                    <RefreshCw className={`w-5 h-5 ${isAutoRenew ? "animate-spin-slow text-brand-primary" : "text-muted"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-foreground text-base">Renouvellement automatique</h4>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        isAutoRenew 
                          ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      }`}>
                        {isAutoRenew ? "Actif" : "Désactivé"}
                      </span>
                    </div>
                    <p className="text-xs text-muted max-w-md leading-relaxed">
                      {isAutoRenew 
                        ? "Votre abonnement se renouvelle automatiquement chaque mois. Aucun risque d'interruption de vos vidéos." 
                        : "Votre abonnement s'arrêtera automatiquement à la fin de la période en cours sans aucun prélèvement."}
                    </p>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={toggleAutoRenew}
                  className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-black ${
                    isAutoRenew ? "bg-brand-primary" : "bg-gray-700"
                  }`}
                  role="switch"
                  aria-checked={isAutoRenew}
                  aria-label="Activer ou désactiver le renouvellement automatique"
                >
                  <span
                    className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out ${
                      isAutoRenew ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
