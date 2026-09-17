// ─── Footer — Main Composed Component ────────────────────
// Sections: Hero CTA  ·  Brand  ·  4 Link Columns  ·  QR  ·  Bottom bar

import "./Footer.css";

import { Link } from "react-router-dom";
import FooterBrand from "./FooterBrand";
import FooterColumn from "./FooterColumn";
import FooterBottom from "./FooterBottom";
import QRCode from "./QRCode";
import { FOOTER_COLUMNS } from "../../../data/footerData";

/* ── Hero / CTA section above the footer grid ── */
const HeroCTA = () => (
  <div className="uj-hero">
    <div className="uj-hero-bg" />
    <div className="uj-hero-overlay" />
    <div className="uj-hero-content">
      <h3 className="uj-hero-title">Where Trust Meets Growth</h3>
      <Link to="/book-appointment" className="uj-hero-btn">Book Your Showroom Visit</Link>
    </div>
  </div>
);

/* Google Play icon */
const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 3.5L20.5 12 3 20.5V3.5Z" fill="white" opacity="0.9" />
    <path d="M3 3.5L11.5 12 3 20.5V3.5Z" fill="#D4AF37" opacity="0.7" />
  </svg>
);

/* Apple icon */
const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.19 1.28-2.17 3.81.03 3.02 2.65 4.03 2.68 4.04l-.06.27zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

/* ── Main Footer ── */
const Footer = () => {
  return (
    <footer className="uj-footer">
      {/* Hero CTA banner */}
      <HeroCTA />

      <div className="container">
        {/* Link grid */}
        <div className="uj-footer-main">
          {/* Brand description */}
          <FooterBrand />

          {/* 4 link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}

          {/* QR code */}
          <div className="uj-footer-qr-col">
            <div className="uj-footer-qr">
              <QRCode />
            </div>
            {/* App store badges below QR code (side-by-side on mobile) */}
            <div className="uj-footer-qr-apps">
              <a
                href="https://play.google.com/store/apps/details?id=com.unnati.jewellers&hl=en_IN"
                target="_blank"
                rel="noopener noreferrer"
                className="uj-app-badge"
                aria-label="Get it on Google Play"
              >
                <span className="uj-app-badge-icon">
                  <PlayIcon />
                </span>
                <span className="uj-app-badge-text">
                  <span className="uj-app-badge-sub">GET IT ON</span>
                  <span className="uj-app-badge-name">Google Play</span>
                </span>
              </a>

              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="uj-app-badge"
                aria-label="Download on the App Store"
              >
                <span className="uj-app-badge-icon">
                  <AppleIcon />
                </span>
                <span className="uj-app-badge-text">
                  <span className="uj-app-badge-sub">Download on the</span>
                  <span className="uj-app-badge-name">App Store</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar: copyright · legal · app stores */}
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
