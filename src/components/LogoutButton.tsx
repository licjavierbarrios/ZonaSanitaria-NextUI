"use client";

import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = () => {
    signOut({
      callbackUrl: "/sign-in",
    });
  };
  return <Button onClick={handleLogout}>Log out</Button>;
}
