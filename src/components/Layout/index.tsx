import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  switch (router.pathname) {
    case "/404":
      return <>{children}</>;
    // we can add more cases here
    default:
      return (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 py-4">{children}</main>
          <Footer />
        </div>
      );
  }
}
