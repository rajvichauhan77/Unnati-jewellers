import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { mapBackendProduct, fetchAllProducts } from "../../services/productService";
import ProductIcon from "../ui/ProductIcon";
import { calculateProductPrice } from "../../data/productsData";

// ── Specs Accordion ───────────────────────────────────────────────
export const SpecsAccordion = ({ specs = [], description = [], breakdown, goldRate, product }) => {
  const [activeTab, setActiveTab] = useState("details"); // "details" or "price"

  const subtotal = breakdown 
    ? (breakdown.subtotal || (breakdown.metalValue + breakdown.makingCharge + (breakdown.stoneValue || 0) + (breakdown.otherCharges || 0))) 
    : 0;

  const rawWeight = parseFloat(product?.netWeightGrams ?? product?.grossWeightGrams ?? product?.weightGrams ?? product?.weight) || 0;
  const formattedWeight = `${rawWeight}g`;

  const coreKeys = ["metal", "purity", "weight", "net weight", "gross weight", "gender", "product code"];

  const coreSpecs = specs.filter((row) => {
    const labelLower = (row.label || row.name || "").toLowerCase();
    if (labelLower.includes("code") || labelLower.includes("id")) return false;
    return coreKeys.some((k) => labelLower.includes(k));
  });

  const mainBoxSpecs =
    coreSpecs.length > 0
      ? coreSpecs
      : specs.filter((row) => {
          const labelLower = (row.label || row.name || "").toLowerCase();
          return !labelLower.includes("code") && !labelLower.includes("id");
        });

  const customSpecs = specs.filter((row) => {
    const labelLower = (row.label || row.name || "").toLowerCase();
    if (labelLower.includes("code") || labelLower.includes("id")) return false;
    return !coreKeys.some((k) => labelLower.includes(k));
  });

  return (
    <div className="jewellery-details-section">
      <h2 className="jd-section-title">Jewellery Details</h2>

      {/* Tab Switcher Capsule */}
      <div className="jd-tabs-capsule">
        <button
          className={`jd-tab-btn ${activeTab === "details" ? "jd-tab-btn--active" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          Product Details
        </button>
        <button
          className={`jd-tab-btn ${activeTab === "price" ? "jd-tab-btn--active" : ""}`}
          onClick={() => setActiveTab("price")}
        >
          Price Breakup
        </button>
      </div>

      {/* Tab Panel Content */}
      <div className="jd-tab-content">
        {activeTab === "details" && (
          <div className="jd-details-tab">
            {/* Core Product Details Box */}
            <div className="jd-specs-table-wrap">
              <table className="jd-specs-table">
                <tbody>
                  {mainBoxSpecs.map((row) => (
                    <tr key={row.label || row.name}>
                      <td className="jd-specs-table__key">{row.label || row.name}</td>
                      <td className="jd-specs-table__val">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Separate Custom Specifications Section below the box */}
            {customSpecs.length > 0 && (
              <div className="jd-description-block">
                <h3 className="jd-desc-title">Specifications</h3>
                <div className="jd-specs-table-wrap">
                  <table className="jd-specs-table">
                    <tbody>
                      {customSpecs.map((row, i) => (
                        <tr key={row.label || row.name || i}>
                          <td className="jd-specs-table__key">{row.label || row.name}</td>
                          <td className="jd-specs-table__val">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Separate Description Section below */}
            {description.length > 0 && (
              <div className="jd-description-block">
                <h3 className="jd-desc-title">Description</h3>
                {description.map((p, i) =>
                  typeof p === "string" && (p.includes("<") && p.includes(">")) ? (
                    <div
                      key={i}
                      className="jd-desc-text"
                      dangerouslySetInnerHTML={{ __html: p }}
                    />
                  ) : (
                    <p key={i} className="jd-desc-text">
                      {p}
                    </p>
                  )
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "price" && (
          <div className="jd-price-tab">
            {breakdown ? (
              <div className="jd-price-table-wrap">
                <table className="jd-price-table">
                  <thead>
                    <tr>
                      <th>PRODUCT DETAILS</th>
                      <th className="text-right">RATE</th>
                      <th className="text-right">WEIGHT</th>
                      <th className="text-right">DISCOUNT</th>
                      <th className="text-right">VALUE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Metal Row */}
                    <tr>
                      <td>
                        <div className="jd-metal-detail">
                          <span className="jd-metal-dot" />
                          <div>
                            <strong>
                              {product?.purity 
                                ? `${product.purity} Hallmarked ${product?.metalType?.includes("silver") ? "Silver" : product?.metalType?.includes("platinum") ? "Platinum" : "Gold"}`
                                : "22K Hallmarked Gold"}
                            </strong>
                            <span className="jd-metal-sub">Metal Type</span>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        ₹{typeof breakdown.ratePerGram === "number"
                          ? breakdown.ratePerGram.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                          : breakdown.ratePerGram}/g
                      </td>
                      <td className="text-right">{formattedWeight}</td>
                      <td className="text-right">-</td>
                      <td className="text-right">₹{breakdown.metalValue?.toLocaleString("en-IN")}</td>
                    </tr>

                    {/* Making Charges Row */}
                    <tr>
                      <td>
                        <div>
                          <strong>Making Charges</strong>
                          {(product?.makingChargePercent || breakdown?.makingChargePercent) ? (
                            <span className="jd-metal-sub">{product?.makingChargePercent || breakdown?.makingChargePercent}%</span>
                          ) : null}
                        </div>
                      </td>
                      <td className="text-right">-</td>
                      <td className="text-right">-</td>
                      <td className="text-right">-</td>
                      <td className="text-right">₹{breakdown.makingCharge?.toLocaleString("en-IN")}</td>
                    </tr>

                    {/* Other Charges Row */}
                    <tr>
                      <td>
                        <strong>Other Charges</strong>
                      </td>
                      <td className="text-right">-</td>
                      <td className="text-right">-</td>
                      <td className="text-right">-</td>
                      <td className="text-right">
                        ₹{(breakdown.otherCharges || product?.otherCharges || 0).toLocaleString("en-IN")}
                      </td>
                    </tr>

                    {/* Stone Row (if stoneValue > 0) */}
                    {breakdown.stoneValue > 0 && (
                      <tr>
                        <td>
                          <div className="jd-metal-detail">
                            <span className="jd-stone-dot" />
                            <div>
                              <strong>{product?.mainStone || "Stone"}</strong>
                              <span className="jd-metal-sub">Accents</span>
                            </div>
                          </div>
                        </td>
                        <td className="text-right">-</td>
                        <td className="text-right">{product?.mainStoneCarat || "-"}</td>
                        <td className="text-right">-</td>
                        <td className="text-right">₹{breakdown.stoneValue?.toLocaleString("en-IN")}</td>
                      </tr>
                    )}

                    {/* Sub Total Row */}
                    <tr className="jd-row-subtotal">
                      <td>
                        <strong>Sub Total</strong>
                      </td>
                      <td className="text-right">-</td>
                      <td className="text-right">{formattedWeight}</td>
                      <td className="text-right">-</td>
                      <td className="text-right">₹{subtotal?.toLocaleString("en-IN")}</td>
                    </tr>

                    {/* GST Row */}
                    <tr>
                      <td>
                        <strong>GST ({breakdown.gstPercent || 3}%)</strong>
                      </td>
                      <td className="text-right">-</td>
                      <td className="text-right">-</td>
                      <td className="text-right">-</td>
                      <td className="text-right">₹{breakdown.gst?.toLocaleString("en-IN")}</td>
                    </tr>

                    {/* Grand Total Row */}
                    <tr className="jd-row-grandtotal">
                      <td>
                        <strong>Grand Total</strong>
                      </td>
                      <td className="text-right">-</td>
                      <td className="text-right">-</td>
                      <td className="text-right">-</td>
                      <td className="text-right">
                        <strong>₹{breakdown.total?.toLocaleString("en-IN")}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="jd-price-empty">Pricing breakdown not available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Related Products horizontal scroll ───────────────────────────
export const RelatedProducts = ({ products = [] }) => {
  if (!products.length) return null;
  return (
    <section className="related-section">
      <div className="related-section__header">
        <h2 className="related-section__title">You may also like</h2>
        <Link to="/collections/products" className="related-section__view-all">View all →</Link>
      </div>
      <div className="related-scroll">
        {products.map((p) => (
          <Link to={`/product/${p.slug}`} key={p.id} className="related-card">
            <div className="related-card__media">
              <div className="related-card__img-wrap">
                <img src={p.images?.[0]} alt={p.name} className="related-card__img related-card__img--1" />
                {p.images?.[1] && (
                  <img src={p.images[1]} alt="" className="related-card__img related-card__img--2" aria-hidden="true" />
                )}
              </div>
              {p.badges?.includes("best-seller") && (
                <span className="related-card__badge">Best Seller</span>
              )}
            </div>
            <div className="related-card__info">
              <span className="related-card__collection">{p.collectionName || p.metalTypeLabel}</span>
              <p className="related-card__name">{p.name}</p>
              {p._price && (
                <p className="related-card__price">₹{p._price.toLocaleString("en-IN")}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

// ── Recently Viewed (local storage) ──────────────────────────────
export const RecentlyViewed = ({ currentProductId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!currentProductId) return;
    let active = true;
    setLoading(true);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.unnatijewellers.com/api/v1";
    const API_KEY = import.meta.env.VITE_API_KEY || "Au7Kv7L7LhtLcS5XTABzc2S55aybYnZnkMQeG5gOOQuW83TVQk5v2CLdjfmN/rrSu4q1gMjAJ7WsDXVrP4/ZYQ==";

    const loadFallback = async () => {
      try {
        const allProds = await fetchAllProducts();
        const filtered = allProds.filter(p => p.id !== currentProductId);
        const subset = filtered.slice(0, 10);
        const priced = await Promise.all(
          subset.map(async (p) => ({
            ...p,
            _price: await calculateProductPrice(p),
          }))
        );
        if (active) {
          setItems(priced);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load fallback products in Recently viewed:", err);
        if (active) {
          setItems([]);
          setLoading(false);
        }
      }
    };

    fetch(`${API_BASE_URL}/products/${currentProductId}/related?limit=10`, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(async result => {
        if (active) {
          if (result.success && result.data && result.data.length > 0) {
            const mapped = result.data.map(mapBackendProduct);
            const priced = await Promise.all(
              mapped.map(async (p) => ({
                ...p,
                _price: await calculateProductPrice(p),
              }))
            );
            setItems(priced);
            setLoading(false);
          } else {
            await loadFallback();
          }
        }
      })
      .catch(async err => {
        console.error("Failed to load related products in Recently viewed, falling back:", err);
        if (active) {
          await loadFallback();
        }
      });

    return () => {
      active = false;
    };
  }, [currentProductId]);

  if (loading || !items.length) return null;

  return (
    <section className="rv-section">
      <div className="rv-section__header">
        <h2 className="rv-section__title">You may also like</h2>
      </div>
      <div className="rv-slider-wrapper">
        <button
          className="rv-arrow rv-arrow--left"
          onClick={handleScrollLeft}
          aria-label="Scroll left"
        >
          &#8249;
        </button>
        <div className="related-scroll" ref={scrollRef}>
          {items.map((p) => (
            <Link to={`/product/${p.slug}`} key={p.id} className="related-card">
              <div className="related-card__media">
                <div className="related-card__img-wrap">
                  <img src={p.images?.[0]} alt={p.name} className="related-card__img related-card__img--1" />
                  {p.images?.[1] && (
                    <img src={p.images[1]} alt="" className="related-card__img related-card__img--2" aria-hidden="true" />
                  )}
                </div>
              </div>
              <div className="related-card__info">
                <span className="related-card__collection">{p.collectionName || p.metalTypeLabel}</span>
                <p className="related-card__name">{p.name}</p>
                {p._price && (
                  <p className="related-card__price">₹{p._price.toLocaleString("en-IN")}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
        <button
          className="rv-arrow rv-arrow--right"
          onClick={handleScrollRight}
          aria-label="Scroll right"
        >
          &#8250;
        </button>
      </div>
    </section>
  );
};
