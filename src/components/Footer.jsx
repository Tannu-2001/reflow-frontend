import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-left">
          <div className="footer-logo">Reflow</div>
          <p className="footer-text">
            Design & engineering — building thoughtful digital products.
          </p>
          <span className="footer-copy">
            © 2025 Reflow Agency
          </span>
        </div>

        <div className="footer-links">
          <Link to="/projects">Projects</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>

      </div>
    </footer>
  );
}