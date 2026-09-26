import React from "react";
import { useScrollDirection } from "@/shared/hooks/useScrollDirection";
import { Button } from "@/shared/ui/Button/Button";
import { handleScrollTo } from "@/shared/helper/navbarSmoothAnchor/handleScrollTo";


export function Navbar() {
  const isVisible = useScrollDirection(); // 2. Call the hook

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`} 
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left Side: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <button 
            type="button"
            className="hover:text-foreground transition-colors cursor-pointer bg-transparent border-none p-0" 
            onClick={(e) => handleScrollTo(e, "features")}
          >
           Features
          </button>
          <button 
            type="button"
            className="hover:text-foreground transition-colors cursor-pointer bg-transparent border-none p-0" 
            onClick={(e) => handleScrollTo(e, "workflow")}
          >
           Workflow
          </button>
          <button 
            type="button"
            className="hover:text-foreground transition-colors cursor-pointer bg-transparent border-none p-0" 
            onClick={(e) => handleScrollTo(e, "pricing")}
           >
             Pricing
           </button>
           <button 
             type="button"
             className="hover:text-foreground transition-colors cursor-pointer bg-transparent border-none p-0" 
             onClick={(e) => handleScrollTo(e, "docs")}
          >
             Docs
           </button>
        </nav>

        {/* Center: Brand Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="/" className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
            <span>zenith</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
          </a>
        </div>

        {/* Right Side: Auth & Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Log in
          </Button>
          <Button variant="default" size="sm">
            Get Zenith
          </Button>
        </div>

      </div>
    </header>
  );
}