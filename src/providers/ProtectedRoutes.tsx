import { useAuth } from "@/hooks/useAuth";
import React from "react";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return children;
}
