import { notFound } from "next/navigation";
import Link from "next/link";
import { Play, Plus, ThumbsUp, Share2 } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { EXCLUSIVES_MOVIES, TRENDING_MOVIES, CLASSIC_MOVIES, NOLLYWOOD_MOVIES, IVOIRIAN_MOVIES, MALIAN_MOVIES, NORTH_AFRICAN_MOVIES, PANAFRICAN_MOVIES } from "@/lib/data";

const ALL_MOVIES = [
  ...EXCLUSIVES_MOVIES,
  ...TRENDING_MOVIES,
  ...CLASSIC_MOVIES,
  ...NOLLYWOOD_MOVIES,
  ...IVOIRIAN_MOVIES,
  ...MALIAN_MOVIES,
  ...NORTH_AFRICAN_MOVIES,
  ...PANAFRICAN_MOVIES
];

export default async function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const movie = ALL_MOVIES.find((m) => m.id === resolvedParams.id);

  if (!movie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 relative">

      {/* Cinematic Backdrop */}
      <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-background">
        <div className="absolute top-32 left-6 md:left-12 z-20">
          <BackButton />
        </div>
        <div className="absolute inset-0 z-0">
          <img 
            src={movie.imageUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent w-full md:w-[75%] transition-colors duration-500"></div>
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/70 to-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 dark:from-black/60 to-transparent z-0 transition-colors duration-500"></div>
        </div>

        {/* Hero Metadata */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full h-full flex flex-col justify-end pb-12 md:pb-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-8xl font-display font-bold text-foreground mb-4 leading-tight drop-shadow-2xl uppercase">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm md:text-base font-sans font-medium text-muted mb-6">
              <span className="text-brand-text font-bold">98% Match</span>
              <span>{movie.year || "2024"}</span>
              <span className="border border-border bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded text-foreground">{movie.duration}</span>
              <span className="border border-border bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded text-foreground">4K Ultra HD</span>
              <span>{movie.genres.join(", ")}</span>
            </div>

            <p className="text-lg md:text-xl font-sans text-muted mb-8 line-clamp-3 md:line-clamp-4 font-light leading-relaxed max-w-2xl">
              {movie.synopsis}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href={`/watch/${movie.id}`}
                className="flex items-center justify-center gap-3 bg-brand-primary hover:bg-brand-hover text-black px-10 py-4 rounded-full font-sans font-semibold text-lg transition-all shadow-glow-primary hover:scale-105 active:scale-95"
              >
                <Play fill="currentColor" size={24} />
                Regarder
              </Link>
              
              <button 
                className="w-14 h-14 rounded-full border border-border bg-black/10 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-black/20 dark:hover:bg-white/20 transition-all hover:scale-105 text-foreground"
                aria-label="Ajouter à ma liste"
              >
                <Plus size={28} />
              </button>

              <button 
                className="w-14 h-14 rounded-full border border-border bg-black/10 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-black/20 dark:hover:bg-white/20 transition-all hover:scale-105 text-foreground"
                aria-label="Évaluer"
              >
                <ThumbsUp size={24} />
              </button>

              <button 
                className="w-14 h-14 rounded-full border border-border bg-black/10 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-black/20 dark:hover:bg-white/20 transition-all hover:scale-105 text-foreground"
                aria-label="Partager"
              >
                <Share2 size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-secondary/80 border border-border/60 backdrop-blur-md mb-8 shadow-sm">
          <span className="px-6 py-2.5 rounded-full font-sans font-bold text-sm bg-brand-primary text-black shadow-glow-subtle">
            Détails & Casting
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-sans">
          <div className="col-span-2 space-y-8">
            <div>
              <h4 className="text-muted text-sm uppercase tracking-wider mb-2">Synopsis Complet</h4>
              <p className="text-foreground leading-relaxed">
                {movie.synopsis}
              </p>
            </div>
            
            <div>
              <h4 className="text-muted text-sm uppercase tracking-wider mb-2">Langues & Sous-titres</h4>
              <div className="flex items-center gap-6 text-foreground">
                <span>Audio : Wolof, Français</span>
                <span>Sous-titres : Français, Anglais</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-muted text-sm uppercase tracking-wider mb-1">Casting</h4>
              <p className="text-foreground">{movie.actors ? movie.actors.join(", ") : "Non renseigné"}</p>
            </div>
            <div>
              <h4 className="text-muted text-sm uppercase tracking-wider mb-1">Réalisation</h4>
              <p className="text-foreground">{movie.director || "Non renseigné"}</p>
            </div>
            <div>
              <h4 className="text-muted text-sm uppercase tracking-wider mb-1">Classification</h4>
              <span className="inline-block border border-border px-2 py-1 rounded text-sm text-foreground mt-1">
                {movie.classification}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
