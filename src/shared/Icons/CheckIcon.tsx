// src/shared/Icons/CheckIcon.tsx
import React from "react";

interface CheckIconProps {
  className?: string;
}

export function CheckIcon({ className = "w-5 h-5 text-emerald-500" }: CheckIconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}