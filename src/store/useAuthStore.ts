// src/store/useAuthStore.ts
import { create } from "zustand";

// Define the User structure
export interface User {
  email: string;
  inviteCode?: string;
}

// Define the state and actions interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: "client" | "manager";
  signInClient: (email: string, inviteCode: string) => void;
  signInManager: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Global State
  user: null,          // Holds user details (e.g., email, invite code)
  isAuthenticated: false,
  role: "client",      // Can be "client" or "manager"[cite: 4]

  // Actions (Global functions to modify the state)[cite: 4]
  signInClient: (email, inviteCode) => set({
    user: { email, inviteCode },
    isAuthenticated: true,
    role: "client",
  }),

  signInManager: () => set({
    user: { email: "manager@zenith.io" },
    isAuthenticated: true,
    role: "manager",
  }),

  logout: () => set({
    user: null,
    isAuthenticated: false,
    role: "client",
  }),
}));