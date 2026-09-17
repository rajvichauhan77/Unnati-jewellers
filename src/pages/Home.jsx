import React from "react";
import Herobanner from "../components/layout/Home/Herobanner";
import WhyChooseUs from "../components/layout/Home/WhyChooseUs";
import VisitStore from "../components/layout/Home/VisitStore";
// import FeaturedSection from "../components/layout/Home/FeaturedSection";
import TrendingSection from "../components/layout/Home/TrendingSection";
import SuvarnaScheme from "../components/layout/Home/SuvarnaScheme";
import CollectionSlider from "../components/layout/Home/CollectionSlider";
import UnnatiWorld from "../components/layout/Home/UnnatiWorld";
import InstagramReels from "../components/layout/Home/InstagramReels";
import UnnatiPhilosophy from "../components/layout/Home/UnnatiPhilosophy";

import "./Home.css";

const Home = () => {
  return (
    <main className="page-home">
      <Herobanner />
      {/* <FeaturedSection /> */}
      <CollectionSlider />
      <UnnatiPhilosophy />
      <TrendingSection />
      
      
      <UnnatiWorld />
      <InstagramReels />
      <SuvarnaScheme />
      <WhyChooseUs />

      <VisitStore />
    </main>
  );
};

export default Home;
