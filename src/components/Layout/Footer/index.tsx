import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-gray-600 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-center text-sm">
          © {new Date().getFullYear()} <span className="ml-1 font-semibold">Expenses Tracker</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
