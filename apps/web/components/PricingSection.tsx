"use client";

import { useState } from "react";
import { Check, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export function PricingSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [autoRenew, setAutoRenew] = useState<boolean>(true);
  const { t } = useLanguage();

  const pricingPlans = [
    {
      id: "mobile",
      ...t.pricing.plans.mobile,
      isPopular: false,
    },
    {
      id: "standard",
      ...t.pricing.plans.standard,
      isPopular: true,
    },
    {
      id: "premium",
      ...t.pricing.plans.premium,
      isPopular: false,
    }
  ];

  return (
    <section id="tarifs" className="relative w-full pt-0 pb-24 md:pb-32 bg-secondary/30 -mt-12 md:-mt-24 z-10 scroll-mt-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-brand-primary font-sans font-bold tracking-widest text-xs md:text-sm uppercase mb-4 drop-shadow-sm">
            {t.pricing.badge}
          </h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-[1.2] tracking-tight">
            {t.pricing.title}
          </h3>
          <p className="mt-4 text-lg text-muted font-light mb-8">
            {t.pricing.description}
          </p>

          {/* Bouton Renouvellement automatique */}
          <div className="inline-flex items-center gap-3 bg-black/40 border border-white/10 p-2 rounded-full shadow-lg">
            <button
              onClick={() => setAutoRenew(!autoRenew)}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs md:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 ${
                autoRenew 
                  ? "bg-brand-primary text-black shadow-glow-primary" 
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${autoRenew ? "animate-spin-slow" : ""}`} />
              {t.pricing.autoRenew} {autoRenew ? t.pricing.active : t.pricing.inactive}
            </button>
            <span className="text-xs text-muted pr-4 hidden sm:inline-block">
              {autoRenew ? t.pricing.monthlyBenefit : t.pricing.oneTimeBenefit}
            </span>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-stretch"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {pricingPlans.map((plan, index) => {
            const isHovered = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && !isHovered;
            const isActiveOrHovered = hoveredIndex !== null ? isHovered : plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col h-full rounded-3xl p-8 lg:p-10 transition-all duration-500 cursor-pointer focus:outline-none ${
                  plan.isPopular 
                    ? "bg-card border-2 border-brand-primary shadow-glow-primary z-10" 
                    : "bg-card/50 border border-white/10 backdrop-blur-sm"
                } ${isDimmed ? "opacity-40 scale-95" : "opacity-100 scale-100"}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
                tabIndex={0}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-black font-bold text-xs uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg z-20">
                    {t.pricing.popularBadge}
                  </div>
                )}

                {/* Content wrapper */}
                <div className="flex flex-col h-full relative z-10">
                  <motion.div 
                    className="relative mb-6"
                    animate={{
                      scale: isHovered ? 1.02 : 1,
                      color: isHovered ? "var(--accent)" : "var(--text-primary)"
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <h4 className="text-2xl font-display font-semibold mb-2">
                      {plan.name}
                    </h4>
                    
                    <div className="flex flex-nowrap items-baseline gap-2">
                      <span className="text-3xl lg:text-4xl font-display font-bold whitespace-nowrap">
                        {plan.price}
                      </span>
                      <span className="text-muted font-sans font-medium whitespace-nowrap">
                        {plan.billing}
                      </span>
                    </div>

                    {/* Sliding Underline/Indicator */}
                    {isActiveOrHovered && (
                      <motion.div
                        layoutId="pricingUnderline"
                        className="absolute -bottom-4 left-0 h-[2px] w-12 bg-brand-primary"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>

                  <p className={`text-sm font-light mb-10 min-h-[40px] transition-colors duration-500 ${
                    isHovered ? "text-gray-300" : "text-muted"
                  }`}>
                    {plan.description}
                  </p>

                  <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check 
                          size={20} 
                          className={`shrink-0 mt-0.5 transition-colors duration-500 ${
                            isHovered || plan.isPopular ? "text-brand-primary" : "text-muted"
                          }`} 
                        />
                        <span className="text-gray-300 font-sans text-sm md:text-base leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className={`w-full py-5 md:py-6 rounded-full font-sans font-extrabold text-lg md:text-xl transition-all hover:scale-[1.03] active:scale-95 mt-auto uppercase tracking-wider ${
                      isActiveOrHovered
                        ? "bg-brand-primary hover:bg-brand-hover text-black shadow-glow-primary shadow-[0_0_25px_rgba(255,106,0,0.4)]"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:border-brand-primary/60"
                    }`}
                  >
                    {plan.btn}
                  </button>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
