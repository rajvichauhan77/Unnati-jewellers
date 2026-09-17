import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/Home/UnnatiWorld.css";
import { useUnnatiWorld } from "../../../hooks/useUnnatiWorld";

export default function UnnatiWorld() {
  const { worlds: dynamicWorlds, loading } = useUnnatiWorld();

  if (loading || !dynamicWorlds || dynamicWorlds.length === 0) {
    return null;
  }
  
  const activeWorlds = dynamicWorlds.slice(0, 4);

  const [featured, ...rest] = activeWorlds;

  return (
    <section className="uw-section mb-xl-5 mb-lg-5 mb-md-4 mb-sm-3 mb-3" aria-label="Unnati World">
      <div className="uw-container container pb-lg-5 pb-md-5 pb-sm-1 pb-1">

        {/* ── Section header ───────────────────────── */}
        <div className="uw-header">
          <h2 className="uw-title">Unnati World</h2>
          <p className="uw-subtitle">A companion for every occasion</p>
        </div>

        {/* ── Bento grid ───────────────────────────── */}
        <div className="uw-grid" role="list">

          {/* Large featured card — left column full height */}
          {featured && (
            <WorldCard
              item={featured}
              className="uw-card--featured"
            />
          )}

          {/* Right column: top card + two bottom cards */}
          <div className="uw-right-col">
            {rest[0] && (
              <WorldCard item={rest[0]} className="uw-card--top" />
            )}
            <div className="uw-bottom-row">
              {rest[1] && (
                <WorldCard item={rest[1]} className="uw-card--bottom-left-card" />
              )}
              {rest[2] && (
                <WorldCard item={rest[2]} className="uw-card--bottom-right-card" />
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function WorldCard({ item, className = "" }) {
  const { imageUrl, title, subtitle, path } = item;
  const resolvedPath = path || "/collections/products";

  return (
    <article
      className={`uw-card ${className}`}
      role="listitem"
    >
      <Link
        to={resolvedPath}
        className="uw-card__link"
        aria-label={`Explore ${title} — ${subtitle}`}
      >
        <div className="uw-card__image-wrap">
          <img
            src={imageUrl}
            alt={title}
            className="uw-card__image"
            loading="lazy"
            draggable={false}
          />
          {/* Gradient overlay — always visible at bottom */}
          <div className="uw-card__gradient" aria-hidden="true" />

          {/* Text overlay */}
          <div className="uw-card__text">
            <h3 className="uw-card__title">{title}</h3>
            <p className="uw-card__subtitle">{subtitle}</p>
          </div>

          {/* Hover full overlay */}
          <div className="uw-card__hover-overlay" aria-hidden="true" />
        </div>
      </Link>
    </article>
  );
}