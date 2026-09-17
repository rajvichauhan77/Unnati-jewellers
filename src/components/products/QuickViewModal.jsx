import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductIcon from "../ui/ProductIcon";
import { metalTypes, stoneTypes } from "../../data/categoryTaxonomy";

const QuickViewModal = ({ product, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setActiveImg(0);
    document.body.style.overflow = product ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!product) return null;

  const metalLabel = metalTypes.find((m) => m.id === product.metalType)?.label || product.metalType;
  const stoneLabel = stoneTypes.find((s) => s.id === product.stoneType)?.label || product.stoneType;
  const images = product.images || [];

  const productUrl = `${window.location.origin}/product/${product.slug}`;
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ${product.name} (${metalLabel}). Could you share more details?\n\nProduct Link: ${productUrl}`
  );
  const whatsappUrl = `https://wa.me/916351630432?text=${whatsappMessage}`;

  return (
    <div className="qv-backdrop" onClick={onClose}>
      <div className="qv-modal" onClick={(e) => e.stopPropagation()}>
        <button className="qv-modal__close" onClick={onClose} aria-label="Close quick view">
          <ProductIcon name="close" size={18} />
        </button>

        <div className="qv-modal__body">
          {/* ── Image carousel ── */}
          <div className="qv-modal__media">
            <div className="qv-modal__main-img">
              <img src={images[activeImg]} alt={product.name} />
            </div>
            {images.length > 1 && (
              <div className="qv-modal__thumbs">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`qv-modal__thumb ${i === activeImg ? "qv-modal__thumb--active" : ""}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Details ── */}
          <div className="qv-modal__info">
            {product.badges?.length > 0 && (
              <div className="qv-modal__badges">
                {product.badges.map((b) => (
                  <span key={b} className={`product-card__badge product-card__badge--${b}`}>
                    {b === "best-seller" ? "Best Seller" : b.charAt(0).toUpperCase() + b.slice(1)}
                  </span>
                ))}
              </div>
            )}

            <h2 className="qv-modal__name">{product.name}</h2>

            <p className="qv-modal__price">
              {product._price != null
                ? `₹${product._price.toLocaleString("en-IN")}`
                : "Calculating…"}
            </p>

            <div className="qv-modal__specs">
              <div className="qv-modal__spec-row">
                <span className="qv-modal__spec-label">Metal</span>
                <span className="qv-modal__spec-value">{metalLabel}</span>
              </div>
              <div className="qv-modal__spec-row">
                <span className="qv-modal__spec-label">Stone</span>
                <span className="qv-modal__spec-value">{stoneLabel}</span>
              </div>
              <div className="qv-modal__spec-row">
                <span className="qv-modal__spec-label">Weight</span>
                <span className="qv-modal__spec-value">{product.weightGrams}g</span>
              </div>
              <div className="qv-modal__spec-row">
                <span className="qv-modal__spec-label">Purity</span>
                <span className="qv-modal__spec-value">{product.purity}</span>
              </div>
            </div>

            <div className="qv-modal__actions">
              <Link
                to={`/product/${product.slug}`}
                className="qv-modal__btn qv-modal__btn--primary"
                onClick={onClose}
              >
                View Full Details
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="qv-modal__btn qv-modal__btn--whatsapp"
              >
                <ProductIcon name="whatsapp" size={16} />
                WhatsApp Enquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
