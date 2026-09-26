
import React from "react";
import { Button } from "@/shared/ui/Button/Button";
import { useLandingAuth } from "@/shared/hooks/useLandingAuth";
import { FeaturesSection } from "@/features/landing/components/FeaturesSection";

export function LandingPage() {
  const {
    activeTab,
    setActiveTab,
    clientEmail,
    setClientEmail,
    inviteCode,
    setInviteCode,
    handleClientSignIn,
    handleManagerAction,
  } = useLandingAuth();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 pt-24 pb-12">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT COLUMN: Role Toggle & Dynamic Forms */}
        <div className="flex flex-col gap-6">
          
          {/* Role Pill Switcher */}
          <div className="inline-flex items-center bg-muted p-1 rounded-full w-fit border border-border">
            <button
              onClick={() => setActiveTab("client")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === "client"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Join Project
            </button>
            <button
              onClick={() => setActiveTab("manager")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === "manager"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Account Login
            </button>
          </div>

          {/* Dynamic Content Container with True Slow Crossfade */}
          <div className="relative w-full">
            
            {/* Client View Panel */}
            <div 
              className={`flex flex-col gap-4 transition-all duration-1000 ease-in-out ${
                activeTab === "client" 
                  ? "opacity-100 translate-y-0 relative" 
                  : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
              }`}
            >
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                Be part of a team & <span className="text-[#800020]">track</span> progress <span className="text-primary">effortlessly.</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Submit tasks, monitor live updates, and collaborate directly with project managers through your secure client invitation access.
              </p>

              {/* Client Authentication Box */}
              <form onSubmit={handleClientSignIn} className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 mt-2 shadow-sm">
                <h3 className="font-semibold text-base">Client Access Portal</h3>
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Enter your Gmail address"
                    required
                    className="h-10 px-3 rounded-lg bg-background border border-input text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="Enter invitation code"
                    required
                    className="h-10 px-3 rounded-lg bg-background border border-input text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                  <Button type="submit" variant="default" size="lg" className="w-full mt-1">
                    Sign In to Portal
                  </Button>
                </div>
              </form>
            </div>

            {/* Manager View Panel */}
            <div 
              className={`flex flex-col gap-4 transition-all duration-1000 ease-in-out ${
                activeTab === "manager" 
                  ? "opacity-100 translate-y-0 relative" 
                  : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
              }`}
            >
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                Lead a team & <span className="text-[#800020]">manage</span> your<span className="text-primary"> project group.</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Triage incoming reports, assign workflows, and manage team output seamlessly from a single unified dashboard.
              </p>

              {/* Manager Control Center Box */}
              <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 mt-2 shadow-sm">
                <h3 className="font-semibold text-base">Account Control Center</h3>
                <p className="text-sm text-muted-foreground">
                  New to Zenith? Create your administrative account to start organizing your team's project pipeline.
                </p>
                <div className="flex flex-col gap-3 mt-1">
                  <Button 
                    onClick={() => handleManagerAction(true)} 
                    variant="default" 
                    size="lg" 
                    className="w-full"
                  >
                    Create Account
                  </Button>
                  <Button 
                    onClick={() => handleManagerAction(false)} 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                  >
                    Sign In to Existing Account
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Video Preview Placeholder */}
        <div className="w-full h-[420px] lg:h-[500px] bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center relative shadow-lg overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="flex flex-col items-center gap-3 text-center z-10 p-6 border border-dashed border-border rounded-xl w-full h-full justify-center bg-background/50">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              ▶
            </div>
            <h4 className="font-semibold text-foreground text-lg">Zenith Product Showcase</h4>
            <p className="text-sm text-muted-foreground max-w-sm">
              Product demo video recording placeholder. 
            </p>
          </div>
        </div>

      </div>

      {/* FEATURES SECTION (Smooth scroll target) */}
      <FeaturesSection />
    </div>
  );
}
