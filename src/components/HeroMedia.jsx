import React from "react";

export default function HeroMedia() {
  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900 via-gray-900 to-black border border-gray-700 shadow-2xl">
      <img
        src="https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1200"
        alt="Product mockup"
        className="w-full h-80 object-cover opacity-80"
      />
      <div className="p-5">
        <div className="text-xs uppercase tracking-[0.2em] text-gray-400">
          Case study
        </div>
        <div className="text-lg font-semibold text-white mt-1">
          Smart energy dashboard
        </div>
        <p className="text-gray-400 mt-2 text-sm">
          A responsive product for data-heavy users.
        </p>
      </div>
    </div>
  );
}