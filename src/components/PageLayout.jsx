import React from "react";

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-6xl px-6 lg:px-12 py-16">
        {children}
      </div>
    </div>
  );
}