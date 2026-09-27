// src/store/useAuthStore.js
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  // Global State
  user: null,          // Holds user details (e.g., email, invite code)
  isAuthenticated: false,
  role: "client",      // Can be "client" or "manager"

  // Actions (Global functions to modify the state)
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