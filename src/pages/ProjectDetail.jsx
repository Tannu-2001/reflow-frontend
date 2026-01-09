import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { API_BASE } from "../services/api";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion"; 

export default function ProjectDetail() {
  const { id } = useParams();  
  useEffect(() => {
    window.scrollTo({
      top:0,
      left:0,
      behavior:"smooth",
    })
  },[])

   
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ setZoomImage]= useState(false);

  const galleryRef = useRef(null);

  // 🔹 Project data load karna
  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/api/projects/${id}`);
        if (!res.ok) throw new Error("Failed to load project");

        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error(err);
        setError("Could not load project.");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  // 🔹 description ko paragraph mein todna
  const paragraphs = project?.description 
    ? project.description.split("\n\n")
    : [];

  // 🔹 auto slow slider
  useEffect(() => {
    const container = galleryRef.current;
    if (!container || !project?.gallery?.length) return;

    let scrollSpeed = 0.5; // yahan se speed change kar sakti ho
    let frameId;

    const smoothScroll = () => {
      container.scrollLeft += scrollSpeed;

      // last tak pahunchte hi wapas start
      if (
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth - 2
      ) {
        container.scrollLeft = 0;
      }

      frameId = requestAnimationFrame(smoothScroll);
    };

    smoothScroll();
    return () => cancelAnimationFrame(frameId);
  }, [project]);

  return (
    <PageShell>
      <div style={{ background: project?.themeColor || "#ffffff", minHeight: "100vh", padding: "background 0.6s ease"}} className="project-text">
      <Link to="/projects" className="back-link">
        ← Back to projects
      </Link>

      {loading && <p>Loading project…</p>}
      {error && <p className="error-text">{error}</p>}

      {project && (
        <article className="case-wrapper">
          {/* TOP TITLE */}
          <div className="field-border">
            <section className="case-hero">
             <motion.h1
              className="case-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
>
             <Typewriter
              onInit={(typewriter) =>
              typewriter.typeString(project.title).start() }
              options={{
              delay: 65}}></Typewriter></motion.h1>
              {project.summary && (
                <motion.p
                className="case-summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}>
               {project.summary}
               </motion.p>
              )}
            </section>
          </div>

          {/* DESCRIPTION LEFT + META RIGHT */}
          <section className="case-intro">
            <div className="case-description-main">
              {paragraphs.map((text, idx) => (
                <p key={idx} className="case-paragraph">
                  {text}
                </p>
              ))}
            </div>

            <aside className="case-meta">
              {project.client && (
                <div className="meta-block">
                  <h4>Client</h4>
                  <p>{project.client}</p>
                </div>
              )}

              {project.year && (
                <div className="meta-block">
                  <h4>Year</h4>
                  <p>{project.year}</p>
                </div>
              )}

              {project.services?.length > 0 && (
                <div className="meta-block">
                  <h4>Services</h4>
                  <p>{project.services.join(", ")}</p>
                </div>
              )}

              {project.location && (
                <div className="meta-block">
                  <h4>Location</h4>
                  <p>{project.location}</p>
                </div>
              )}
            </aside>
          </section>

          {(project.videoUrl || project.videoMp4) && (
  <section className="full-video-block">
    <video
      autoPlay
      muted
      loop
      playsInline
      className="full-video"
      controls={false}
    >
      {project.videoUrl && (
        <source src={project.videoUrl} type="video/webm" />
      )}
      {project.videoMp4 && (
        <source src={project.videoMp4} type="video/mp4" />
      )}
    </video>
  </section>
)}

          {Array.isArray(project.heroImage) && project.heroImage.length > 0 ? (
  <section className="case-hero-collage">
    <div className="hero-grid">
      {project.heroImage.map((src, idx) => (
        <div key={idx} className="hero-card">
          <img 
            src={src} 
            alt={`${project.title} screen ${idx + 1}`} 
            className="zoomable"
            onClick={() => setZoomImage(src)}
          />
        </div>
      ))}
    </div>
  </section>
) : (
  // Fallback: Single hero thumbnail
  project.thumbnail && (
    <section className="case-hero-image-section fade-in-hero">
      <img
        src={project.thumbnail}
        alt={project.title}
        className="case-hero-image zoomable"
        onClick={() => setZoomImage(project.thumbnail)}
      />
    </section>
)
)}
          

  {/* GALLERY + AUTO SLIDER */}
          {project.gallery?.length > 0 && (
            <section className="case-gallery">
              <div className="gallery-header">
                <h2>Gallery</h2>
                <div className="gallery-controls">
                </div>
              </div>

              <div className="gallery-track" ref={galleryRef}>
                {project.gallery.map((url, i) => (
                  <div className="gallery-card" key={i}>
                    <img src={url} alt={`Shot ${i + 1}`} />
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {project.liveUrl && (
            <div className="live-link-box">
              <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="live-btn"
              >Live Website</a>

            </div>
          )}

            {project.details && (
  <section className="details-section">
    <div className="field-border">

    {project.details.split("\n\n").map((para, index) => (
      <p key={index} className="details-paragraph">
        {para}
      </p>
    ))}
    </div>
  </section>
)}

{/* ---- BIG IMAGE SECTION ---- */}
{project.bigImage && (
  <section className="big-image-section">
    <img 
      src={project.bigImage} 
      alt="Project Big Visual" 
      className="big-image"
    />
  </section>
)}

        </article>
      )}
      </div>
    </PageShell>
  );
}
