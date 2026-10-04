// src/features/landing/components/WorkflowSection.tsx

import React from "react";
import { workflowData } from "@/data/content/workflow.data";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react"; 
import { useWorkflowScroll } from "@/shared/hooks/useWorkflowScroll";

export const WorkflowSection: React.FC = () => {
  const { containerRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } = useWorkflowScroll();
  return (
    <section id="workflow" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* Left Column: Fixed Editorial Content & CTA (Keyvo Style) */}
        <div className="lg:col-span-4 flex flex-col items-start space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--badgeBG-accent)]/10 text-[var(--landhighlight-accent)] border border-emerald-500/20">
            {workflowData.badge}
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
            {workflowData.headingParts.part1}
            <span className="text-landhighlight-accent">
              {workflowData.headingParts.highlight}
            </span>
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {workflowData.description}
          </p>

          {/* Primary CTA Button */}
          <button className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 font-medium text-sm transition-all hover:opacity-90 shadow-sm group">
            {workflowData.ctaText}
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right Column: Horizontal Scrollable / Interactive Step Cards */}
        <div className="lg:col-span-8 relative w-full overflow-hidden">
          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button 
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background border border-border shadow-lg items-center justify-center text-foreground hover:bg-muted transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div ref={containerRef} className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory">
            {workflowData.steps.map((step, index) => (
              <div
                key={index}
                 className="flex-shrink-0 w-[85vw] sm:w-[360px] md:w-[420px] bg-card rounded-2xl border border-border/60 shadow-sm hover:shadow-md transition-shadow flex flex-col snap-start overflow-hidden"
                    >
                  {/* Top UI Preview Mockup Container */}
                  <div className="h-48 sm:h-56 bg-muted/30 border-b border-border/40 p-6 flex items-center justify-center relative">
                  {/* Placeholder for individual step UI preview */}
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-background/80 px-3 py-1.5 rounded-md border border-border/50">
                    {step.stepNumber} Interface Preview
                  </div>
                </div>

                {/* Bottom Content Footer */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-xs font-bold text-[var(--landhighlight-accent)] uppercase tracking-wider">
                      {step.stepNumber}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mt-1 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swipe Guide Text (Visible on mobile/tablet, hidden on large desktop screens) */}
          <div className="flex lg:hidden items-center justify-center gap-2 mt-4 text-xs text-muted-foreground animate-pulse">
           <span>{workflowData.scrollHint}</span>
         </div>

          {/* Desktop Right / Scroll Indicator Arrow (Conditional on right scroll availability) */}
          {canScrollRight && (
            <button 
              onClick={scrollRight}
              aria-label="Scroll right"
              className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background border border-border shadow-lg items-center justify-center text-foreground hover:bg-muted transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};