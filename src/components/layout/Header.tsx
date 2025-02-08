import { auth } from "@/auth";
import Link from "next/link";
import React from "react";

import LogoutButton from "./LogoutButton";
import { SquarePen } from "lucide-react";

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-white mb-2 border-b shadow-sm">
      <nav className="container py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-black">
            Blog Platform
          </Link>
          <div className="space-x-4 flex items-center">
            <Link
              href={"/posts/create-post"}
              className="flex items-center gap-2"
            >
              <SquarePen />
              <span className="font-medium text-sm">Write Blog</span>
            </Link>
            {session?.isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="font-medium capitalize text-xl">
                  {session?.user?.name}
                </span>
                <LogoutButton />
              </div>
            ) : (
              <>
                <Link href="/login" className="text-black ">
                  Login
                </Link>
                <Link href="/signup" className="text-black ">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
