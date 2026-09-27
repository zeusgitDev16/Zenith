// src/data/content/landing.data.js

export const landingData = {
  // Navigation / Role Switcher Tabs
  tabs: {
    client: "Join Project",
    manager: "Account Center",
  },

  // Client View Content
  client: {
    headingParts: {
      part1: "Be part of a team & ",
      highlight: "track",
      part2: " progress effortlessly.",
    },
    description: "Submit tasks, monitor live updates, and collaborate directly with project managers through your secure client invitation access.",
    portalTitle: "Client Access Portal",
    emailPlaceholder: "Enter your Gmail address",
    invitePlaceholder: "Enter invitation code",
    submitButtonText: "Sign In to Portal",
  },

  // Manager View Content
  manager: {
    headingParts: {
      part1: "Lead a team & ",
      highlight: "manage",
      part2: " your project group.",
    },
    description: "Triage incoming reports, assign workflows, and manage team output seamlessly from a single unified dashboard.",
    controlTitle: "Account Control Center",
    controlDescription: "New to Zenith? Create your administrative account to start organizing your team's project pipeline.",
    createButtonText: "Create Account",
    signInButtonText: "Sign In to Existing Account",
  },

  // Right Column: Product Showcase Video Placeholder
  showcase: {
    title: "Zenith Product Showcase",
    description: "Product demo video recording placeholder.",
  },
};

/* ==========================================================================
   DEVELOPER GUIDE: HOW TO ADD OR MODIFY LANDING PAGE DATA & FEATURES
   ==========================================================================
   1. To modify hero copy (Headings, descriptions, placeholders):
      - Update the exact string values under the `client` or `manager` objects above.
   
   2. To add a new input field or form button:
      - Add your new string/property to the respective role object in this file.
      - Destructure it inside `LandingPage.jsx` and render it using standard JSX.
   
   3. To modify tab switcher labels:
      - Change the strings inside the `tabs` object.
   ========================================================================== */