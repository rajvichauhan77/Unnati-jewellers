import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { bookAppointment } from "../services/appointmentService";
import { fetchAllProducts } from "../services/productService";
import { slugify } from "../utils/slugify";
import "./BookAppointment.css";

const timeOptions = [
  { value: "Morning", label: "Morning (10:00 AM – 12:00 PM)" },
  { value: "Afternoon", label: "Afternoon (12:00 PM – 4:00 PM)" },
  { value: "Evening", label: "Evening (4:00 PM – 6:00 PM)" },
];

const budgetOptions = [
  { value: "Under ₹50,000", label: "Under ₹50,000" },
  { value: "₹50,000 - ₹2,00,000", label: "₹50,000 - ₹2,00,000" },
  { value: "₹2,00,000 - ₹5,00,000", label: "₹2,00,000 - ₹5,00,000" },
  { value: "Above ₹5,00,000", label: "Above ₹5,00,000" },
];

const purposeOptions = [
  { value: "Wedding Jewellery Consultation", label: "Wedding Jewellery Consultation" },
  { value: "Gold / Silver Purchase", label: "Gold / Silver Purchase" },
  { value: "Corporate / Bulk Enquiries", label: "Corporate / Bulk Enquiries" },
  { value: "Custom Design", label: "Custom Design" },
  { value: "Jewellery Repair", label: "Jewellery Repair" },
  { value: "Suvarna Scheme Enquiry", label: "Suvarna Scheme Enquiry" },
  { value: "Other", label: "Other" },
];

const parseLocalDate = (dateStr) => {
  if (!dateStr) return null;
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date(dateStr);
};

