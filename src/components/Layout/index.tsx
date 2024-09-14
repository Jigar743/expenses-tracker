import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="my-4 w-[70%] m-auto">{children}</main>;
}
