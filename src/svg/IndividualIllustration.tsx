// src/svg/IndividualIllustration.tsx
import React from 'react';

export function IndividualIllustration() {
  return (
    <svg className="w-full h-full object-cover" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background with subtle engineering grid pattern */}
      <rect width="200" height="100" fill="#f8fafc" />
      <path d="M0 25H200M0 50H200M0 75H200M50 0V100M100 0V100M150 0V100" stroke="#f1f5f9" strokeWidth="1" />

      {/* Floating Card Container */}
      <rect x="35" y="20" width="130" height="60" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Avatar Circle with Emerald Glow & Gradient Feel */}
      <circle cx="65" cy="50" r="16" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="1.5" />
      {/* Person Icon Silhouette */}
      <circle cx="65" cy="45" r="5" fill="#10b981" />
      <path d="M55 59C55 54.5 59.5 53 65 53C70.5 53 75 54.5 75 59" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />

      {/* Text Line Placeholders for Name & Role */}
      <rect x="90" y="40" width="55" height="5" rx="2.5" fill="#0f172a" fillOpacity="0.8" />
      <rect x="90" y="52" width="35" height="4" rx="2" fill="#94a3b8" fillOpacity="0.6" />

      {/* Active Status Indicator Dot */}
      <circle cx="150" cy="32" r="3" fill="#10b981" />
    </svg>
  );
}