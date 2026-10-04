// src/data/content/footer.data.ts

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface CtaData {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export interface FooterData {
  brandName: string;
  addressLines: string[];
  phoneNumber: string;
  email: string;
  copyright: string;
  cta: CtaData;
  columns: FooterColumn[];
}

export const footerData: FooterData = {
  brandName: "zenith",
  addressLines: [
    "Greater Manila Area",
    "Philippines"
  ],
  phoneNumber: "+63 (900) 000-0000",
  email: "support@zenith.io",
  copyright: `© ${new Date().getFullYear()} Zenith. All rights reserved.`,
  cta: {
    title: "Need assistance with your workflow setup?",
    description: "Connect with our dedicated support engineers for runtime troubleshooting, integration assistance, and system guidance.",
    buttonText: "Enter customer support",
    buttonHref: "#support", // or your target route/anchor
  },
  columns: [
    {
      title: "Quick links",
      links: [
        { label: "Pricing", href: "#pricing" },
        { label: "Resources", href: "#workflow" },
        { label: "About us", href: "#about" },
        { label: "FAQ", href: "#faqs" },
        { label: "Contact us", href: "#contact" },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "GitHub", href: "https://github.com", external: true },
        { label: "LinkedIn", href: "https://linkedin.com", external: true },
        { label: "Twitter", href: "https://x.com", external: true },
        { label: "Youtube", href: "https://youtube.com", external: true },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of service", href: "/terms" },
        { label: "Privacy policy", href: "/privacy" },
        { label: "Cookie policy", href: "/cookies" },
      ],
    },
  ],
};