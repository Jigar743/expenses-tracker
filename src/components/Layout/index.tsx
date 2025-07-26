import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { LoaderCircle } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoaderCircle className="animate-spin text-blue-600 w-10 h-10" />
      </div>
    );
  }

  switch (router.pathname) {
    case "/404":
      return <>{children}</>;
    // we can add more cases here
    default:
      return (
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-1 container mx-auto">{children}</main>
          <Footer />
        </div>
      );
  }
}
