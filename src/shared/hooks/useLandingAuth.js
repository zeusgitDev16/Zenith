import { useState } from "react";

export function useLandingAuth() {
  const [activeTab, setActiveTab] = useState("client"); // "client" or "manager"
  const [clientEmail, setClientEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const handleClientSignIn = (e) => {
    e.preventDefault();
    // TODO: Connect to authentication/invite-validation API later
    console.log("Validating client invitation code...", { clientEmail, inviteCode });
  };

  const handleManagerAction = (isSignUp = true) => {
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