import React from "react";
import "./Pages.css";

// ── About Page ────────────────────────────────────────────────────────


// ── Collections Page ──────────────────────────────────────────────────
export const Collections = () => (
  <main className="page-inner">
    <div className="page-hero page-hero--sm">
      <h1 className="page-hero__title">Collections</h1>
      <p className="page-hero__sub">Explore our curated range of fine jewellery.</p>
    </div>
    <div className="page-content container">
      <div className="filter-bar">
        {["All", "Gold", "Silver", "Earrings", "Rings", "Gemstone", "Wedding"].map((f) => (
          <button key={f} className={`filter-btn ${f === "All" ? "filter-btn--active" : ""}`}>
            {f}
          </button>
        ))}
      </div>
      <div className="collections-grid">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="product-card-v2">
            <div className="product-card-v2__image" />
            <div className="product-card-v2__body">
              <span className="product-card-v2__category">Gold Jewellery</span>
              <h3 className="product-card-v2__name">Handcrafted Necklace Set {i + 1}</h3>
              <a href={`/collections/item-${i + 1}`} className="product-card-v2__cta">
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
);

// ── Suvarna Scheme Page ───────────────────────────────────────────────
export const SuvarnaScheme = () => (
  <main className="page-inner">
    <div className="page-hero page-hero--maroon">
      <h1 className="page-hero__title">Suvarna Gold Scheme</h1>
      <p className="page-hero__sub">Invest monthly. Get jewellery with added benefits.</p>
    </div>
    <div className="page-content container">
      <div className="scheme-intro">
        <h2 className="section-heading">How It Works</h2>
        <p className="page-text">
          Join the Suvarna Gold Scheme and make equal monthly instalments for 10 + 1 months. We contribute the 12th month instalment as a benefit — making your gold purchase more rewarding.
        </p>
      </div>
      <div className="scheme-steps">
        {[
          { step: "01", title: "Enrol", desc: "Visit our store or call us to join the scheme with any monthly amount." },
          { step: "02", title: "Pay Monthly", desc: "Make your instalment every month for 10 + 1 months." },
          { step: "03", title: "We Add the 12th", desc: "We contribute the 12th month as a bonus benefit." },
          { step: "04", title: "Buy Jewellery", desc: "Redeem the full amount to purchase any jewellery from our collection." },
        ].map((s) => (
          <div key={s.step} className="scheme-step">
            <span className="scheme-step__num">{s.step}</span>
            <h3 className="scheme-step__title">{s.title}</h3>
            <p className="scheme-step__desc">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="scheme-cta-wrap">
        <a href="/contact" className="scheme-cta-btn">Enquire Now</a>
      </div>
    </div>
  </main>
);

// ── Contact Page ──────────────────────────────────────────────────────
// export const Contact = () => (
//   <main className="page-inner">
//     <div className="page-hero page-hero--sm">
//       <h1 className="page-hero__title">Contact Us</h1>
//       <p className="page-hero__sub">We'd love to hear from you.</p>
//     </div>
//     <div className="page-content container">
//       <div className="contact-grid">
//         {/* Info */}
//         <div className="contact-info">
//           <h2 className="section-heading">Get in Touch</h2>
//           <div className="contact-detail">
//             <strong>Address</strong>
//             <p>Unnati Jewellers, Main Bazaar Road,<br />Bhavnagar, Gujarat – 364001</p>
//           </div>
//           <div className="contact-detail">
//             <strong>Phone</strong>
//             <p><a href="tel:+919876543210">+91 98765 43210</a></p>
//           </div>
//           <div className="contact-detail">
//             <strong>Email</strong>
//             <p><a href="mailto:info@unnatijewellers.com">info@unnatijewellers.com</a></p>
//           </div>
//           <div className="contact-detail">
//             <strong>Hours</strong>
//             <p>Mon – Sat: 10:00 AM – 8:00 PM<br />Sunday: 11:00 AM – 6:00 PM</p>
//           </div>
//         </div>

//         {/* Form */}
//         <div className="contact-form-wrap">
//           <h2 className="section-heading">Send a Message</h2>
//           <div className="contact-form">
//             <div className="form-row">
//               <div className="form-group">
//                 <label className="form-label">Full Name</label>
//                 <input type="text" className="form-input" placeholder="Your name" />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Phone</label>
//                 <input type="tel" className="form-input" placeholder="+91 XXXXX XXXXX" />
//               </div>
//             </div>
//             <div className="form-group">
//               <label className="form-label">Email</label>
//               <input type="email" className="form-input" placeholder="you@email.com" />
//             </div>
//             <div className="form-group">
//               <label className="form-label">Message</label>
//               <textarea className="form-input form-textarea" rows={5} placeholder="How can we help you?" />
//             </div>
//             <button className="form-submit">Send Message</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </main>
// );

// ── Book Appointment Page ─────────────────────────────────────────────
export const BookAppointment = () => (
  <main className="page-inner">
    <div className="page-hero page-hero--maroon">
      <h1 className="page-hero__title">Book an Appointment</h1>
      <p className="page-hero__sub">Experience personalised jewellery consultation at your convenience.</p>
    </div>
    <div className="page-content container">
      <div className="appointment-form-wrap">
        <div className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input type="text" className="form-input" placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone *</label>
              <input type="tel" className="form-input" placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Preferred Date *</label>
              <input type="date" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Preferred Time *</label>
              <select className="form-input form-select">
                <option>10:00 AM – 11:00 AM</option>
                <option>11:00 AM – 12:00 PM</option>
                <option>12:00 PM – 1:00 PM</option>
                <option>2:00 PM – 3:00 PM</option>
                <option>3:00 PM – 4:00 PM</option>
                <option>4:00 PM – 5:00 PM</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Purpose</label>
            <select className="form-input form-select">
              <option>Wedding Jewellery Consultation</option>
              <option>Gold Purchase</option>
              <option>Custom Design</option>
              <option>Jewellery Repair</option>
              <option>Suvarna Scheme Enquiry</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Notes (optional)</label>
            <textarea className="form-input form-textarea" rows={4} placeholder="Any specific requirements or questions..." />
          </div>
          <button className="form-submit">Confirm Appointment</button>
        </div>
      </div>
    </div>
  </main>
);
