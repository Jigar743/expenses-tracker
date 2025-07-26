import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, PiggyBank, User } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-16 flex justify-between items-center px-6">
        {/* Brand Section */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => router.push("/")}
        >
          <PiggyBank className="w-7 h-7 text-blue-600 group-hover:scale-110 transition-transform" />
          <div>
            <h1 className="text-xl font-extrabold text-gray-800">
              Expenses<span className="text-blue-600">Tracker</span>
            </h1>
            <p className="text-xs text-gray-500 leading-none">
              Track your spending smartly
            </p>
          </div>
        </div>

        {/* Auth Section */}
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition">
              {/* Avatar or Placeholder */}
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                {user?.name?.charAt(0).toUpperCase() || (
                  <User className="w-4 h-4" />
                )}
              </div>
              <span className="font-medium text-gray-700">{user?.name}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => router.push("/my-profile")}>
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/change-password")}>
                Change Password
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 font-semibold hover:bg-red-50 transition"
                onClick={logout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="px-6 rounded-full hover:border-blue-500 hover:text-blue-600 transition"
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </Button>
            <Button
              className="px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition"
              onClick={() => router.push("/auth/login")}
            >
              Log In
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
