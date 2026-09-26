import React from "react";
import { CheckIcon } from "@/shared/Icons/CheckIcon";

// ==========================================
// FUTURE-PROOF FEATURE REGISTRY
// You can easily add, update, or remove features here.
// ==========================================
const FEATURE_GROUPS = [
  {
    title: "Core Project Management",
    description: "Built for speed and clarity across your entire team pipeline.",
    features: [
      "Real-time issue tracking & task boards",
      "Role-based Client & Manager portals",
      "Secure Gmail & invite code verification",
      "Centralized task triage and status updates",
    ],
  },
  {
   title: "Advanced Workflow & Tools",
    description: "Designed to keep your projects organized and teams aligned.",
    features: [
      "Automated task reminders & push notifications",
      "Interactive Kanban boards & milestone tracking",
      "Secure document sharing & version history",
      "Integrated team messaging & project activity logs",
    ],
  },
  {
    title: "Security & Synchronization",
    description: "Enterprise-grade reliability for your data ecosystem.",
    features: [
      "Persistent local state & cloud sync",
      "Granular role permission layers",
      "Optimized offline-first design patterns",
      "Secure token and session management",
    ],
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-muted/30 border-t border-border/40 scroll-mt-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            Capabilities
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
            Everything you need to run projects <span className="text-primary">seamlessly.</span>
          </h2>
          <p className="text-muted-foreground text-base">
            Explore the robust modules designed to keep managers in command and clients completely in the loop.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURE_GROUPS.map((group, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{group.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                </div>
                
                <hr className="border-border/60 my-2" />

                {/* Feature List with Check Icons */}
                <ul className="flex flex-col gap-3">
                  {group.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 text-sm text-foreground/90">
                      <div className="mt-0.5 shrink-0">
                        <CheckIcon />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}