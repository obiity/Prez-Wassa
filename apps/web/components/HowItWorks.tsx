"use client";

import { motion } from "framer-motion";
import { Tv, MonitorSmartphone, MonitorPlay } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full pt-24 md:pt-32 pb-0 bg-background overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-brand-primary font-sans font-bold tracking-widest text-xs md:text-sm uppercase mb-4 drop-shadow-sm">
            {t.howItWorks.badge}
          </h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-[1.2] tracking-tight">
            {t.howItWorks.title}
          </h3>
        </div>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start relative">
          
          {/* Left Column: Image (Sticky on Desktop) */}
          <div className="w-full lg:w-2/3 lg:sticky lg:top-12 lg:h-[calc(100vh-6rem)] flex items-start justify-end lg:pt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full lg:w-[110%] lg:translate-x-6"
            >
              <img 
                src="/Mockup2.png" 
                alt="Interface WASSA" 
                className="w-full h-auto object-cover" 
              />
            </motion.div>
          </div>

          {/* Right Column: Steps */}
          <div className="w-full lg:w-1/3 flex flex-col gap-12 lg:gap-20 lg:pt-16 pb-12 lg:pb-0">
            
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-left"
            >
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                <MonitorPlay size={24} />
              </div>
              <h4 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">{t.howItWorks.step1Title}</h4>
              <p className="text-base md:text-lg text-muted font-sans font-light leading-relaxed">
                {t.howItWorks.step1Desc}
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-left"
            >
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                <MonitorSmartphone size={24} />
              </div>
              <h4 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">{t.howItWorks.step2Title}</h4>
              <p className="text-base md:text-lg text-muted font-sans font-light leading-relaxed">
                {t.howItWorks.step2Desc}
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-left"
            >
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                <Tv size={24} />
              </div>
              <h4 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">{t.howItWorks.step3Title}</h4>
              <p className="text-base md:text-lg text-muted font-sans font-light leading-relaxed">
                {t.howItWorks.step3Desc}
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
