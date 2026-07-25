import { Suspense } from "react";
import { CatalogGrid } from "@/components/CatalogGrid";
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

export default function MoviesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-32 pb-24 px-12 text-center text-muted">Chargement...</div>}>
      <CatalogGrid initialItems={ALL_MOVIES} title="Films" type="film" />
    </Suspense>
  );
}
