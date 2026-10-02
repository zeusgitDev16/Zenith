// src/app/App.tsx
import React from "react";
import { Navbar } from "@/shared/ui/Navbar/Navbar";
import { LandingPage } from "@/pages/LandingPage/LandingPage";

export function App(): React.JSX.Element {
  return (
    <div>
      <Navbar />
      <LandingPage />
    </div>
  );
}