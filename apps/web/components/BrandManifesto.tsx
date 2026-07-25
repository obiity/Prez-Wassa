"use client";

import { motion } from "framer-motion";

export function BrandManifesto() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-secondary overflow-hidden border-y border-white/5">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 senegal-pattern pointer-events-none opacity-20"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Text Content */}
        <div className="flex-1 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-brand-primary font-sans font-bold tracking-widest text-xs md:text-sm uppercase mb-6 drop-shadow-sm">
              Pourquoi WASSA
            </h2>
            
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-8 leading-[1.15] tracking-tight">
              Le cinéma sénégalais, <br/>
              <span className="text-muted font-light italic">sans frontières.</span>
            </h3>
            
            <p className="text-lg md:text-xl font-sans text-muted font-light leading-relaxed mb-8">
              Nous avons créé WASSA avec une mission simple : le Sénégal au cœur, l'Afrique en horizon. Si notre ancrage et notre passion première restent les productions sénégalaises, nous voulons offrir une vitrine à toute la richesse du cinéma africain.
            </p>
            <p className="text-lg md:text-xl font-sans text-muted font-light leading-relaxed">
              Valoriser nos créateurs locaux, raconter nos propres histoires avec authenticité, et reconnecter la diaspora avec sa culture. Bienvenue chez vous.
            </p>
          </motion.div>
        </div>

        {/* Artistic Collage */}
        <div className="flex-1 w-full relative h-[400px] md:h-[600px] hidden sm:block">
          
          {/* Card 1 (Back Left) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-[110%] md:-translate-x-[120%] -translate-y-[60%] z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -15 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-[200px] md:w-[280px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img src="/ceddo.jpeg" alt="Ceddo" className="w-full h-full object-cover opacity-80" />
            </motion.div>
          </div>

          {/* Card 2 (Back Right) */}
          <div className="absolute top-1/2 left-1/2 translate-x-[10%] md:translate-x-[20%] -translate-y-[40%] z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 15 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-[200px] md:w-[280px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img src="/touki-bouki.jpg" alt="Touki Bouki" className="w-full h-full object-cover opacity-80" />
            </motion.div>
          </div>

          {/* Card 3 (Center Front) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 3 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.6 }}
              className="w-[240px] md:w-[340px] aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <img src="/tirailleurs.jpg" alt="Tirailleurs" className="w-full h-full object-cover" />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
