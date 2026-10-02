// src/data/content/features.data.js

// src/data/content/features.data.ts

export interface HeadingParts {
  part1: string;
  highlight: string;
}

export interface FeatureGroup {
  title: string;
  description: string;
  features: string[];
}

export interface FeaturesData {
  badge: string;
  headingParts: HeadingParts;
  description: string;
  groups: FeatureGroup[];
}

export const featuresData: FeaturesData = {
  // Section Header Copy
  badge: "Capabilities",
  headingParts: {
    part1: "Everything you need to run projects ",
    highlight: "seamlessly.",
  },
  description: "Explore the robust modules designed to keep managers in command and clients completely in the loop.",

  // Feature Cards Registry
  groups: [
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
  ],
};
/* ==========================================================================
   DEVELOPER GUIDE: HOW TO ADD OR MODIFY FEATURES DATA
   ==========================================================================
   1. To add a new feature group card:
      - Add a new object to the `groups` array with a `title`, `description`, and `features` array.
   
   2. To modify section titles or header badges:
      - Update the string values under the main `featuresData` root object.
   ========================================================================== */