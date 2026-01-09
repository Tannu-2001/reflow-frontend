import React from "react";

export default function PageShell({ title, children }) {
  return (
    <div
      className="min-h-[calc(100vh-3.5rem-3rem)] bg-white flex justify-center"
    >
      <div className="w-full max-w-5xl px-6 py-10">
        {title ? (
          <h1 className="text-3xl font-bold mb-4">
            {title}
          </h1>
        ) : null}

        {children}
      </div>
    </div>
  );
}