const CustomSelect = ({ name, value, onChange, options, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div className="custom-select-container" ref={dropdownRef}>
      <div
        className={`custom-select-trigger ${isOpen ? "open" : ""} ${disabled ? "disabled" : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.label : value}</span>
        <span className="custom-select-arrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
      {isOpen && (
        <ul className="custom-select-options">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`custom-select-option ${opt.value === value ? "selected" : ""}`}
              onClick={() => {
                onChange({ target: { name, value: opt.value } });
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const CustomDatePicker = ({ name, value, onChange, minDate, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (value) {
      const parsed = parseLocalDate(value);
      if (parsed) setCurrentMonth(parsed);
    }
  }, [value]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const min = minDate ? parseLocalDate(minDate) : today;
  if (min) min.setHours(0, 0, 0, 0);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const selectDay = (day) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const yyyy = selected.getFullYear();
    const mm = String(selected.getMonth() + 1).padStart(2, "0");
    const dd = String(selected.getDate()).padStart(2, "0");
    onChange({ target: { name, value: `${yyyy}-${mm}-${dd}` } });
    setIsOpen(false);
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysGrid = [];
  for (let i = 0; i < firstDay; i++) {
    daysGrid.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  const selectedDate = value ? parseLocalDate(value) : null;
  if (selectedDate) selectedDate.setHours(0, 0, 0, 0);

  for (let d = 1; d <= daysInMonth; d++) {
    const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
    dateToCheck.setHours(0, 0, 0, 0);
    const isDisabled = dateToCheck < min;
    const isSelected = selectedDate && dateToCheck.getTime() === selectedDate.getTime();
    const isToday = dateToCheck.getTime() === today.getTime();

    daysGrid.push(
      <button
        key={`day-${d}`}
        type="button"
        disabled={isDisabled}
        className={`calendar-day ${isSelected ? "selected" : ""} ${isToday ? "today" : ""} ${isDisabled ? "disabled" : ""}`}
        onClick={() => selectDay(d)}
      >
        {d}
      </button>
    );
  }

  const formatDateDisplay = (val) => {
    if (!val) return "dd-mm-yyyy";
    const d = parseLocalDate(val);
    if (!d) return "";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="custom-datepicker-container" ref={dropdownRef}>
      <div
        className={`custom-datepicker-trigger ${isOpen ? "open" : ""} ${disabled ? "disabled" : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={!value ? "placeholder-text" : ""}>{formatDateDisplay(value)}</span>
        <span className="calendar-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>
      </div>
      {isOpen && (
        <div className="custom-calendar-dropdown">
          <div className="calendar-header">
            <button type="button" onClick={handlePrevMonth} className="calendar-nav-btn">&lt;</button>
            <span className="calendar-month-year">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button type="button" onClick={handleNextMonth} className="calendar-nav-btn">&gt;</button>
          </div>
          <div className="calendar-weekdays">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>
          <div className="calendar-days-grid">{daysGrid}</div>
          <div className="calendar-footer">
            <button
              type="button"
              className="calendar-footer-btn clear-btn"
              onClick={() => {
                onChange({ target: { name, value: "" } });
                setIsOpen(false);
              }}
            >
              Clear
            </button>
            <button
              type="button"
              className="calendar-footer-btn today-btn"
              onClick={() => {
                const yyyy = today.getFullYear();
                const mm = String(today.getMonth() + 1).padStart(2, "0");
                const dd = String(today.getDate()).padStart(2, "0");
                onChange({ target: { name, value: `${yyyy}-${mm}-${dd}` } });
                setIsOpen(false);
              }}
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const rawProductParam = searchParams.get("productId") || searchParams.get("product") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phone: "",
    preferredDate: "",
    preferredTime: "Morning",
    purposeOfVisit: "Wedding Jewellery Consultation",
    estimatedBudget: "₹50,000 - ₹2,00,000",
    additionalRequirements: "",
    product: "",
  });

  useEffect(() => {
    let active = true;

    if (!rawProductParam) {
      setFormData((prev) => ({ ...prev, product: "" }));
      return;
    }

    const resolveProduct = async () => {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(rawProductParam);
      if (isObjectId) {
        if (active) {
          setFormData((prev) => ({ ...prev, product: rawProductParam }));
        }
      } else {
        try {
          const allProds = await fetchAllProducts();
          const matched = allProds.find(
            (p) => p.slug === rawProductParam || slugify(p.name || p.productName || p.title) === rawProductParam
          );
          if (matched && active) {
            setFormData((prev) => ({ ...prev, product: matched.id }));
          }
        } catch (err) {
          console.error("Failed to resolve product slug to ID:", err);
        }
      }
    };

    resolveProduct();

    return () => {
      active = false;
    };
  }, [rawProductParam]);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: digitsOnly.slice(0, 10) }));
      return;
    }
    if (name === "preferredDate") {
      const todayStr = getTodayString();
      if (value && value < todayStr) {
        setFormData((prev) => ({ ...prev, [name]: todayStr }));
        return;
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todayStr = getTodayString();
    if (!formData.fullName || !formData.phone || !formData.preferredDate) {
      setStatus({ type: "error", message: "Please fill in all required fields (*)." });
      return;
    }

    if (formData.phone.length !== 10) {
      setStatus({ type: "error", message: "Phone number must be exactly 10 digits." });
      return;
    }

    if (formData.preferredDate < todayStr) {
      setStatus({ type: "error", message: "Preferred date cannot be in the past." });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const submissionData = { ...formData };
      if (!submissionData.product) {
        delete submissionData.product;
      }

      const response = await bookAppointment(submissionData);
      if (response.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your appointment has been successfully requested. We will contact you shortly.",
        });
        setShowSuccessModal(true);
        // Reset form
        setFormData({
          fullName: "",
          emailAddress: "",
          phone: "",
          preferredDate: "",
          preferredTime: "Morning",
          purposeOfVisit: "Wedding Jewellery Consultation",
          estimatedBudget: "₹50,000 - ₹2,00,000",
          additionalRequirements: "",
          product: formData.product,
        });

        // Hide success message and modal after 3 seconds
        setTimeout(() => {
          setStatus({ type: "", message: "" });
          setShowSuccessModal(false);
        }, 3000);
      } else {
        setStatus({
          type: "error",
          message: response.message || "Failed to request appointment. Please verify your credentials or try again later.",
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

  return (
    <main className="page-inner">
      <div className="page-hero page-hero--maroon">
        <h1 className="page-hero__title">Book an Appointment</h1>
        <p className="page-hero__sub">
          Experience personalised jewellery consultation at your convenience.
        </p>
      </div>

      <div className="page-content container">
        <div className="appointment-form-wrap">
          {status.message && (
            <div className={`alert-box alert-box--${status.type}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            {/* Row 1: Full Name & Email */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your full name"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Row 2: Phone & Date */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="+91 XXXXX XXXXX"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Preferred Date *</label>
                <CustomDatePicker
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  minDate={getTodayString()}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Row 3: Time & Budget */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Preferred Time *</label>
                <CustomSelect
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  options={timeOptions}
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Estimated Budget</label>
                <CustomSelect
                  name="estimatedBudget"
                  value={formData.estimatedBudget}
                  onChange={handleChange}
                  options={budgetOptions}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Row 4: Purpose */}
            <div className="form-group">
              <label className="form-label">Purpose of Visit</label>
              <CustomSelect
                name="purposeOfVisit"
                value={formData.purposeOfVisit}
                onChange={handleChange}
                options={purposeOptions}
                disabled={loading}
              />
            </div>

            {/* Row 5: Notes */}
            <div className="form-group">
              <label className="form-label">Notes (optional)</label>
              <textarea
                name="additionalRequirements"
                value={formData.additionalRequirements}
                onChange={handleChange}
                className="form-input form-textarea"
                rows={4}
                placeholder="Any specific requirements or questions..."
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading} className="form-submit">
              {loading ? "Submitting..." : "Confirm Appointment"}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="appt-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="appt-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="appt-modal-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="appt-modal-title">Submitted Successfully!</h2>
            <p className="appt-modal-desc">
              Your appointment request has been successfully submitted. We will contact you shortly to confirm your booking.
            </p>
            <button className="appt-modal-btn" onClick={() => setShowSuccessModal(false)}>
              Okay, Thanks
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default BookAppointment;