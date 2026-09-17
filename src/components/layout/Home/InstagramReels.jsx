import React, { useState, useRef, useEffect } from "react";
import "../../../styles/Home/InstagramReels.css";
import { useStylingItems } from "../../../hooks/useStylingItems";

/**
 * InstagramReels — Instagram Reel/Gallery slider
 *
 * BACKEND INTEGRATION:
 * Replace `MOCK_REELS` with your API data:
 *
 *   useEffect(() => {
 *     fetch("/api/instagram-reels")
 *       .then(r => r.json())
 *       .then(data => setReels(data));
 *   }, []);
 *
 * Each reel object shape:
 * {
 *   id:           string,
 *   thumbnailUrl: string,   // poster/thumbnail image URL
 *   reelUrl:      string,   // Instagram reel URL (https://www.instagram.com/reel/...)
 *   caption:      string,   // short caption text
 *   productName:  string,   // product name shown in reel chip
 * }
 *
 * INSTAGRAM HANDLE:
 * Update `INSTAGRAM_HANDLE` below.
 */

const INSTAGRAM_HANDLE = "@unnatijewellersin";
const INSTAGRAM_PROFILE_URL = " https://www.instagram.com/unnatijewellersin/";

const MOCK_REELS = [
  {
    id: "1",
    thumbnailUrl: "https://images.unsplash.com/photo-1573408301185-9519f94797e8?w=400&q=80",
    reelUrl: INSTAGRAM_PROFILE_URL,
    caption: "Diamonds are all you need to unleash your sparkle ✨",
    productName: "Yasmile Wave Diamond Necklace Set",
  },
  {
    id: "2",
    thumbnailUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
    reelUrl: INSTAGRAM_PROFILE_URL,
    caption: "Temple jewels for the soul 🙏",
    productName: "Heritage Temple Earrings",
  },
  {
    id: "3",
    thumbnailUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
    reelUrl: INSTAGRAM_PROFILE_URL,
    caption: "Gold that speaks for itself 💛",
    productName: "Classic Gold Bangle Set", 
  },
  {
    id: "4",
    thumbnailUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    reelUrl: INSTAGRAM_PROFILE_URL,
    caption: "For the forever moments 💍",
    productName: "Solitaire Promise Ring",
  },
  {
    id: "5",
    thumbnailUrl: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80",
    reelUrl: INSTAGRAM_PROFILE_URL,
    caption: "Bridal dreams, crafted in gold ✨",
    productName: "Bridal Necklace Set",
  },
];

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4.5"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const ArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

export default function InstagramReels({ reels = MOCK_REELS }) {
  const { styling: dynamicStyling } = useStylingItems();

  const activeReels = dynamicStyling.length > 0 ? [
    ...dynamicStyling,
    ...reels.slice(dynamicStyling.length)
  ] : reels;

  const [activeIdx, setActiveIdx] = useState(2);
  const touchStart = useRef(null);
  const total = activeReels.length;

  useEffect(() => {
    setActiveIdx(Math.floor(activeReels.length / 2));
  }, [activeReels.length]);

  const prev = () => setActiveIdx((i) => (i - 1 + total) % total);
  const next = () => setActiveIdx((i) => (i + 1) % total);

  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    touchStart.current = null;
  };

  // Build the visible fan — show up to 5 cards (2 left, center, 2 right)
  const getPositionClass = (idx) => {
    const diff = ((idx - activeIdx + total) % total + total) % total;
    const normalised = diff > total / 2 ? diff - total : diff;
    if (normalised === 0) return "ir-reel--center";
    if (normalised === 1) return "ir-reel--right-1";
    if (normalised === -1) return "ir-reel--left-1";
    if (normalised === 2) return "ir-reel--right-2";
    if (normalised === -2) return "ir-reel--left-2";
    return "ir-reel--hidden";
  };

  const activeReel = activeReels[activeIdx];

  return (
    <section className="ir-section my-xl-5 my-lg-5 my-md-4 my-sm-3 my-3" aria-label="Instagram Reels">
      <div className="ir-container container py-lg-5 py-md-5 py-sm-3 py-3">

        {/* ── Section header ───────────────────────── */}
        <div className="ir-header">
          <h2 className="ir-title">Unnati on Instagram</h2>
          <p className="ir-subtitle">Get inspired by how our latest collections are styled and worn</p>
        </div>

        {/* ── Fan carousel ─────────────────────────── */}
        <div
          className="ir-stage"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-live="polite"
        >
          {/* Left arrow */}
          <button
            className="ir-nav ir-nav--left"
            onClick={prev}
            aria-label="Previous reel"
          >
            <ArrowLeft />
          </button>

          {/* Reel fan */}
          <div className="ir-fan" aria-label="Reel carousel">
            {activeReels.map((reel, idx) => {
              const posClass = getPositionClass(idx);
              const isCenter = posClass === "ir-reel--center";
              return (
                <a
                  key={reel.id}
                  href={reel.reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ir-reel ${posClass}`}
                  aria-label={`Watch reel: ${reel.caption}`}
                  tabIndex={isCenter ? 0 : -1}
                  onClick={(e) => {
                    if (!isCenter) { e.preventDefault(); setActiveIdx(idx); }
                  }}
                >
                  <div className="ir-reel__inner">
                    {isCenter && reel.videoUrl ? (
                      <video
                        src={reel.videoUrl}
                        poster={reel.thumbnailUrl}
                        className="ir-reel__img"
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <img
                        src={reel.thumbnailUrl}
                        alt={reel.caption}
                        className="ir-reel__img"
                        loading="lazy"
                        draggable={false}
                      />
                    )}

                    {/* Center card overlay controls */}
                    {isCenter && (
                      <>
                        <div className="ir-reel__top-bar">
                          <span className="ir-reel__caption-chip">{reel.caption}</span>
                          <div className="ir-reel__actions">
                            <button className="ir-reel__action-btn" aria-label="Mute/Unmute" onClick={e => e.preventDefault()}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                            </button>
                          </div>
                        </div>
                        <div className="ir-reel__badge">Unmute video</div>
                        <div className="ir-reel__product-chip">
                          <div className="ir-reel__product-thumb">
                            <img src={reel.thumbnailUrl} alt="" aria-hidden="true" />
                          </div>
                          <span className="ir-reel__product-name">{reel.productName}</span>
                          <a href="/collections" className="ir-reel__shop-btn" onClick={e => e.stopPropagation()}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                          </a>
                        </div>
                      </>
                    )}

                    {/* Play icon overlay for non-center */}
                    {!isCenter && (
                      <div className="ir-reel__play-overlay" aria-hidden="true">
                        <PlayIcon />
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>

          {/* Right arrow */}
          <button
            className="ir-nav ir-nav--right"
            onClick={next}
            aria-label="Next reel"
          >
            <ArrowRight />
          </button>
        </div>

        {/* ── Instagram handle link ─────────────────── */}
        <div className="ir-handle">
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ir-handle__link"
            aria-label={`Follow us on Instagram ${INSTAGRAM_HANDLE}`}
          >
            <InstagramIcon />
            <span>{INSTAGRAM_HANDLE}</span>
          </a>
        </div>

      </div>
    </section>
  );
}