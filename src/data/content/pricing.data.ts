// src/data/content/pricing.data.ts

export interface PricingPlan {
  name: string;
  badge: string;
  price: string;
  billingPeriod: string;
  description: string;
  ctaText: string;
  isPopular?: boolean;
  features: string[];
}

export interface PricingCategory {
  id: string;
  label: string;
  plans: PricingPlan[];
}

export interface PricingData {
  badge: string;
  headingParts: {
    part1: string;
    highlight: string;
  };
  description: string;
  categories: PricingCategory[];
}

export const pricingData: PricingData = {
  badge: "Our Pricing",
  headingParts: {
    part1: "Choose a plan that fits your ",
    highlight: "needs.",
  },
  description: "Simple, flexible pricing with no hidden fees. Scale up or down anytime.",
  categories: [
    {
      id: "business",
      label: "Businesses & Team",
      plans: [
        {
          name: "Free",
          badge: "FREE",
          price: "$0",
          billingPeriod: "/user/month (billed annually)",
          description: "Perfect for individuals exploring core workspace tools.",
          ctaText: "Get Started",
          features: [
            "3 active projects",
            "Basic task & dashboard mapping",
            "Interactive Kanban view",
            "Limited exports (PNG/PDF)",
            "Community support",
          ],
        },
        {
          name: "Team",
          badge: "TEAM",
          price: "$12",
          billingPeriod: "/user/month (billed annually)",
          description: "Ideal for growing teams and fast-moving startups.",
          ctaText: "Upgrade to Pro",
          features: [
            "Includes everything in Free, plus:",
            "Unlimited projects & boards",
            "Real-time team collaboration",
            "Secure Gmail & invite codes",
            "Version history & logs",
            "Email & chat support",
          ],
        },
        {
          name: "Business",
          badge: "BUSINESS",
          price: "$25",
          billingPeriod: "/user/month (billed annually)",
          description: "Advanced features and governance for scaling organizations.",
          ctaText: "Upgrade to Pro+",
          isPopular: true, // Highlights with our emerald accent border/background
          features: [
            "Everything in Team, plus:",
            "Org-level project control",
            "Advanced API integrations",
            "Custom branding & domains",
            "Role-based access controls (RBAC)",
            "Priority support & SLA",
          ],
        },
        {
          name: "Enterprise",
          badge: "ENTERPRISE",
          price: "Custom",
          billingPeriod: "tailored to your organization",
          description: "Perfect for large corporations requiring full custom access.",
          ctaText: "Contact Us",
          features: [
            "Everything in Business, plus:",
            "SSO & SCIM provisioning",
            "Dedicated success manager",
            "Private cloud or on-prem deployment",
            "Security and compliance reviews",
            "Custom onboarding & training",
          ],
        },
      ],
    },
    {
      id: "individuals",
      label: "Individuals",
      plans: [
        {
          name: "Solo Starter",
          badge: "STARTER",
          price: "$0",
          billingPeriod: "forever free",
          description: "For solo developers and side-project hobbyists.",
          ctaText: "Get Started",
          features: [
            "1 personal workspace",
            "Up to 5 local projects",
            "Basic markdown documentation",
            "Community forum access",
          ],
        },
        {
          name: "Pro Developer",
          badge: "PRO",
          price: "$9",
          billingPeriod: "/month (billed annually)",
          description: "Power-packed features for professional freelancers.",
          ctaText: "Upgrade to Pro",
          isPopular: true,
          features: [
            "Unlimited personal projects",
            "Advanced debugging & logs",
            "Priority issue tracking",
            "Cloud backup & sync",
          ],
        },
      ],
    },
  ],
};