import React from "react";
import { Link } from "react-router-dom";

const FooterBottom = () => {
  return (
    <div className="uj-footer-bottom">
      {/* Copyright */}
      <span className="uj-footer-copy">
        © 2026 All Rights Reserved by Unnati Jewellers.
      </span>

      {/* Legal links pointing to separate pages */}
      <div className="uj-footer-legal">
        <Link to="/privacy-policy" className="uj-footer-legal-link">
          Privacy Policy
        </Link>
        <span className="uj-footer-legal-sep">|</span>
        <Link to="/terms-conditions" className="uj-footer-legal-link">
          Terms &amp; Condition
        </Link>
      </div>

      {/* Crafted and designed credits */}
      <span className="uj-footer-crafted">
        crafted and design by{" "}
        <a
          href="https://www.pixeline.co.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pixeline
        </a>
      </span>
    </div>
  );
};

export default FooterBottom;
