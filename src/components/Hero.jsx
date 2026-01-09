import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-6 py-20 lg:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
            Building thoughtful digital products that drive growth.
          </h1>

          <p className="mt-6 text-lg text-slate-600">
            We design and engineer beautiful, high-performing websites and web applications for scaling teams.
            Strategy, design, and engineering under one roof.
          </p>

          <div className="mt-8 flex gap-4">
            <Link to="/contact" className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">Work with us</Link>
            <Link to="/projects" className="px-6 py-3 border border-slate-200 rounded-md text-slate-700">View case studies</Link>
          </div>
        </div>
      </div>
    </section>
  );
}