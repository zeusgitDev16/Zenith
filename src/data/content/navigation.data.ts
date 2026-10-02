// src/data/content/navigation.data.ts

export interface NavLink {
  label: string;
  targetId: string;
}

export interface BrandConfig {
  name: string;
}

export interface NavActions {
  getStarted: string;
}

export interface NavigationData {
  links: NavLink[];
  brand: BrandConfig;
  actions: NavActions;
}

export const navigationData: NavigationData = {
  // Navigation links array for dynamic .map() rendering
  links: [
    { label: "Features", targetId: "features" },
    { label: "Workflow", targetId: "workflow" },
    { label: "Pricing", targetId: "pricing" },
    { label: "Docs", targetId: "docs" },
  ],
  
  // Brand identity copy
  brand: {
    name: "zenith",
  },
  
  // Right-side action buttons copy
  actions: {
    getStarted: "Get Zenith",
  },
};

/* ==========================================================================
   DEVELOPER GUIDE: HOW TO ADD OR MODIFY NAVIGATION ITEMS
   ==========================================================================
   1. To add a new navigation link:
      - Add a new object to the `links` array above: 
        `{ label: "Your Label", targetId: "your-section-id" }`
      - Ensure your target section in the UI has a matching `id="your-section-id"`.
   
   2. To modify brand text or action button text:
      - Update the string values inside the `brand` or `actions` objects directly.
   ========================================================================== */