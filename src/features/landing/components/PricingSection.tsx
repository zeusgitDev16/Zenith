// src/features/landing/components/PricingSection.tsx

import React from "react";
import { pricingData } from "@/data/content/pricing.data";
import { Check } from "lucide-react";
import { usePricingToggle } from "@/shared/hooks/usePricingToggle";

export const PricingSection: React.FC = () => {
  const { activeCategory, handleCategoryChange, categories } = usePricingToggle();

  return (
    <section id= "pricing" className="py-24 px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mb-12 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--badgeBG-accent)]/10 text-[var(--landhighlight-accent)] border border-emerald-500/20">
            {pricingData.badge}
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
            {pricingData.headingParts.part1}
            <span className="text-emerald-600 dark:text-emerald-400">
              {pricingData.headingParts.highlight}
            </span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg">
            {pricingData.description}
          </p>

          {/* Category Toggle Switcher */}
          <div className="inline-flex p-1.5 rounded-full bg-muted/60 border border-border/80 mt-6 shadow-inner">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-background text-foreground shadow-sm border border-border/50"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content Container with True Crossfade matching Auth Switch */}
        <div className="relative w-full">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <div
                key={cat.id}
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch transition-all duration-1000 ease-in-out ${
                  isActive
                    ? "opacity-100 translate-y-0 relative z-10"
                    : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none z-0"
                }`}
              >
                {cat.plans.map((plan, index) => (
                  <div
                    key={index}
                    className={`relative bg-card text-card-foreground rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md ${
                      plan.isPopular
                        ? "border-emerald-500/80 dark:border-emerald-500/60 ring-1 ring-emerald-500/30 bg-card/90"
                        : "border-border/80"
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-sm">
                        Most Popular
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                          {plan.badge}
                        </span>
                      </div>

                      <div className="mb-2">
                        <span className="text-4xl font-extrabold text-foreground tracking-tight">
                          {plan.price}
                        </span>
                        <span className="text-xs text-muted-foreground block mt-1">
                          {plan.billingPeriod}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground mb-6 pb-6 border-b border-border/60 leading-relaxed">
                        {plan.description}
                      </p>

                      <div className="space-y-3 mb-8">
                        {plan.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-start text-xs text-foreground/80">
                            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium transition-all shadow-sm ${
                        plan.isPopular
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
                          : "bg-muted hover:bg-muted/80 text-foreground border border-border/50"
                      }`}
                    >
                      {plan.ctaText}
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};  