import { Suspense } from "react";
import { CatalogGrid } from "@/components/CatalogGrid";
import { WASSA_SERIES } from "@/lib/data";

export default function SeriesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-32 pb-24 px-12 text-center text-muted">...</div>}>
      <CatalogGrid initialItems={WASSA_SERIES} type="serie" />
    </Suspense>
  );
}
