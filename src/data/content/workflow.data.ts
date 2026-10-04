// src/data/content/workflow.data.ts

export interface HeadingParts {
  part1: string;
  highlight: string;
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  description: string;
  // We can add a placeholder or mock type for the card preview later if needed
}

export interface WorkflowData {
  badge: string;
  headingParts: HeadingParts;
  description: string;
  ctaText: string;
  steps: WorkflowStep[];
  scrollHint: string;
}

export const workflowData: WorkflowData = {
  badge: "Execution Pipeline", 
  headingParts: {
    part1: "How Zenith fits into your ",
    highlight: "workflow.",
  },
  description: "A transparent look at how data flows securely from user input to your project dashboard.",
  ctaText: "Book a Demo with Our Team",
  steps: [
    {
      stepNumber: "Step 1",
      title: "Submit deal data via dashboard.",
      description: "Inputs are intercepted and validated securely using Zod schemas before hitting backend logic.",
    },
    {
      stepNumber: "Step 2",
      title: "Analyze asset, driver, and program risk instantly.",
      description: "Permissions and sessions are verified dynamically to enforce strict separation of duties.",
    },
    {
      stepNumber: "Step 3",
      title: "Execute and track outputs in real-time.",
      description: "Validated data flows smoothly into stateless, variant-driven components for instant display.",
    },
    {
      stepNumber: "Step 4",
      title: "Export reports and share with stakeholders.",
      description: "Data is serialized and exported in multiple formats, ensuring compatibility and security.",
    },
  ],
  scrollHint: "<< Swipe right or left to view steps >>",
};