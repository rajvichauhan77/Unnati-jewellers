import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductIcon from "../ui/ProductIcon";
import { metalTypes } from "../../data/categoryTaxonomy";

const badgeLabels = {
  new: "New",
  trending: "Trending",
  "best-seller": "Best Seller",
};

const ProductCard = ({ product, onQuickView }) => {
  const [hovered, setHovered] = useState(false);
  const metalLabel = metalTypes.find((m) => m.id === product.metalType)?.label || product.metalType;
  const secondImage = product.images?.[1];

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.slug}`} className="product-card__media">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className={`product-card__img product-card__img--primary ${hovered && secondImage ? "product-card__img--hidden" : ""}`}
          loading="lazy"
        />
        {secondImage && (
          <img
            src={secondImage}
            alt={`${product.name} alternate view`}
            className={`product-card__img product-card__img--secondary ${hovered ? "product-card__img--visible" : ""}`}
            loading="lazy"
          />
        )}

        {/* Badges */}
        {product.badges?.length > 0 && (
          <div className="product-card__badges">
            {product.badges.map((b) => (
              <span key={b} className={`product-card__badge product-card__badge--${b}`}>
                {badgeLabels[b] || b}
              </span>
            ))}
          </div>
        )}

        {/* Quick view button */}
        <button
          className="product-card__quickview"
          onClick={(e) => {
            e.preventDefault();
            onQuickView(product);
          }}
        >
          <ProductIcon name="eye" size={15} />
          Quick View
        </button>
      </Link>

      <div className="product-card__body">
        <Link to={`/product/${product.slug}`} className="product-card__name">
          {product.name}
        </Link>
        <span className="product-card__metal">{metalLabel}</span>
        <span className="product-card__price">
          {product._price != null
            ? `₹${product._price.toLocaleString("en-IN")}`
            : "Calculating…"}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
