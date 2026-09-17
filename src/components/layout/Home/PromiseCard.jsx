import React from "react";
import "../../../styles/Home/PromiseCard.css";
// import { promiseData } from "../../../data/promiseData";

const PromiseCard = ({ Icon, title, description }) => {
  return (
    <div className="promise-card">
      <div className="promise-card__icon">
        <Icon />
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
};

export default PromiseCard;