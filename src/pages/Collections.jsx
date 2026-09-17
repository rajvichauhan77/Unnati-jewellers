import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductIcon from "../components/ui/ProductIcon";
import {
  featuredCollections,
  promisePillars,
  collectionBannerSets,
} from "../data/collectionsData";
import { fetchShowcaseCollections } from "../services/collectionService";
import { cleanImageUrl } from "../services/bannerService";
import { slugify } from "../utils/slugify";
import "./Collections.css";

const GroupBannerSlider = ({ images = [], subtitle, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [currentIndex, images?.length]);

  if (!images || images.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="coll-group__banner-slider">
      {images.map((imgItem, index) => {
        const bgImg = typeof imgItem === "string" ? imgItem : (imgItem?.desktop || imgItem?.mobile || imgItem);

        return (
          <div
            key={index}
            className={`coll-group__banner-slide ${index === currentIndex ? "active" : ""}`}
            style={{
              backgroundImage: `url("${bgImg}")`,
            }}
          />
        );
      })}

      <button
        className="coll-group__banner-arrow coll-group__banner-arrow--left"
        onClick={handlePrev}
        aria-label="Previous Slide"
      >
        &#8249;
      </button>
      <button
        className="coll-group__banner-arrow coll-group__banner-arrow--right"
        onClick={handleNext}
        aria-label="Next Slide"
      >
        &#8250;
      </button>

      <div className="coll-group__banner-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`coll-group__banner-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const mapShowcaseResponse = (dataList) => {
  if (!dataList || dataList.length === 0) return [];
  
  const staticBannerSets = [
    collectionBannerSets.bridal,
    collectionBannerSets.dailyWear,
    collectionBannerSets.men,
    collectionBannerSets.kids,
    collectionBannerSets.spiritual,
    collectionBannerSets.gifting,
  ];

  const defaultTitles = [
    "Bridal Collection",
    "Daily Wear",
    "Men's Collection",
    "Kid's Collection",
    "Spiritual Collection",
    "Gifting Collection",
  ];

  const defaultSubtitles = [
    "Made for Her Golden Moments",
    "Wear Your Elegance, Every Day",
    "Gold Crafted for the Modern Man.",
    "Little Smiles, Golden Moments",
    "Wear Your Faith, Carry Its Grace",
    "Give a Gift That Lasts Forever",
  ];

  return dataList.map((subArray, idx) => {
    const meta = subArray.find(item => item && item.id !== undefined && item.title !== undefined);
    const rawProducts = subArray.filter(item => item && item._id !== undefined);

    const title = meta?.title || defaultTitles[idx % defaultTitles.length];
    const subtitle = meta?.description || defaultSubtitles[idx % defaultSubtitles.length]; 
    const collectionId = meta?.id || `showcase-${idx}`;
    const collectionSlug = slugify(title);

    const banners = staticBannerSets[idx % staticBannerSets.length];

    const mappedItems = rawProducts.map((p) => {
      let img = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80";
      if (p.images && Array.isArray(p.images) && p.images[0]) {
        img = cleanImageUrl(p.images[0]);
      } else if (p.imageUrl || p.image) {
        img = cleanImageUrl(p.imageUrl || p.image);
      }

      return {
        id: p._id || p.id,
        name: p.productName || p.name || "Fine Jewellery Piece",
        image: img,
        path: `/product/${p.slug || slugify(p.productName || p.name) || p._id || p.id}`,
      };
    });

    return {
      id: collectionId,
      title,
      subtitle,
      bannerImages: banners,
      bannerImage: banners[0],
      link: `/collection/${collectionSlug}/products`,
      items: mappedItems,
    };
  });
};

const Collections = () => {
  const [activeCollections, setActiveCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchShowcaseCollections()
      .then((data) => {
        if (active) {
          if (data && data.length > 0) {
            setActiveCollections(mapShowcaseResponse(data));
          } else {
            setActiveCollections(featuredCollections);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load active showcase collections:", err);
        if (active) {
          setActiveCollections(featuredCollections);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="coll-page">
      {/* ════════════════════════════════════════════════════════
          A. FEATURED COLLECTIONS (Banner + Cards layout)
      ════════════════════════════════════════════════════════ */}
      <section className="coll-sections-list">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "100px 0" }}>
            <div className="loading-spinner" style={{ width: "40px", height: "40px", border: "3px solid rgba(129, 11, 56, 0.1)", borderTop: "3px solid #810B38", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : (
          activeCollections.map((col) => (
            <div className="coll-group" key={col.id}>
                {/* Sliding Banner */}
                <GroupBannerSlider
                  images={col.bannerImages}
                  subtitle={col.subtitle}
                  title={col.title}
                />

                {/* Product Cards + Teaser Grid Row */}
                <div className="coll-group__cards-container container my-xl-5 my-lg-5 my-md-4 my-sm-3 my-3">
                  <div className="coll-group__grid">
                    {col.items.map((item) => (
                      <Link to={col.link} className="coll-group-card" key={item.id}>
                        <div className="coll-group-card__media">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="coll-group-card__img"
                          />
                        </div>
                        <h3 className="coll-group-card__name">{item.name}</h3>
                      </Link>
                    ))}

                    {/* Teaser / Photo Card on the right */}
                    <div className="coll-group-teaser-card">
                      <div className="teaser-card__border">
                        <div className="teaser-card__inset">
                          <h3 className="teaser-card__title">{col.title}</h3>
                          <div className="teaser-card__divider" />
                          <p className="teaser-card__desc">{col.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shop The Collection button centered below */}
                  <div className="coll-group__action">
                    <Link to={col.link} className="coll-group__shop-btn">
                      Shop The Collection
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

      {/* ════════════════════════════════════════════════════════
          C. THE PILLARS OF OUR PROMISE (static, admin-editable list)
      ════════════════════════════════════════════════════════ */}
      <section className="coll-promise">
        <div className="coll-container">
          <h2 className="coll-promise__title">{promisePillars.title}</h2>
          <p className="coll-promise__subtitle">{promisePillars.subtitle}</p>

          <div className="coll-promise__grid">
            {promisePillars.pillars.map((pillar) => (
              <div className="promise-pillar" key={pillar.id}>
                <span className="promise-pillar__icon-wrap">
                  <ProductIcon name={pillar.icon} size={22} />
                </span>
                <span className="promise-pillar__label">{pillar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Collections;
