import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { API_BASE } from "../services/api";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";


  gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeProjectId, setActiveProjectId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);


  useEffect(() => {
    async function fetchService() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_BASE}/api/services/${encodeURIComponent(slug)}`
        );
        if (!res.ok) throw new Error("Service not found");
        const data = await res.json();
        setService(data);
      } catch (err) {
        setError("Could not load service.");
      } finally {
        setLoading(false);
      }
    }

    fetchService();
  }, [slug]);

  // ✅ GSAP animation AFTER content is rendered
      useEffect(() => {
  if (!service) return;

  // ❌ Mobile pe GSAP scroll animation mat chalao
  if (window.innerWidth <= 768) return;

  const texts = gsap.utils.toArray(".reveal-text");
  const section = document.querySelector(".case-description-main");

  if (!section) return;

  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    const progress = Math.min(
      Math.max((vh - rect.top) / (vh + rect.height), 0),
      1
    );

    gsap.set(texts, {
      backgroundPosition: `${100 - progress * 100}% 0`,
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  return () => window.removeEventListener("scroll", onScroll);
}, [service]);

  const paragraphs =
    service?.visionParagraphs ||
    (service?.description ? service.description.split("\n\n") : []);

  return (
    <PageShell>

      {/* ---------------- HERO IMAGE + TEXT + BACK LINK ---------------- */}
      <div
        className="service-hero-image"
        style={{
          backgroundImage: service?.backgroundImage
            ? `url(${service.backgroundImage})`
            : "none",
        }}
      >

        {/* BACK LINK ABSOLUTE TOP-LEFT */}
        <Link to="/services" className="back-link">
          ← Back to services
        </Link>

        {/* TEXT OVER IMAGE */}
        <div className="service-hero-text">
          <motion.h1
            className="service-heading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {service?.title && (
                <Typewriter
              onInit={(tw) =>
                tw.typeString(service?.title).start()
              }
              options={{ cursor: "", delay: 40 }}
            />
            )}
          </motion.h1>

          {service?.heroSubtitle && (
            <motion.p
              className="service-subtitle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {service.heroSubtitle}
            </motion.p>
          )}

          {/* FIELD-BORDER RIGHT UNDER HEADING (INSIDE IMAGE!!) */}
          <div className="field-border"></div>
        </div>
      </div>

      {/* ---------------- THEME BODY SECTION ---------------- */}
      <div
        className="service-body"
        style={{ background: service?.themeColor || "#ffffff" }}
      >
        <div className="service-body-inner page-wrapper">

          {loading && <p>Loading...</p>}
          {error && <p className="error-text">{error}</p>}

          {service && (
            <article className="case-wrapper">
              <section className="case-intro">

                     <div className="case-description-main">
                  {paragraphs.map((txt, i) => (
                    <p key={i} className="case-paragraph reveal-text">{txt}</p>
                  ))}
                </div>
                <aside className="case-meta">
                 {service.videoUrl&& ( <video className="service-hero-video"autoPlay playsInline muted loop >
                  <source src={service.videoUrl} type="video/webm" /></video>)}
                </aside>
              </section>
              <Link
                    to={`/contact?service=${service.slug}`}
                    className="start-project-btn"
                  >
                    Start a project
                  </Link>
            </article>
          )}
        </div>
      </div>

        {/* WHITE SECTION */}
<section className="white-section">
  <div className="white-inner">
    {/* WHITE TITLE – TYPEWRITER */}
    {service?.whiteTitle && (
      <motion.h2
        className="white-title"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Typewriter
          onInit={(tw) => {
            tw.typeString(service.whiteTitle).start();
          }}
          options={{
            cursor: "",
            delay: 65,     // typing speed (same feel as hero)
          }}
        />
      </motion.h2>
    )}

    {/* BORDER */}
    <div className="field-border dark"></div>
  </div>

    {/* WHITE SUBTITLE – MOTION (RIGHT SIDE) */}
    <div className="white-layout">
         {service?.whiteImage && (
        <div className="white-image">
         <img src={service.whiteImage} alt="" />
         </div>)}

         <div className="white-right">
          {service?.whiteSubtitle && (
      <motion.p
        className="white-subtitle"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.75 }}
        viewport={{ once: true }}
      >
        {service.whiteSubtitle}
      </motion.p>
    )}

   {service?.whiteBodyHtml?.length > 0 && (
  <div className="white-body">
    {service.whiteBodyHtml.map((block, i) => (
      <div
        key={i}
        className={`white-col col-${block.column}`}
        dangerouslySetInnerHTML={{ __html: block.html }}
      />
    ))}
  </div>
)}


 {/* 🔥 STRATEGIC WORK (INSIDE WHITE SECTION) */}
     {service?.strategicWork?.length > 0 && (
    <section className="strategic-block">
      <div className="strategic-inner">

        <h2 className="strategic-heading">Strategic Work</h2>

        <div className="strategic-list">
          {service.strategicWork.map((item, i) => (
            <StrategicItem key={i} item={item} />
          ))}
        </div>

      </div>
    </section>
  )}
</div>
 </div>
</section>

{service?.brandLogos?.length > 0 && (
  <section className="brand-marquee">
    <div className="brand-inner">
      <div className="marquee-track">

      {[...service.brandLogos, ...service.brandLogos].map((item, i) => (
        <div className="logo-item" key={`${item.name}-${i}`}>
          <img src={item.logo} alt={item.name} />
        </div>
      ))}

    </div>
    </div>
  </section>
)}

{/* 🔥 FEATURED PROJECTS (Refokus style) */}
{service?.featuredProjects?.length > 0 && (
  <section className="projects-bands">
    {service.featuredProjects.map((p) => {
      const id = p._id || p.slug || p.title;
      const isActive = activeProjectId === id;

      const summaryText = p.summary || p.description || "";
      const shortSummary =
        summaryText.length > 180
          ? summaryText.slice(0, 177) + "…"
          : summaryText;

      return (
        <article
          key={id}
          className={`project-band ${isActive ? "active" : ""}`}
          onMouseEnter={() => setActiveProjectId(id)}
          onMouseLeave={() => setActiveProjectId(null)}
          style={{
            background: isActive ? (p.themeColor || "#000") : "#000",
            color: "#fff",
            transition: "0.4s ease",
          }}
        >
          {/* LEFT */}
          <div className="project-main">
            <div className="project-header-row">
              <h2 className="project-title">{p.title}</h2>

              <div className="project-tags">
                {p.client && <span>{p.client}</span>}
                {p.year && <span>• {p.year}</span>}
                {Array.isArray(p.services) && p.services.length > 0 && (
                  <span>• {p.services.join(", ")}</span>
                )}
              </div>
            </div>

            <p className="project-summary-line">
              {shortSummary}
            </p>

            <Link
              to={p.slug ? `/projects/${p.slug}` : `/projects/${p._id}`}
              className="project-band-link"
            >
              View case study →
            </Link>
          </div>

          {/* RIGHT IMAGE (hover only) */}
          {p.thumbnail && (
            <div className="project-preview">
              <img src={p.thumbnail} alt={p.title} />
            </div>
          )}
        </article>
      );
    })}
  </section>
)}

    </PageShell>
  );
}
function StrategicItem({ item }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className={`strategic-item ${open ? "open" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="strategic-row">
        <span className="strategic-no">
          {String(item.order).padStart(2, "0")}
        </span>

        <span className="strategic-title">{item.title}</span>

        <span className="strategic-toggle">
          {open ? "−" : "+"}
        </span>
      </div>

      <div className="strategic-content">
        {item.description}
      </div>
    </div>
  );
}