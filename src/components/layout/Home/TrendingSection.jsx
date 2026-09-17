import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/Home/TrendingSection.css";
import { useTrendingItems } from "../../../hooks/useTrendingItems";

const TrendingSection = () => {
  const { trending, loading } = useTrendingItems();

  if (loading || !trending || trending.length === 0) {
    return null;
  }

  return (
    <section id="trending-now" className="home-section home-section--alt my-xl-5 my-lg-5 my-md-4 my-sm-3 my-3">
      <div className="home-section__container container py-lg-5 py-md-5 py-sm-3 py-3">
        <h2 className="home-section__heading">Trending Now</h2>
        <p className="home-section__subheading">Our most loved pieces this season.</p>
        <div className="product-grid">
          {trending.map((product) => (
            <Link key={product.id} to={product.path || "/collections"} className="product-card">
              <div className="product-card__image">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    borderRadius: "6px",
                  }}
                />
              </div>
              <div className="product-card__info">
                <h3 className="product-card__name">{product.name}</h3>
                {product.subtitle && (
                  <p 
                    className="product-card__subtitle" 
                    style={{ 
                      fontSize: "11px", 
                      fontWeight: 600,
                      color: "#b01e3e", 
                      letterSpacing: "0.5px", 
                      textTransform: "uppercase", 
                      margin: "3px 0 6px 0" 
                    }}
                  >
                    {product.subtitle}
                  </p>
                )}
                {product.price && !product.price.toLowerCase().includes("price on request") && (
                  <p className="product-card__price">{product.price}</p>
                )}
                <span className="product-card__link">View Details →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
