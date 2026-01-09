
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { API_BASE } from "../services/api";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

// ek helper: slug ho to slug se, warna _id se
function getProjectPath(project) {
  if (project.slug) return `/projects/${project.slug}`;
  if (project._id) return `/projects/${project._id}`;
  return "#";
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeId, setActiveId] = useState(null);
  const PROJECT_CATEGORIES = [
  "Branding",
  "3D Animations",
  "Strategy",
  "Creative Development",
  "Webflow Development",
  "Web Design",
];

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/api/projects`);
        if (!res.ok) throw new Error("Failed to load projects");

        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError("Could not load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <PageShell>
<section className="projects-hero">
  <div className="field-border">
  {/* HEADING */}
  <motion.h1
    className="projects-title"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <Typewriter
      words={["Projects"]}
      typeSpeed={70}
      deleteSpeed={0}
      loop={1}
      cursor
      cursorStyle="|"
    />
  </motion.h1>

  {/* SUBHEADING */}
  <motion.p
    className="projects-sub"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
  >
    Branding, Web Design, Webflow, Creative Development, and beyond
  </motion.p>
  </div>
  <br></br>
  {/* 👉 YAHAN NEW BOX LIST 👇 */}
  <div className="projects-category-list">
    {PROJECT_CATEGORIES.map((cat) => (
      <label key={cat} className="projects-category-item">
        <input type="checkbox" />
        <span>{cat}</span>
      </label>
    ))}
  </div>
</section>
        {loading && <p>Loading projects…</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <div className="projects-bands">
            {projects.map((p) => {
              const id = p._id || p.slug || p.title;
              const isActive = activeId === id;

              const summaryText = p.summary || p.description || "";
              const shortSummary =
                summaryText.length > 180
                  ? summaryText.slice(0, 177) + "…"
                  : summaryText;

              return (
                <article
                  key={id}
                  className={`project-band ${isActive ? "active" : ""}`}
                  onMouseEnter={() => setActiveId(id)}
                  onMouseLeave={() => setActiveId(null)}
                  style={{
                    background: isActive ? (p.themeColor || "#000") : "#000", 
                    transition: "0.4s ease",
                    color: "#fff"
                  }}
                >
                  {/* LEFT: text content */}
                  <div className="project-main">
                    <div className="project-header-row">
                      <h2 className="project-title">
                        {p.title || "Untitled project"}
                      </h2>
                      <div className="project-tags">
                        {p.client && <span>{p.client}</span>}
                        {p.year && <span>• {p.year}</span>}
                        {Array.isArray(p.services) && p.services.length > 0 && (
                          <span>• {p.services.join(", ")}</span>
                        )}
                      </div>
                    </div>

                    <p className="project-summary-line">
                      {shortSummary || "No description yet."}
                    </p>

                    <Link
                      to={getProjectPath(p)}
                      className="project-band-link"
                    >
                      View case study →
                    </Link>
                  </div>

                  {/* RIGHT: preview image (only visible when active) */}
                  {p.thumbnail && (
                    <div className="project-preview">
                      <img src={p.thumbnail} alt={p.title} />
                    </div>
                  )}
                </article>
              );
            })}

            {projects.length === 0 && (
              <p className="empty-text">No projects found yet.</p>
            )}
          </div>
        )}
    </PageShell>
  );
}

