import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "../../../styles/Home/CollectionSlider.css";
import { useTimelessCollections } from "../../../hooks/useTimelessCollections";

const CARDS_VISIBLE_DESKTOP = 4;
const CARDS_VISIBLE_MOBILE = 1;

const ArrowLeft = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ArrowRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function CollectionSlider({ collections = [] }) {
  const { collections: dynamicCollections, loading } = useTimelessCollections();
  const activeCollections = dynamicCollections.length > 0 ? dynamicCollections : collections;
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const touchStart = useRef(null);

  // Responsive: how many visible at once
  const getVisible = () => {
    if (typeof window === "undefined") return CARDS_VISIBLE_DESKTOP;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 900) return 2;
    if (window.innerWidth < 1200) return 3;
    return CARDS_VISIBLE_DESKTOP;
  };

  const [visible, setVisible] = useState(getVisible);

  React.useEffect(() => {
    const onResize = () => setVisible(getVisible());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const totalCards = activeCollections.length;
  const maxIndex = Math.max(0, totalCards - visible);

  const prev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  // Early return after all hooks have executed
  if (loading || activeCollections.length === 0) {
    return null;
  }

  // Touch/swipe support
  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    touchStart.current = null;
  };

  const translateX = `calc(-${currentIndex} * (100% / ${visible}))`;
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= maxIndex;

  return (
    <section className="cs-section my-xl-5 my-lg-5 my-md-4 my-sm-3 my-3" aria-label="Collections">
      <div className="cs-container container py-lg-5 py-md-5 py-sm-3 py-3">
        {/* ── Header row ───────────────────────────── */}
        <div className="cs-header">
          <div className="cs-header__text">
            <h2 className="cs-title">Explore Our Timeless Collections</h2>
            <p className="cs-subtitle">Explore our newly launched collection</p>
          </div>
          <div className="cs-arrows" aria-label="Slider controls">
            <button
              className="cs-arrow"
              onClick={prev}
              disabled={isPrevDisabled}
              aria-label="Previous collection"
            >
              <ArrowLeft />
            </button>
            <button
              className="cs-arrow"
              onClick={next}
              disabled={isNextDisabled}
              aria-label="Next collection"
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* ── Slider track ─────────────────────────── */}
        <div
          className="cs-viewport"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="cs-track"
            ref={trackRef}
            style={{
              transform: `translateX(${translateX})`,
              gridTemplateColumns: `repeat(${totalCards}, calc((100% - ${(visible - 1) * 20}px) / ${visible}))`,
            }}
          >
            {activeCollections.map((col) => (
              <CollectionCard key={col.id} collection={col} />
            ))}
          </div>
        </div>

        {/* ── Dot indicators (mobile) ───────────────── */}
        <div className="cs-dots" role="tablist" aria-label="Collection pages">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === currentIndex}
              className={`cs-dot ${i === currentIndex ? "cs-dot--active" : ""}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({ collection }) {
  const { imageUrl, title, subtitle, slug } = collection;

  /**
   * BACKEND INTEGRATION:
   * Replace `/collections/${slug}` with your router path or Link component.
   * The `imageUrl` comes directly from your API response.
   */
  return (
    <article className="cs-card" role="group" aria-label={title}>
      <Link to={collection.link || "/collections"} className="cs-card__link" tabIndex={0}>
        <div className="cs-card__image-wrap">
          <img
            src={imageUrl}
            alt={title}
            className="cs-card__image"
            loading="lazy"
            draggable={false}
          />
          {/* Hover overlay with Explore CTA */}
          <div className="cs-card__overlay" aria-hidden="true">
            <span className="cs-card__explore">Explore →</span>
          </div>
        </div>
        <div className="cs-card__body">
          <h3 className="cs-card__title">{title}</h3>
          <p className="cs-card__subtitle">{subtitle}</p>
        </div>
      </Link>
    </article>
  );
}
