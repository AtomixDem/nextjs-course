"use client";
import { signOut } from "next-auth/react";
import { Button } from "../(UI)/Button";

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex justify-center">
      <Button variant="warning" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export { SignOut };