// this is the useState hook for the client, manager switch

import { useState } from "react";

// This is the custom hook for the client/manager auth switch and inputs
export function useLandingAuth() {
  const [activeTab, setActiveTab] = useState<"client" | "manager">("manager"); // Strictly "client" or "manager"
  const [clientEmail, setClientEmail] = useState<string>("");
  const [inviteCode, setInviteCode] = useState<string>("");

  const handleClientSignIn = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // TODO: Connect to authentication/invite-validation API later
    console.log("Validating client invitation code...", { clientEmail, inviteCode });
  };

  const handleManagerAction = (isSignUp: boolean = true): void => {
    // TODO: Handle manager registration or login routing
    console.log(isSignUp ? "Redirecting to Manager Registration..." : "Redirecting to Manager Sign In");
  };

  return {
    activeTab,
    setActiveTab,
    clientEmail,
    setClientEmail,
    inviteCode,
    setInviteCode,
    handleClientSignIn,
    handleManagerAction,
  };
}