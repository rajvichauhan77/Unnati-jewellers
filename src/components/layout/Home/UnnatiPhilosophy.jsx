import React from "react";
import "../../../styles/Home/UnnatiPhilosophy.css";

/**
 * UnnatiPhilosophy — Static section
 *
 * BACKEND INTEGRATION (optional CMS control):
 * If you want to make the image dynamic, replace `PHILOSOPHY_IMAGE`
 * with a value fetched from your CMS/admin:
 *
 *   imageUrl: "/api/settings/philosophy-image"
 *
 * The text content is static brand copy — update it here directly.
 */

import philosophyImg from "../../../assets/temp/unnati philosophy (2).webp";

const PHILOSOPHY_IMAGE = philosophyImg;

export default function UnnatiPhilosophy() {
  return (
    <section className="up-section my-xl-5 my-lg-5 my-md-4 my-sm-3 my-3" aria-label="Unnati Philosophy">
      <div className="up-container container py-lg-5 py-md-5 py-sm-3 py-3">

        {/* ── Left: text ──────────────────────────── */}
        <div className="up-left">
          <h2 className="up-heading">
            Gold Is More Than Jewellery;<br />
            It's Our Heritage In A Tangible Form.
          </h2>

          <p className="up-body">
            In our culture, gold represents prosperity, security, and the
            unbreakable bond of family. At Unnati, we treat every ounce
            of gold with the reverence it deserves, ensuring it carries
            the weight of your emotions and the brightness of your future.
          </p>

          <div className="up-divider" aria-hidden="true" />

          <p className="up-label">— THE UNNATI PHILOSOPHY</p>
        </div>

        {/* ── Right: image ─────────────────────────── */}
        <div className="up-right">
          <div className="up-image-wrap">
            <img
              src={PHILOSOPHY_IMAGE}
              alt="Hands exchanging a gold bangle — a symbol of heritage and family"
              className="up-image"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
}