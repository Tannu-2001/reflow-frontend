import React, { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          name="message"
          rows="4"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full border-b border-gray-300 focus:border-black outline-none py-2 resize-none"
          placeholder="What do you want to build?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-semibold hover:bg-gray-900 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-sm text-green-600 mt-2">
          Message sent. We’ll reply soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 mt-2">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

