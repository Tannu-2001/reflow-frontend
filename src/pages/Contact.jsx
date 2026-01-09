import React, { useState } from "react";
import PageShell from "../components/PageShell";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";


const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: "" });

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus({
        loading: false,
        error: "",
        success: "Message sent successfully!",
      });

      // form reset
      setForm({
        name: "",
        email: "",
        budget: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        loading: false,
        error: "Something went wrong. Try again.",
        success: "",
      });
    }
  }

  return (
    <PageShell>
      {/* HERO SECTION */}
     <div className="field-border">
  <section className="contact-center-heading">
    {/* HEADING (Typewriter + Motion like Projects page) */}
    <motion.h1
      className="projects-title"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Typewriter
        words={["It’s time to Reflow."]}
        typeSpeed={70}
        deleteSpeed={0}
        loop={1}
        cursor
        cursorStyle="|"
      />
    </motion.h1>

    {/* SUBHEADING SAME STYLE LIKE PROJECTS */}
    <motion.p
      className="projects-sub"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
    >
      Let’s create something amazing, together.
    </motion.p>
  </section>
</div>
      {/* MAIN 2-COLUMN CONTACT LAYOUT */}
      <div className="contact-wrapper">
        {/* LEFT SIDE */}
        <div className="contact-left">
          <p>
            Reflow was a true parent to us in migrating our site to Webflow and then redesigning and rebuilding it. 
            Their quality for work, commitment to meeting deadlines, level of communication, and flexibility to adapt and changing need were top to class.
          </p>

          <div className="contact-profile">
            <img
              src="/assets/images/resume-image.jpg"
              alt="person"
            />
            <div>
              <h4>Tannu Kumari</h4>
              <p>Remind</p>
            </div>
          </div>

          {/* status messages */}
          {status.error && (
            <p className="text-red-600 text-sm mt-4">{status.error}</p>
          )}
          {status.success && (
            <p className="text-green-600 text-sm mt-4">{status.success}</p>
          )}
        </div>

        {/* RIGHT SIDE FORM */}
        <form className="contact-right" onSubmit={handleSubmit}>
          <div className="field">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Your Budget</label>
            <select
              name="budget"
              value={form.budget}
              onChange={handleChange}
            >
              <option value="">Select one...</option>
              <option>$1k - $5k</option>
              <option>$5k - $10k</option>
              <option>$10k+</option>
            </select>
          </div>

          <div className="field">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{10}"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Tell us about your project"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={status.loading}
          >
            {status.loading ? "Sending..." : "Send Message →"}
          </button>
        </form>
      </div>
    </PageShell>
  );
}
