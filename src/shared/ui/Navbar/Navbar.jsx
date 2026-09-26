import { Button } from "@/shared/ui/Button/Button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left Side: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#workflow" className="hover:text-foreground transition-colors">Workflow</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#docs" className="hover:text-foreground transition-colors">Docs</a>
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