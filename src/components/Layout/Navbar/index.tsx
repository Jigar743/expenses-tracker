import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React from "react";

export default function Navbar() {
  const router = useRouter();

  const { isAuthenticated, user } = useAuth();

  console.log({ isAuthenticated, user });

  return (
    <header className="h-20 shadow-md w-full">
      <div className="container mx-aut h-full flex justify-between items-center">
        <span className="text-4xl cursor-pointer">Expeneses</span>
        {isAuthenticated ? (
          <div>
            <span>{user?.name}</span>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={() =>
                router.push({
                  pathname: "/auth/signup",
                })
              }
              className="px-8"
              variant={"outline"}
            >
              Sign Up
            </Button>
            <Button
              onClick={() => router.push({ pathname: "/auth/login" })}
              className="px-8"
            >
              Log In
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
