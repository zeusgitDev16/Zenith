// src/components/ui/svg/SupportGraphic.tsx

import React from "react";

export const SupportGraphic: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-75 z-0">
      <svg
        viewBox="0 0 1200 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Dynamic gradients for glowing neon grid lines */}
          <linearGradient id="line-glow-1" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="var(--landhighlight-accent)" stopOpacity="0" />
            <stop offset="40%" stopColor="var(--landhighlight-accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="line-glow-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#71717a" stopOpacity="0.3" />
            <stop offset="60%" stopColor="var(--landhighlight-accent)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--landhighlight-accent)" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="node-highlight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--landhighlight-accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--landhighlight-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Tech Grid Background Patterns */}
        <path d="M0 100 H1200" stroke="#27272a" strokeWidth="1" strokeDasharray="6 6" strokeOpacity="0.4" />
        <path d="M0 300 H1200" stroke="#27272a" strokeWidth="1" strokeDasharray="6 6" strokeOpacity="0.4" />
        <path d="M300 0 V400" stroke="#27272a" strokeWidth="1" strokeDasharray="6 6" strokeOpacity="0.3" />
        <path d="M900 0 V400" stroke="#27272a" strokeWidth="1" strokeDasharray="6 6" strokeOpacity="0.3" />

        {/* Prominent Flowing Circuit Pathways */}
        <path d="M-50 350 C 200 350, 400 50, 650 150 C 900 250, 1050 50, 1250 100" stroke="url(#line-glow-1)" strokeWidth="2.5" />
        <path d="M-50 100 C 300 200, 500 350, 800 200 C 1050 50, 1150 350, 1250 300" stroke="url(#line-glow-2)" strokeWidth="2" strokeDasharray="8 4" />

        {/* Glowing Data Intersection Nodes */}
        <g transform="translate(380, 145)">
          <circle r="28" stroke="var(--landhighlight-accent)" strokeWidth="1" strokeOpacity="0.4" />
          <circle r="8" fill="url(#node-highlight)" />
          <circle r="3" fill="#ffffff" />
        </g>

        <g transform="translate(780, 215)">
          <circle r="34" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.5" />
          <circle r="10" fill="var(--landhighlight-accent)" />
          <circle r="4" fill="#ffffff" />
        </g>

        <g transform="translate(1020, 120)">
          <circle r="22" stroke="var(--landhighlight-accent)" strokeWidth="1.5" strokeOpacity="0.6" />
          <circle r="6" fill="var(--landhighlight-accent)" />
        </g>

        {/* Technical Terminal Telemetry Boxes */}
        <g transform="translate(180, 240)">
          <rect width="64" height="24" rx="4" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" fill="var(--landhighlight-accent)" />
          <line x1="22" y1="10" x2="52" y2="10" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="16" x2="40" y2="16" stroke="#52525b" strokeWidth="2" strokeLinecap="round" />
        </g>

        <g transform="translate(900, 80)">
          <rect width="70" height="24" rx="4" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" fill="#38bdf8" />
          <line x1="22" y1="10" x2="58" y2="10" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="16" x2="44" y2="16" stroke="#52525b" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};