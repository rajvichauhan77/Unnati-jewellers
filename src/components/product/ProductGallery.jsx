import React, { useState, useRef, useCallback } from "react";

const badgeConfig = {
  "new":         { label: "New Arrival",  bg: "#1a6b3c", color: "#fff" },
  "trending":    { label: "Trending",     bg: "#810B38", color: "#fff" },
  "best-seller": { label: "Best Seller",  bg: "#D4AF37", color: "#1C0A12" },
};

const ProductGallery = ({ images = [], videoUrl = null, badges = [] }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [zooming, setZooming] = useState(false);
  const [activeTab, setActiveTab] = useState("image");

  // Touch / swipe state
  const touchStartX = useRef(null);
  const imgRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setZoomPos({ x, y });
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setActiveIdx((i) => Math.min(i + 1, images.length - 1));
      else           setActiveIdx((i) => Math.max(i - 1, 0));
    }
    touchStartX.current = null;
  };

  const activeImage = images[activeIdx] || null;
  const tabs = videoUrl ? ["image", "video"] : ["image"];

  return (
    <div className="gallery">
      {/* ── Tabs (image / video) ── */}
      {tabs.length > 1 && (
        <div className="gallery__tabs">
          {tabs.map((t) => (
            <button
              key={t}
              className={`gallery__tab ${activeTab === t ? "gallery__tab--active" : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t === "image" ? "Photos" : "Video"}
            </button>
          ))}
        </div>
      )}

      <div className="gallery__body">
        {/* ── Desktop thumbnail strip ── */}
        <div className="gallery__thumbs" role="listbox" aria-label="Product images">
          {images.map((img, i) => (
            <button
              key={i}
              role="option"
              aria-selected={i === activeIdx}
              className={`gallery__thumb ${i === activeIdx ? "gallery__thumb--active" : ""}`}
              onClick={() => { setActiveIdx(i); setActiveTab("image"); }}
            >
              <img src={img} alt={`View ${i + 1}`} className="gallery__thumb-img" />
            </button>
          ))}
          {videoUrl && (
            <button
              role="option"
              aria-selected={activeTab === "video"}
              className={`gallery__thumb gallery__thumb--video ${activeTab === "video" ? "gallery__thumb--active" : ""}`}
              onClick={() => setActiveTab("video")}
            >
              <span className="gallery__thumb-play">▶</span>
            </button>
          )}
        </div>

        {/* ── Main view ── */}
        <div className="gallery__main">
          {activeTab === "video" && videoUrl ? (
            <video
              src={videoUrl}
              controls
              className="gallery__video"
              aria-label="Product video"
            />
          ) : (
            <div
              className={`gallery__zoom-wrap ${zooming ? "gallery__zoom-wrap--active" : ""}`}
              onMouseEnter={() => setZooming(true)}
              onMouseLeave={() => setZooming(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              ref={imgRef}
              aria-label="Product image - hover to zoom"
            >
              {/* Badges */}
              {badges.length > 0 && (
                <div className="gallery__badges">
                  {badges.map((b) => {
                    const cfg = badgeConfig[b];
                    if (!cfg) return null;
                    return (
                      <span
                        key={b}
                        className="gallery__badge"
                        style={{ background: cfg.bg, color: cfg.color }}
                      >
                        {cfg.label}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Main image */}
              {activeImage ? (
                <img
                  src={activeImage}
                  alt="Product"
                  className="gallery__img"
                  style={
                    zooming
                      ? {
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                          transform: "scale(2.2)",
                          cursor: "crosshair",
                        }
                      : {}
                  }
                />
              ) : (
                <div className="gallery__placeholder">
                  <div className="gallery__placeholder-icon" />
                </div>
              )}

              {/* Zoom hint */}
              {!zooming && (
                <span className="gallery__zoom-hint">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21L16.65 16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                  Hover to zoom
                </span>
              )}
            </div>
          )}

          {/* Mobile dot indicators */}
          <div className="gallery__dots" role="tablist" aria-label="Image navigation">
            {images.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeIdx}
                className={`gallery__dot ${i === activeIdx ? "gallery__dot--active" : ""}`}
                onClick={() => setActiveIdx(i)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
