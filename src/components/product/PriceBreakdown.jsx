import React, { useState } from "react";

const PriceBreakdown = ({ breakdown, goldRate }) => {
  const [open, setOpen] = useState(false);
  if (!breakdown) return null;

  return (
    <div className="price-breakdown">
      <button
        className="price-breakdown__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>View price breakdown</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .25s" }}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>    
      </button>

      {open && (
        <div className="price-breakdown__panel">
          <div className="price-breakdown__live">
            <span className="price-breakdown__live-dot" />
            <span>Live gold rate: <strong>{goldRate}</strong></span>
          </div>
          <table className="price-breakdown__table">
            <tbody>
              <tr>
                <td>Metal value</td>
                <td>₹{breakdown.metalValue.toLocaleString("en-IN")}</td>
              </tr>
              <tr>
                <td>Making charges ({breakdown.makingChargePercent ? `${breakdown.makingChargePercent}%` : ""})</td>
                <td>₹{breakdown.makingCharge.toLocaleString("en-IN")}</td>
              </tr>
              {breakdown.otherCharges > 0 && (
                <tr>
                  <td>Other charges</td>
                  <td>₹{breakdown.otherCharges.toLocaleString("en-IN")}</td>
                </tr>
              )}
              {breakdown.stoneValue > 0 && (
                <tr>
                  <td>Stone value</td>
                  <td>₹{breakdown.stoneValue.toLocaleString("en-IN")}</td>
                </tr>
              )}
              <tr>
                <td>GST (3%)</td>
                <td>₹{breakdown.gst.toLocaleString("en-IN")}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Total</strong></td>
                <td><strong>₹{breakdown.total.toLocaleString("en-IN")}</strong></td>
              </tr>
            </tfoot>
          </table>
          <p className="price-breakdown__note">
            Price updates live with the gold rate. Final price applies at time of purchase.
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceBreakdown;
