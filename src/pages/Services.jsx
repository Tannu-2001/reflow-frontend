import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { API_BASE } from "../services/api";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

// helper to build path (slug preferred)
function getServicePath(service) {
  if (service.slug) return `/services/${service.slug}`;
  if (service._id) return `/services/${service._id}`;
  return "#";
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeId, setActiveId] = useState(null);

  const SERVICE_CATEGORIES = [
    "Branding",
    "Web Design",
    "Webflow Development",
    "Creative Development",
    "Strategy",
    "3D Animations",
  ];


  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_BASE}/api/services`);
        if (!res.ok) throw new Error("Failed to load services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error(err);
        setError("Could not load services. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

 useEffect(() => {
  const bg = document.querySelector(".service-bg");
  if (!bg) return;

  const onMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 120;
    const y = (e.clientY / window.innerHeight - 0.5) * 120;

    bg.style.setProperty("--px", x);
    bg.style.setProperty("--py", y);
  };

  window.addEventListener("mousemove", onMove);
  return () => window.removeEventListener("mousemove", onMove);
}, []);


  return (
    <PageShell>
      <div className="service-page">
      <section className="projects-hero">
        <div className="service-bg-wrap">
           <div className="service-bg"></div>
        </div>
        <div className="service-hero-content">
        <div className="field-border">
          <motion.h1
            className="projects-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typewriter
              onInit={(tw) => tw.typeString("Services").start()}
              options={{ cursor: "|", delay: 50 }}
            />
          </motion.h1>

          <motion.p
            className="projects-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            Branding, Web Design, Webflow, Creative Development, and beyond
          </motion.p>
        </div>
        </div>
      </section>

      {loading && <p>Loading services…</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <div className="projects-bands">
          {services.map((s) => {
            const id = s._id || s.slug || s.title;
            const isActive = activeId === id;
            const summaryText = s.heroSubtitle || s.summary || s.visionParagraphs?.[0] || "";
            const shortSummary =
              summaryText.length > 180 ? summaryText.slice(0, 177) + "…" : summaryText;

            return (
              <article
                key={id}
                className={`project-band ${isActive ? "active" : ""}`}
                onMouseEnter={() => setActiveId(id)}
                onMouseLeave={() => setActiveId(null)}
                style={{
                  background: isActive ? (s.themeColor || "#000") : "#000",
                  transition: "0.4s ease",
                  color: "#fff",
                }}
              >
                <div className="project-main">
                  <div className="project-header-row">
                    <h2 className="project-title">{s.title || "Untitled service"}</h2>
                  </div>

                  <p className="project-summary-line">{shortSummary || "No summary."}</p>

                  <Link to={getServicePath(s)} className="project-band-link">
                    View service →
                  </Link>
                </div>

                {/* Optional right preview if provided */}
                {s.thumbnail && (
                    <div className="project-preview">
                      <img src={s.thumbnail} alt={s.title} />
                    </div>
                  )}
              </article>
            );
          })}

          {services.length === 0 && <p className="empty-text">No services found yet.</p>}
        </div>
      )}
      </div>
    </PageShell>
  );
}
