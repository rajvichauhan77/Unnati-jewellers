import React from "react";
import "../../../styles/Home/FeaturedSection.css";

const FeaturedSection = () => {
  return (
    <section className="home-section my-xl-5 my-lg-5 my-md-4 my-sm-3 my-3">
      <div className="home-section__container container py-lg-5 py-md-5 py-sm-3 py-3">
        <h2 className="home-section__heading">Shop by Category</h2>
        <p className="home-section__subheading">
          From timeless gold to radiant gemstones — find your perfect piece.
        </p>
        <div className="category-grid">
          {["Gold", "Silver", "Earrings", "Rings", "Gemstone", "Wedding"].map((cat) => (
            <a key={cat} href={`/collections/${cat.toLowerCase()}`} className="category-card">
              <div className="category-card__icon-wrap">
                <div className="category-card__icon" />
              </div>
              <span className="category-card__label">{cat}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
