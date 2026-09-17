import React from "react";
import "./Maintenance.css";

const Maintenance = ({ onCheckStatus }) => {
  const handleRefresh = () => {
    if (onCheckStatus) {
      onCheckStatus();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="maintenance-page">
      <div className="maintenance-card">
        {/* Brand Header */}
        <div className="maintenance-logo">
          <span className="maintenance-logo__main">Unnati</span>
          <span className="maintenance-logo__sub">Jewellers</span>
        </div>

        {/* Decorative Diamond Icon */}
        <div className="maintenance-icon-wrap" aria-hidden="true">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2 L20 8 L17 20 L7 20 L4 8 Z" />
            <path d="M4 8 L12 14 L20 8" />
            <path d="M12 14 L12 20" />
          </svg>
        </div>

        {/* Title & Badge */}
        <div className="maintenance-badge">✦ Scheduled Maintenance ✦</div>
        <h1 className="maintenance-title">Website Under Maintenance</h1>

        {/* Description */}
        <p className="maintenance-desc">
          We are currently updating our digital boutique to bring you an upgraded luxury jewellery experience. We apologize for any inconvenience and will be back online shortly.
        </p>

        {/* Contact info for urgent queries */}
        <div className="maintenance-contact">
          <div className="maintenance-contact__item">
            <span>📞 Call Us:</span>
            <a href="tel:+919876543210">+91 98765 43210</a>
          </div>
          <div className="maintenance-contact__item">
            <span>✉️ Email:</span>
            <a href="mailto:info@unnatijewellers.com">info@unnatijewellers.com</a>
          </div>
        </div>

        {/* Action Button */}
        <button className="maintenance-refresh-btn" onClick={handleRefresh}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"></polyline>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
          </svg>
          Refresh & Check Status
        </button>

        <div className="maintenance-footer">
          © {new Date().getFullYear()} Unnati Jewellers. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
