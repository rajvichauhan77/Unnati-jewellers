import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Swiper core CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// import "../../styles/Home/HeroBanner.css";
import "../../../styles/Home/HeroBanner.css";

import { useHeroBanners } from "../../../hooks/useHeroBanners";
import HeroSlide from "./HeroSlide"; 

const HeroBanner = () => {
  const { banners, loading } = useHeroBanners();
  const [activeIndex, setActiveIndex] = useState(0);

  if (loading || !banners || banners.length === 0) {
    return null;
  }

  return (
    <section className="hero-banner">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        loop={banners.length > 1}
        autoplay={banners.length > 1 ? {
          delay: 5000,
          disableOnInteraction: false,
        } : false}
        speed={1000}
        pagination={{ clickable: true }}
        navigation={banners.length > 1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="hero-swiper"
      >
        {banners.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <HeroSlide slide={slide} isActive={activeIndex === index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroBanner;