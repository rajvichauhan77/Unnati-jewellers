import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSlide = ({ slide, isActive }) => {
  const image = slide.desktopImage || slide.mobileImage || slide.imageUrl || slide.image;

  return (
    <div className="hero-slide">
      {/* Background Image */}
      <div
        className="hero-slide__bg"
        style={{ backgroundImage: `url("${image}")` }}
      />

      {/* Dark Overlay */}
      <div className="hero-slide__overlay" />

      {/* Content — only animates when slide is active and text content exists */}
      {isActive && (slide?.title || slide?.subtitle || slide?.buttonText) && (
        <div className="hero-slide__container container">
          <div className="hero-slide__content">
            {slide.title && (
              <motion.h1
                className="hero-slide__title"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {slide.title}
              </motion.h1>
            )}

            {slide.subtitle && (
              <motion.p
                className="hero-slide__subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
              >
                {slide.subtitle}
              </motion.p>
            )}

            {slide.buttonText && slide.buttonLink && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Link to={slide.buttonLink} className="hero-slide__btn">
                  {slide.buttonText}
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSlide;