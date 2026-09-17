import React from "react";
import "../../../styles/Home/WhyChooseUs.css";
import PromiseCard from "../Home/PromiseCard";
import { promiseData } from "../../../data/promiseData";

const WhyChooseUs = () => {
  return (
    <section className="why-choose my-xl-5 my-lg-5 my-md-4 my-sm-3 my-3">
      <div className="container py-lg-5 py-md-5 py-sm-3 py-3">
        <div className="why-choose__heading">
          <h2>The Pillars of Our Promise</h2>
          <span>SIX REASONS TO CHOOSE UNNATI</span>
        </div>

        <div className="why-choose__grid">
          {promiseData.map((item) => (
            <PromiseCard
              key={item.id}
              Icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;