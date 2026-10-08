// src/shared/ui/Modal/Modal.tsx

import React from 'react';

// Define available size variants
type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  size?: ModalSize; // Optional size prop, defaults to 'md'
  children: React.ReactNode;
}

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm', // Great for small confirmation dialogs
  md: 'max-w-md', // Great for standard forms (our registration modal)
  lg: 'max-w-lg', // Great for larger settings or data views
  xl: 'max-w-2xl', // Great for complex workflows or previews
};

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  size = 'md', 
  children 
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container using global semantic tokens */}
      <div className={`w-full ${sizeStyles[size]} p-6 bg-card border border-border rounded-xl shadow-xl text-foreground animate-in fade-in zoom-in-95 duration-150`}>
        
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
          <button 
            onClick={onClose} 
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-accent/50"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Dynamic Content */}
        <div>{children}</div>
        
      </div>
    </div>
  );
}