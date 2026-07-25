"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { VideoPlayer } from "@/components/VideoPlayer";
import { CategoryRow } from "@/components/CategoryRow";
import { getRelatedMovies, EXCLUSIVES_MOVIES, TRENDING_MOVIES, CLASSIC_MOVIES, WASSA_SERIES, NOLLYWOOD_MOVIES, IVOIRIAN_MOVIES, MALIAN_MOVIES, NORTH_AFRICAN_MOVIES, PANAFRICAN_MOVIES, DOCUMENTARIES } from "@/lib/data";

const ALL_CONTENT = [
  ...EXCLUSIVES_MOVIES, ...TRENDING_MOVIES, ...CLASSIC_MOVIES, 
  ...WASSA_SERIES, ...NOLLYWOOD_MOVIES, ...IVOIRIAN_MOVIES, 
  ...MALIAN_MOVIES, ...NORTH_AFRICAN_MOVIES, ...PANAFRICAN_MOVIES, 
  ...DOCUMENTARIES
];

export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);

  // Find movie by id
  // Strip episode suffix if it's a series watch route (e.g. "wiriwiri-e1" or "mdhm-s1e1")
  const mainId = resolvedParams.id.replace(/-(s\d+)?e\d+$/, '');
  const movie = ALL_CONTENT.find(m => m.id === mainId);
  const title = movie?.title || "Film Inconnu";
  const relatedMovies = getRelatedMovies(mainId, 10);

  const videoSrc = "/WASSA INTRO.mp4";

  return (
    <div className="w-full min-h-screen bg-black/95 flex flex-col font-sans">
      
      {/* Player Section */}
      <div className="w-full min-h-[90vh] flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 pb-12 shrink-0">
        <div className="w-full max-w-[1600px] aspect-video bg-black rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 relative">
          <VideoPlayer 
            src={videoSrc} 
            title={title} 
            movieId={resolvedParams.id}
            relatedMovies={relatedMovies}
            onClose={() => router.back()} 
          />
        </div>
      </div>

      {/* Subtle Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* Suggestions Row */}
      <div className="w-full pb-20 pt-8">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-[-2rem]">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white/90">Vous aimerez aussi</h2>
        </div>
        <CategoryRow title="" movies={relatedMovies} />
      </div>
    </div>
  );
}
