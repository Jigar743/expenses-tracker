import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="h-20 shadow-md w-full">
      <div className="container mx-aut h-full flex justify-between items-center">
        <span className="text-4xl cursor-pointer">Expeneses</span>
        {isAuthenticated ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-2 items-center">
                {user?.name} <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => router.push("/my-profile")}>
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/change-password")}
                >
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={logout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
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
