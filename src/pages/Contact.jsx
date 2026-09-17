import React, { useState } from "react";
import ContactIcon from "../components/ui/ContactIcon";
import { submitContactInquiry } from "../services/contactService";
import {
  shopAddresses,
  showroomHours,
  showroomImage,
  mapEmbedUrl,
  directionsUrl,
  contactCards,
  experienceFeatures,
  faqs,
} from "../data/contactData";
import { useStoreDetails } from "../hooks/useStoreDetails";
import "./Contact.css";

const Contact = () => {
  const { store } = useStoreDetails();
  const [openFaqId, setOpenFaqId] = useState(faqs[0]?.id ?? null);
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormState((prev) => ({ ...prev, [name]: digitsOnly.slice(0, 10) }));
      return;
    }
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.message) {
      setStatus({ type: "error", message: "Please fill in all required fields (*)." });
      return;
    }

    if (formState.phone && formState.phone.length !== 10) {
      setStatus({ type: "error", message: "Phone number must be exactly 10 digits." });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await submitContactInquiry(formState);
      if (response.success) {
        setSubmitted(true);
        setFormState({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => {
          setSubmitted(false);
        }, 6000);
      } else {
        setStatus({
          type: "error",
          message: response.message || "Failed to submit inquiry. Please verify your credentials or try again later.",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred during submission. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="contact-page">

      {/* ════════════════════════════════════════════════════════
          A. SHOP ADDRESS SECTION
      ════════════════════════════════════════════════════════ */}
      <section className="shop-address">
        <div className="shop-address__card">

          {/* Left — Showroom image */}
          <div className="shop-address__media">
            <img
              src={store.imageUrl || showroomImage.src}
              alt="Unnati Jewellers showroom interior"
              className="shop-address__img"
            />
            {showroomImage.pinLabel?.trim() && (
              <span className="shop-address__pin-tag">
                {showroomImage.pinLabel}
              </span>
            )}
          </div>

          {/* Right — Address details */}
          <div className="shop-address__content">
            <span className="shop-address__eyebrow">The Showroom</span>
            <h2 className="shop-address__title">A Sanctuary of Brilliance</h2>

            <div className="shop-address__list">
              {shopAddresses.map((addr) => (
                <div className="shop-address__item" key={addr.id}>
                  <ContactIcon name="pin" size={18} className="shop-address__item-icon" />
                  <div>
                    <p className="shop-address__item-label">{addr.label}</p>
                    <p className="shop-address__item-text">
                      {addr.line1}
                      <br />
                      {addr.line2}
                    </p>
                  </div>
                </div>
              ))}

              <div className="shop-address__item">
                <ContactIcon name="clock" size={18} className="shop-address__item-icon" />
                <div>
                  <p className="shop-address__item-label">Showroom Hours</p>
                  <p className="shop-address__item-text">
                    {showroomHours.weekdays}
                    <br />
                    {showroomHours.sunday}
                  </p>
                </div>
              </div>
            </div>

            <div className="shop-address__actions">
              <a href="/book-appointment" className="btn-gold">
                Book Appointment
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          B. CONTACT INFO SECTION
      ════════════════════════════════════════════════════════ */}
      <section className="contact-info">
        <div className="contact-info__grid">
          {contactCards.map((card) => {
            const isExternal = card.href.startsWith("http");
            const valueLines = Array.isArray(card.value) ? card.value : [card.value];

            return (
              <a
                key={card.id}
                href={card.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="contact-info__card"
              >
                <span className="contact-info__icon-wrap">
                  <ContactIcon name={card.icon} size={22} />
                </span>
                <span className="contact-info__label">{card.label}</span>
                <span className="contact-info__value">
                  {valueLines.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < valueLines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              </a>
            );
          })}
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          C. MAP SECTION
      ════════════════════════════════════════════════════════ */}
      <section className="map-section">
        <div className="map-section__wrap">
          <iframe
            title="Unnati Jewellers location"
            src={mapEmbedUrl}
            className="map-section__iframe"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="map-section__cta"
          >
            <ContactIcon name="directions" size={16} />
            Get Directions
          </a>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          D. THE UNNATI EXPERIENCE (static)
      ════════════════════════════════════════════════════════ */}
      <section className="experience">
        <div className="experience__container">
          <div className="experience__header">
            <h2 className="experience__title">The Unnati Experience</h2>
            <span className="experience__rule" />
          </div>

          <div className="experience__grid">
            {experienceFeatures.map((f) => (
              <div className="experience-card" key={f.id}>
                <ContactIcon name={f.icon} size={26} className="experience-card__icon" />
                <h3 className="experience-card__title">{f.title}</h3>
                <p className="experience-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          E. FAQ & INQUIRY SECTION (static, accordion + form)
      ════════════════════════════════════════════════════════ */}
      <section className="faq-inquiry">
        <div className="faq-inquiry__container">
          <div className="faq-inquiry__grid">
            
            {/* Left: FAQs Accordion */}
            <div className="faq-inquiry__faq-block">
              <h2 className="faq-inquiry__title">Frequently Asked Questions</h2>
              <div className="faq__list">
                {faqs.map((item) => {
                  const isOpen = openFaqId === item.id;
                  return (
                    <div
                      className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
                      key={item.id}
                    >
                      <button
                        className="faq-item__trigger"
                        onClick={() => toggleFaq(item.id)}
                        aria-expanded={isOpen}
                      >
                        <span className="faq-item__question">{item.question}</span>
                        <ContactIcon
                          name="chevronDown"
                          size={18}
                          className="faq-item__chevron"
                        />
                      </button>
                      <div className="faq-item__panel">
                        <p className="faq-item__answer">{item.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Inquiry Form */}
            <div className="faq-inquiry__form-block">
              <h2 className="faq-inquiry__title">Send an Inquiry</h2>
              <div className="inquiry-form-card">
                {submitted ? (
                  <div className="inquiry-success-message">
                    <span className="inquiry-success-icon">✓</span>
                    <h3 className="inquiry-success-title">Thank You!</h3>
                    <p className="inquiry-success-text">Your inquiry has been submitted. Our team will get back to you shortly.</p>
                  </div>
                ) : (
                  <form className="inquiry-form" onSubmit={handleInquirySubmit}>
                    {status.message && (
                      <div 
                        style={{
                          padding: "12px 16px",
                          borderRadius: "4px",
                          fontFamily: "var(--font-body, sans-serif)",
                          fontSize: "0.85rem",
                          marginBottom: "16px",
                          lineHeight: "1.4",
                          background: "#f8d7da",
                          color: "#721c24",
                          border: "1px solid #f5c6cb"
                        }}
                      >
                        {status.message}
                      </div>
                    )}
                    <div className="inquiry-form__group">
                      <label htmlFor="inquiry-name" className="inquiry-form__label">Full Name *</label>
                      <input
                        type="text"
                        id="inquiry-name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        className="inquiry-form__input"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="inquiry-form__group">
                      <label htmlFor="inquiry-email" className="inquiry-form__label">Email Address</label>
                      <input
                        type="email"
                        id="inquiry-email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className="inquiry-form__input"
                        placeholder="name@example.com"
                      />
                    </div>
                    <div className="inquiry-form__group">
                      <label htmlFor="inquiry-phone" className="inquiry-form__label">Phone Number</label>
                      <input
                        type="tel"
                        id="inquiry-phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="inquiry-form__input"
                        placeholder="Your contact number"
                      />
                    </div>
                    <div className="inquiry-form__group">
                      <label htmlFor="inquiry-message" className="inquiry-form__label">Message *</label>
                      <textarea
                        id="inquiry-message"
                        name="message"
                        value={formState.message}
                        onChange={handleInputChange}
                        className="inquiry-form__textarea"
                        rows={4}
                        placeholder="How can we help you today?"
                        required
                      />
                    </div>
                    <button type="submit" disabled={loading} className="btn-gold inquiry-form__submit">
                      {loading ? "Sending..." : "Send Inquiry"}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Contact;
