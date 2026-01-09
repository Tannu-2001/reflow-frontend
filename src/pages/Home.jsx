import React, { useEffect, useRef, useState,} from "react";
import PageShell from "../components/PageShell";
import { Link } from "react-router-dom";
import { API_BASE } from "../services/api";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Loader from "../components/Loader"

const HOME_BRAND_LOGOS = [
  {
    name:"basf",
    logo:"/logos/basf.svg"
  },
  {
    name:"bot",
    logo:"/logos/bot.svg"
  },
  {
    name:"boti",
    logo:"/logos/boti.svg"
  },
  {
    name:"bri",
    logo:"/logos/bri.svg"
  },
  {
    name:"charge",
    logo:"/logos/charge.svg"
  },
  {
    name:"deep",
    logo:"/logos/deep.svg"
  },
  {
    name:"inten",
    logo:"/logos/inten.svg"
  },
  {
    name:"josys",
    logo:"/logos/josys.svg"
  },
  {
    name:"key",
    logo:"/logos/key.svg"
  },
  {
    name:"lav",
    logo:"/logos/lav.svg"
  },
  {
    name:"logo",
    logo:"/logos/logo.svg"
  },
  {
    name:"plat",
    logo:"/logos/plat.svg"
  },
  {
    name:"sev",
    logo:"/logos/sev.svg"
  },
  {
    name:"sing",
    logo:"/logos/sing.svg"
  },
  {
    name:"web",
    logo:"/logos/web.svg"
  },
  {
    name:"yah",
    logo:"/logos/yah.svg"
  }
  
]
export default function Home() {
  const rRef = useRef(null);
  const [pageReady, setPageReady] = useState(false);
  const [showLoader, setShowLoader] = useState(() => {
  return !sessionStorage.getItem("homeLoaded");
  });
  const [projects, setProjects] = useState([]);
  const [activeProjectId, setActiveProjectId] = useState(null);

  const headingText = "Working with Reflow";
  const whiteHeadingLines = [
    "We don’t just build",
    "brands, we shape how",
     "people feel about them."
  ];

/*-----HERO MOUSE EFFECT------*/

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;

      if (rRef.current) {
        rRef.current.style.transform = `
          rotateX(${-y}deg)
          rotateY(${x}deg)
        `;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);


  useEffect(() => {
    if (!pageReady) return;

  const blackSection = document.querySelector(".rf-black-section");
  const whiteSection = document.querySelector(".rf-white-section");

  const video = document.querySelector(".rf-black-video");
  const text = document.querySelector(".rf-black-text");
  const cols = document.querySelectorAll(".rf-white-col");

  const onScroll = () => {
    const vh = window.innerHeight;

    /* ---------- BLACK SECTION ---------- */
    if (blackSection && video && text) {
      const rect = blackSection.getBoundingClientRect();
      let progress = (vh - rect.top) / (vh + rect.height);
      progress = Math.min(Math.max(progress * 1.25, 0), 1);

      video.style.transform = `translateY(${(0.5 - progress) * 180}px)`;

      const value = Math.round(progress * 255);
      text.style.color = `rgb(${value}, ${value}, ${value})`;
    }

    /* ---------- WHITE SECTION COLUMNS ---------- */
    if (whiteSection && cols.length) {
      const rect = whiteSection.getBoundingClientRect();
      let progress = (vh - rect.top) / vh;
      progress = Math.min(Math.max(progress, 0), 1);

      cols.forEach((col, i) => {
        const delay = i * 0.18;
        const local = Math.min(
          Math.max((progress - delay) * 1.4, 0),
          1
        );

        col.style.opacity = local;
        col.style.transform = `translateY(${40 - local * 40}px)`;
      });
    }
  };

  window.addEventListener("scroll", onScroll);
  setTimeout(onScroll,80);
  return () => window.removeEventListener("scroll", onScroll);
}, [pageReady]);

/*----loader----*/
useEffect(() => {
  if (showLoader) {
    const timer = setTimeout(() => {
      sessionStorage.setItem("homeLoaded", "true");
      setShowLoader(false);

      // 🔥 IMPORTANT
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPageReady(true);
        });
      });
    }, 1800);

    return () => clearTimeout(timer);
  } else {
    setPageReady(true);
  }
}, [showLoader]);

  /*----------PROJECT FETCH----------*/
 useEffect(() => {
  async function fetchProjects() {
    try {
      const res = await fetch(`${API_BASE}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects", err);
    }
  }

  fetchProjects();
}, []);

if (showLoader) {
  return <Loader />
}

  return (
    <PageShell>
      <section className="rf-hero">
        <div className="rf-grid" />
        <div className="rf-text">
            <h1>
              Brands and websites that <br />
              move people and <br />
              drive growth.
            </h1>
          </div>
        <div className="rf-center">
          <div className="rf-r" ref={rRef}>
            <div className="r-stem" />
            <div className="r-top" />
            <div className="r-bowl" />
            <div className="r-leg" />
          </div>
        </div>
      </section>
      {/*black screen*/}
      <section className="rf-black-section">
        <div className="rf-black-inner">
          <div className="rf-black-video">
            <video src="/assets/images/home.black.webm" autoPlay muted loop playsInline/>
          </div>
          <div className="rf-black-text">
            <p>Reflow combines strategic thinking with creative precision to help ambitious teams translate who they are into brands people can feel.
               Every project begins by understanding what drives your audience and aligning it with your brand’s purpose, turning vision into emotional resonance.
                With a senior team and a process built for speed, Reflow crafts brands and websites that feel intentional, perform beautifully, and move fast without compromise.</p>

          </div>
        </div>
      </section>
      {/*white section*/}
      <section className="rf-white-section">
  <div className="rf-white-inner">
    
<div className="rf-white-head">
  <motion.h2
    className="rf-white-title"
    initial={{ scale: 1.35, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true, margin: "-120px" }}
    transition={{
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {whiteHeadingLines.map((line, li) => (
      <div key={li} className="rf-line">
        {line.split("").map((char, ci) => (
          <motion.span
            key={ci}
            className="rf-char"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: li * 0.25 + ci * 0.035,
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    ))}
  </motion.h2>

  <div className="rf-white-border"></div>
</div>
    <div className="rf-white-columns">
      <p className="rf-white-col rf-white-col-left">
        We work with ambitious teams to shape digital experiences that feel
        intentional, emotional, and precise. Every detail is crafted to connect
        strategy with design.
      </p>

      <p className="rf-white-col rf-white-col-right">
        From identity systems to high-performance websites, our process blends
        clarity, speed, and craftsmanship — without unnecessary complexity.
      </p>
    </div>
    <div className="rf-white-border"></div>


  </div>
{/* Service section */}
{/*Brand Strategy*/}
  <div className="rf-services-inner">
    <div className="rf-service">
      <div className="rf-service-left">
        <h3>Brand<br />Strategy</h3>
      </div>
      <div className="rf-service-right">
        <p>
          Reflow builds brands with purpose and clarity combining branding
          strategy, visual identity, and storytelling to create real emotional
          connection, the highest source of engagement. Our process aligns
          your vision with your audience, delivering a brand that inspires,
          differentiates, and converts across every touch point.
        </p>
         <Link to="/services/branding" className="rf-service-link">Learn more →</Link>
      </div>
      {/*image*/}
      <div className="rf-service-image-wrap">
        <img src="/assets/images/brand-strategy.webp"
        alt="Service Visual"
        className="rf-service-image" />
      </div>
    </div>
 <div className="rf-white-border"></div>

    {/*Web Design*/}
    <div className="rf-service">
      <div className="rf-service-left">
        <h3>Web<br />Design</h3>
      </div>
      <div className="rf-service-right">
        <p>
         At Reflow, web design is where creativity meets functionality. We
         craft visually striking and emotionally engaging websites that capture
         your brand's essence. Our designs blend beauty with seamless
         navigation, enhanced by micro-interactions and Lottie animations.
         Every detail, from concept to pixel, aligns with your vision and
         business goals.
        </p>
        <Link to="/services/web design" className="rf-service-link">Learn more →</Link>
      </div>
      {/*image*/}
      <div className="rf-service-image-wrap">
        <img src="/assets/images/web-design.webp"
        alt="Service Visual"
        className="rf-service-image" />
      </div>
    </div>
 <div className="rf-white-border"></div>

    {/*Webflow Development*/}
    <div className="rf-service">
      <div className="rf-service-left">
        <h3>Webflow<br />Development</h3>
      </div>
      <div className="rf-service-right">
        <p>
         Webflow development is at the heart of what we do. Using
         Webflow's power and flexibility, we create fully functional,
         customizable, responsive websites quickly, repurposing saved time to
         enhance user experiences. Our expertise includes API integrations
         and building on top of Webflow, delivering robust, scalable, and
         easy-to-manage sites.
        </p>
        <Link to="/services/webflow development" className="rf-service-link">Learn more →</Link>
      </div>
      {/*image*/}
      <div className="rf-service-image-wrap">
        <img src="/assets/images/webflow.webp"
        alt="Service Visual"
        className="rf-service-image" />
      </div>
    </div>
     <div className="rf-white-border"></div>
    
    {/*Creative Development*/}
    <div className="rf-service">
      <div className="rf-service-left">
        <h3>Creative<br />Development</h3>
      </div>
      <div className="rf-service-right">
        <p>
       Creative development at Reflow brings innovation to life. Our team
       combines artistic vision with technical expertise, using WebGL (with
       ThreeJS), GSAP, and AI integrations to create captivating,
       high-performing websites. We fuse creativity with strategy to drive
       engagement and measurable results.
        </p>
      <Link to="/services/creative dev" className="rf-service-link">Learn more →</Link>
      </div>
      {/*image*/}
      <div className="rf-service-image-wrap">
        <img src="/assets/images/creative-development.webp"
        alt="Service Visual"
        className="rf-service-image" />
      </div>
    </div>
    <div className="rf-white-border"></div>
  </div>
  </section>


   {/*marqueelogos*/}
    <section className="brand-marquee">
      <div className="brand-inner">
        <div className="marquee-track">

          {[...HOME_BRAND_LOGOS, ...HOME_BRAND_LOGOS].map((item, i) => (
            <div className="logo-item" key={`${item.name}-${i}`}>
              <img src={item.logo} alt={item.name} />
            </div>
          ))}
        </div>
      </div>

    </section>

    {/* PROJECTS SECTION – SAME AS Project.jsx */}
<section className="home-projects">
  <div className="projects-brands">
    {projects.slice(0,5).map((p) => {
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
          transition: "0.4s ease",
          color: "#fff",
        }}
      >
        {/* LEFT */}
        <div className="project-main">
          <div className="project-header-row">
            <h2 className="project-title">
              {p.title || "Untitled project"}
            </h2>

            <div className="projects-tags">
              {p.client && <span>{p.client}</span>}
              {p.year && <span>. {p.year}</span>}
              {Array.isArray(p.services) && p.services.length > 0 && (
                <span>.{p.services.join(",")}</span>
              )}
            </div>
          </div>

          <p className="project-summary-line">
            {shortSummary || "No description yet."}
          </p>

          <Link
            to={`/projects/${p.slug || p._id}`}
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
  </div>
</section>

{/* WORKING WITH REFOKUS */}
<section className="rf-working">

  {/* TOP RIGHT HEADING */}
  <div className="rf-working-heading">
  <motion.h2
    className="rf-working-title"
    initial={{ scale: 1.35, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true, margin: "-120px" }}
    transition={{
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {headingText.split("").map((char, i) => (
      <motion.span
        key={i}
        className="rf-char"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.25 + i * 0.045,
          duration: 0.45,
          ease: "easeOut",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </motion.h2>

  <div className="rf-working-line"></div>
</div>
  {/* CONTENT BELOW LINE */}
  <div className="rf-working-content">

    {/* LEFT TERMINOLOGY */}
    <div className="rf-working-left">
      <p className="rf-working-label">Testimonials /</p>
      <p className="rf-working-text">
        Take a deeper look at what we do for our clients
        and partners.
      </p>
      <Link to="/projects" className="rf-working-link">
        Projects →
      </Link>
    </div>

    {/* CENTER CARD */}
    <div className="rf-working-card">
      <img
        src="/assets/images/resume-image.jpg"
        alt="Client"
      />
      <div className="rf-working-content-right">
        <p className="rf-working-quote">
        Working with Reflow is an absolute pleasure. They
        are artists of their craft, with passion and patience
        to understand the objective and reach it in an
        ultimate way.
      </p>

      <div className="rf-working-author">
        <strong>Tannu Kumari</strong>
        <span>Remind</span>
      </div>
      </div>
    </div>

  </div>
</section>

  </PageShell>
  );
}