// src/shared/components/Navbar.jsx
import React from "react";
import { useScrollDirection } from "@/shared/hooks/useScrollDirection";
import { Button } from "@/shared/ui/Button/Button";
import { handleScrollTo } from "@/shared/helper/navbarSmoothAnchor/handleScrollTo";
import { navigationData } from "@/data/content/navigation.data";
import { MobileMenu } from "@/shared/ui/MobileMenu/MobileMenu";

export function Navbar() {
  const isVisible = useScrollDirection();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`} 
    >
      {/* Added 'relative' here so the flex container acts as the anchor */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
        
        {/* Left Side: Navigation Links (Dynamically Mapped) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {navigationData.links.map((link) => (
            <button 
              key={link.targetId}
              type="button"
              className="hover:text-foreground transition-colors cursor-pointer bg-transparent border-none p-0" 
              onClick={(e) => handleScrollTo(e, link.targetId)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Center: Brand Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="/" className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
            <span>{navigationData.brand.name}</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
          </a>
        </div>

        {/* Right Side: Desktop Actions OR Mobile Menu Toggle */}
        <div className="flex items-center gap-3 ml-auto md:ml-0">
          {/* Desktop Right Side Container */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              {navigationData.actions.login}
            </Button>
            <Button variant="default" size="sm">
              {navigationData.actions.getStarted}
            </Button>
          </div>

          {/* Mobile Right Side: Menu Button */}
          <div className="md:hidden flex items-center">
            <MobileMenu />
          </div>
        </div>

      </div>
    </header>
  );
}