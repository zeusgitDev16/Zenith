// src/shared/validators/auth.schema.ts
import { z } from "zod";

/**
 * Zod schema for client portal sign-in validation.
 * Enforces strict email formatting and expected invite code patterns.
 */
export const clientSignInSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid Gmail or email address." })
    .max(255, { message: "Email is too long." }),
  
  inviteCode: z
    .string()
    .trim()
    .min(4, { message: "Invite code must be at least 4 characters long." })
    .max(50, { message: "Invite code is too long." }),
});

// Infer TypeScript type automatically from the Zod schema (DRY principle)
export type ClientSignInFormData = z.infer<typeof clientSignInSchema>;
