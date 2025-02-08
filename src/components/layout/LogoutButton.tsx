"use client";
import { signOut } from "next-auth/react";
import Button from "../Button";

const LogoutButton = () => {
  const onLogout = async () => {
    await signOut();
  };

  return (
    <div className="w-20">
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
};

export default LogoutButton;
