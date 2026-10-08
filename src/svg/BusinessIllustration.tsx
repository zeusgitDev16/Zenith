// src/svg/BusinessIllustration.tsx
import React from 'react';

export function BusinessIllustration() {
  return (
    <svg className="w-full h-full object-cover" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background with engineering grid pattern */}
      <rect width="200" height="100" fill="#f8fafc" />
      <path d="M0 25H200M0 50H200M0 75H200M50 0V100M100 0V100M150 0V100" stroke="#f1f5f9" strokeWidth="1" />

      {/* Connection Links / Network Architecture Line */}
      <path d="M55 65H145" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Left Building (Secondary Node) */}
      <rect x="42" y="45" width="26" height="35" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
      <rect x="48" y="52" width="6" height="6" rx="1" fill="#e2e8f0" />
      <rect x="58" y="52" width="6" height="6" rx="1" fill="#e2e8f0" />
      <rect x="48" y="63" width="6" height="6" rx="1" fill="#e2e8f0" />
      <rect x="58" y="63" width="6" height="6" rx="1" fill="#e2e8f0" />

      {/* Right Building (Secondary Node) */}
      <rect x="132" y="45" width="26" height="35" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
      <rect x="138" y="52" width="6" height="6" rx="1" fill="#e2e8f0" />
      <rect x="148" y="52" width="6" height="6" rx="1" fill="#e2e8f0" />
      <rect x="138" y="63" width="6" height="6" rx="1" fill="#e2e8f0" />
      <rect x="148" y="63" width="6" height="6" rx="1" fill="#e2e8f0" />

      {/* Center Building (Main HQ - Highlighted with Emerald Accent) */}
      <rect x="83" y="25" width="34" height="55" rx="4" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" />
      {/* Central building glow accent */}
      <rect x="89" y="33" width="7" height="8" rx="1.5" fill="#10b981" fillOpacity="0.2" />
      <rect x="104" y="33" width="7" height="8" rx="1.5" fill="#10b981" fillOpacity="0.2" />
      <rect x="89" y="46" width="7" height="8" rx="1.5" fill="#10b981" fillOpacity="0.2" />
      <rect x="104" y="46" width="7" height="8" rx="1.5" fill="#10b981" fillOpacity="0.2" />
      <rect x="94" y="63" width="12" height="17" rx="2" fill="#10b981" fillOpacity="0.15" />

      {/* Floating Network Status Node */}
      <circle cx="100" cy="18" r="3" fill="#10b981" />
      <path d="M100 18V25" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}