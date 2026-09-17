import React from "react";
import "../../../styles/Home/VisitStore.css";
import { FiMapPin, FiClock, FiPhoneCall } from "react-icons/fi";
import { useStoreDetails } from "../../../hooks/useStoreDetails";

const VisitStore = () => {
  const { store } = useStoreDetails();

  return (
    <section className="visit-store my-xl-5 my-lg-5 my-md-4 my-sm-3 my-3">
      <div className="visit-store-container container py-lg-5 py-md-5 py-sm-3 py-3">
        {/* Left Side */}
        <div className="store-image-wrapper">
          <img
            src={store.imageUrl}
            alt="Unnati Jewellers"
            className="store-image"
          />
        </div>

        {/* Right Side */}
        <div className="store-content">
          <h3>Visit Our store</h3>
          {/* Address */}
          <div className="info-box">
            <FiMapPin className="info-icon" />
            <div>
              <h4>Store Address</h4>
              <p style={{ whiteSpace: "pre-line" }}>
                {store.address}
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="info-box">
            <FiClock className="info-icon" />
            <div>
              <h4>Opening Hours</h4>
              <p>{store.hoursWeekdays}</p>
              <p>{store.hoursSunday}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="info-box">
            <FiPhoneCall className="info-icon" />
            <div>
              <h4>Get In Touch</h4>
              <p>Phone: <a href={`tel:${store.phone}`} style={{ color: "inherit", textDecoration: "none" }}>{store.phone}</a></p>
              <p>Email: <a href={`mailto:${store.email}`} style={{ color: "inherit", textDecoration: "none" }}>{store.email}</a></p>
            </div>
          </div>
          <a
            href="https://maps.app.goo.gl/PHcfa6pZ8kJzR2NS9"
            target="_blank"
            rel="noopener noreferrer"
            className="direction-btn"
            style={{ display: "inline-block", textDecoration: "none", textAlign: "center" }}
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
};

export default VisitStore;
