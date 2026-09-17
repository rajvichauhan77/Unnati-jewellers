import React from "react";
import "../../../styles/Home/SuvarnaScheme.css";

/**
 * SuvarnaScheme — Static section with membership card visual
 * All content is static brand copy. Update text directly in this file.
 */

const BENEFITS = [
  "Pay 11 monthly installments and get the 12th installment as a bonus from Unnati.",
  "Redeem for any hallmark jewellery with no hidden making charges or wastage.",
  "Flexible monthly installments starting as low as ₹1,000.",
];

const CheckCircle = () => (
  <svg
    className="ss-check"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const DiamondIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D0A737" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2 L20 8 L17 20 L7 20 L4 8 Z" />
    <path d="M4 8 L12 14 L20 8" />
  </svg>
);

export default function SuvarnaScheme() {
  return (
    <section className="ss-section my-xl-5 my-lg-5 my-md-4 my-sm-3 my-3" aria-label="Suvarna Unnati Savings Scheme">
      <div className="ss-container container py-lg-5 py-md-5 py-sm-3 py-3">

        {/* ── Left: content ───────────────────────── */}
        <div className="ss-left">
          <span className="ss-eyebrow">Savings Scheme</span>
          <h2 className="ss-heading">Suvarna Unnati Savings Scheme</h2>

          <ul className="ss-benefits" role="list">
            {BENEFITS.map((text, i) => (
              <li key={i} className="ss-benefit">
                <CheckCircle />
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <a href="/suvarna-scheme" className="ss-cta">
            Join the Scheme
          </a>
        </div>

        {/* ── Right: membership card ───────────────── */}
        <div className="ss-right">
          {/* Background decorative icon */}
          <div className="ss-bg-icon" aria-hidden="true">
            <svg viewBox="0 0 120 120" fill="none" className="ss-bg-svg">
              <path
                d="M60 5 L110 30 L110 90 L60 115 L10 90 L10 30 Z"
                stroke="rgba(208,167,55,0.2)"
                strokeWidth="2"
                fill="rgba(208,167,55,0.05)"
              />
            </svg>
          </div>

          <div className="ss-card" role="img" aria-label="Suvarna Unnati Priority Member card">
            {/* Card top row */}
            <div className="ss-card__top">
              <div className="ss-card__name-block">
                <p className="ss-card__brand">SUVARNA UNNATI</p>
                <p className="ss-card__tier">PRIORITY MEMBER</p>
              </div>
              <DiamondIcon />
            </div>

            {/* Chip */}
            <div className="ss-card__chip" aria-hidden="true" />

            {/* Card number */}
            <p className="ss-card__number">•••• •••• •••• 1993</p>

            {/* Card bottom row */}
            <div className="ss-card__bottom">
              <div>
                <p className="ss-card__meta-label">MEMBER SINCE</p>
                <p className="ss-card__meta-value">10 / 22</p>
              </div>
              <p className="ss-card__issuer">Unnati Jewellers</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}