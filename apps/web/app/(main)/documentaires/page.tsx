"use client";

import { BackButton } from "@/components/BackButton";
import { DocumentaryCard } from "@/components/DocumentaryCard";
import { DOCUMENTARIES } from "@/lib/data";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function DocumentairesPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background relative flex flex-col">
      {/* Editorial Header */}
      <div className="pt-32 pb-16 px-6 md:px-12 max-w-[1600px] mx-auto w-full flex-shrink-0">
        <div className="mb-12">
          <BackButton className="mb-6" />
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary mb-2">
            {t.documentaries.title}
          </h1>
          <p className="text-sm md:text-base text-brand-primary font-serif italic tracking-wide mb-4">
            {t.documentaries.subtitle}
          </p>
        </div>
      </div>

      {DOCUMENTARIES.length === 0 ? (
        <div className="flex-1 relative flex items-center justify-center p-6 border-t border-white/5 bg-secondary/30 overflow-hidden">
          <div className="absolute inset-0 z-0 senegal-pattern opacity-10 pointer-events-none mix-blend-overlay"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 text-center max-w-3xl mx-auto px-6 py-20"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              {t.documentaries.title}
            </h2>
            <div className="w-16 h-[1px] bg-brand-primary mx-auto mb-8"></div>
            <p className="text-lg md:text-xl font-sans text-muted font-light leading-relaxed">
              {t.documentaries.subtitle}
            </p>
          </motion.div>
        </div>
      ) : (
        <div className="px-6 md:px-12 max-w-[1600px] mx-auto w-full pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {DOCUMENTARIES.map(doc => (
              <DocumentaryCard key={doc.id} movie={doc} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
