import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import ProductGallery from "../components/product/ProductGallery";
import PriceBreakdown from "../components/product/PriceBreakdown";
import {
  SpecsAccordion,
  RecentlyViewed,
} from "../components/product/ProductSections";
import { useProductDetailPrice } from "../hooks/useProductDetailPrice";
import { addToRecentlyViewed } from "../data/productDetailData";
import { mapBackendProduct, fetchAllProducts, fetchProductById } from "../services/productService";
import { slugify } from "../utils/slugify";
import { fetchCategories } from "../services/categoryService";
import { bookAppointment } from "../services/appointmentService";
import bookingBannerImg from "../assets/images/gold_jewellery_about.png";
import "./ProductDetail.css";

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

const availabilityConfig = {
  in_stock: { label: "In Stock", color: "#1a6b3c", dot: "#22c55e" },
  made_to_order: { label: "Made to Order", color: "#92400e", dot: "#f59e0b" },
  out_of_stock: { label: "Out of Stock", color: "#991b1b", dot: "#ef4444" },
};

const badgeConfig = {
  new: { label: "New Arrival", bg: "#1a6b3c", color: "#fff" },
  trending: { label: "Trending", bg: "#810B38", color: "#fff" },
  "best-seller": { label: "Best Seller", bg: "#D4AF37", color: "#1C0A12" },
};

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let active = true;
    fetchCategories()
      .then((data) => {
        if (active) setCategories(data);
      })
      .catch(console.error);
    return () => {
      active = false;
    };
  }, []);

  const resolvedCategoryName = useMemo(() => {
    if (!product) return "Category";
    if (product.categoryName) return product.categoryName;
    if (!product.categoryId) return "Category";
    const isId = /^[0-9a-fA-F]{24}$/.test(product.categoryId);
    if (!isId) {
      return product.categoryId.charAt(0).toUpperCase() + product.categoryId.slice(1);
    }
    const found = categories.find(
      (cat) => cat._id === product.categoryId || cat.id === product.categoryId
    );
    return found ? found.categoryName : "Category";
  }, [product, categories]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);

    const loadProduct = async () => {
      try {
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);
        let targetId = slug;
        let matchedFromAll = null;

        if (!isObjectId) {
          const allProds = await fetchAllProducts();
          matchedFromAll = allProds.find(
            (p) =>
              p.slug === slug ||
              slugify(p.name || p.productName || p.title) === slug ||
              p.id === slug ||
              p._id === slug
          );
          if (matchedFromAll) {
            targetId = matchedFromAll.id || matchedFromAll._id;
          }
        }

        let data = null;
        if (/^[0-9a-fA-F]{24}$/.test(targetId)) {
          data = await fetchProductById(targetId);
        }

        if (active) {
          if (data) {
            const mapped = mapBackendProduct(data);
            setProduct(mapped);
            setNotFound(false);
            if (isObjectId && mapped.slug) {
              window.history.replaceState(null, "", `/product/${mapped.slug}`);
            }
          } else if (matchedFromAll) {
            setProduct(matchedFromAll);
            setNotFound(false);
          } else {
            setProduct(null);
            setNotFound(true);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load product detail:", err);
        if (active) {
          setProduct(null);
          setNotFound(true);
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      active = false;
    };
  }, [slug]);

  const {
    breakdown,
    loading: priceLoading,
    goldRate,
  } = useProductDetailPrice(product);
  const [wished, setWished] = useState(false);
  const [shareMsg, setShareMsg] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Booking Modal State & Handlers
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
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

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState({ type: "", message: "" });
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  useEffect(() => {
    if (isBookingModalOpen && product) {
      setBookingFormData((prev) => ({
        ...prev,
        product: product.id || product.slug || "",
      }));
    }
  }, [isBookingModalOpen, product]);

  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setBookingFormData((prev) => ({ ...prev, [name]: digitsOnly.slice(0, 10) }));
      return;
    }
    if (name === "preferredDate") {
      const todayStr = getTodayString();
      if (value && value < todayStr) {
        setBookingFormData((prev) => ({ ...prev, [name]: todayStr }));
        return;
      }
    }
    setBookingFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const todayStr = getTodayString();
    if (!bookingFormData.fullName || !bookingFormData.phone || !bookingFormData.preferredDate) {
      setBookingStatus({ type: "error", message: "Please fill in all required fields (*)." });
      return;
    }

    if (bookingFormData.phone.length !== 10) {
      setBookingStatus({ type: "error", message: "Phone number must be exactly 10 digits." });
      return;
    }

    if (bookingFormData.preferredDate < todayStr) {
      setBookingStatus({ type: "error", message: "Preferred date cannot be in the past." });
      return;
    }

    setBookingLoading(true);
    setBookingStatus({ type: "", message: "" });

    try {
      const submissionData = { ...bookingFormData };
      const response = await bookAppointment(submissionData);
      if (response.success) {
        setBookingStatus({
          type: "success",
          message: "Thank you! Your appointment has been successfully requested.",
        });
        setShowBookingSuccess(true);
        setIsBookingModalOpen(false); // Close modal
        
        // Reset form
        setBookingFormData({
          fullName: "",
          emailAddress: "",
          phone: "",
          preferredDate: "",
          preferredTime: "Morning",
          purposeOfVisit: "Wedding Jewellery Consultation",
          estimatedBudget: "₹50,000 - ₹2,00,000",
          additionalRequirements: "",
          product: product ? (product.id || product.slug || "") : "",
        });

        // Hide success alert after 3.5s
        setTimeout(() => {
          setBookingStatus({ type: "", message: "" });
          setShowBookingSuccess(false);
        }, 3500);
      } else {
        setBookingStatus({
          type: "error",
          message: response.message || "Failed to request appointment. Please try again.",
        });
      }
    } catch (err) {
      setBookingStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setBookingLoading(false);
    }
  };



  // Track recently viewed and update page metadata
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
      if (product.name) {
        document.title = `Unnati - ${product.name}`;
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.content = `Explore the exquisite ${product.name} at Unnati. Certified purity, timeless design, and premium craftsmanship.`;
        }
      }
    }
  }, [product]);

  // Share handler
  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `${product.name} — ${product.collectionName} | Unnati Jewellers`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (_) {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShareMsg("Link copied!");
      setTimeout(() => setShareMsg(""), 2500);
    }
  };

  // WhatsApp enquiry
  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi, I'm interested in: *${product.name}*. Could you share more details?\n\nProduct Link: ${window.location.href}`,
    );
    window.open(`https://wa.me/916351630432?text=${msg}`, "_blank");
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div className="loading-spinner" style={{ width: "40px", height: "40px", border: "3px solid rgba(129, 11, 56, 0.1)", borderTop: "3px solid #810B38", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!product || notFound) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h2 style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#810B38", marginBottom: "12px" }}>Product Not Found</h2>
        <p style={{ color: "#666", marginBottom: "24px", maxWidth: "400px" }}>The requested product details could not be found or may no longer be available.</p>
        <Link to="/collections/products" className="pd-btn pd-btn--primary" style={{ textDecoration: "none", display: "inline-block", padding: "12px 24px", background: "#810B38", color: "#fff", borderRadius: "4px" }}>
          Browse All Products
        </Link>
      </div>
    );
  }

  const descriptionParagraphs = product.descriptionParagraphs || 
    (product.description ? [product.description] : ["Exquisitely handcrafted jewellery piece of timeless beauty."]);

  const specs = product.specs?.length ? product.specs : [
    { label: "Metal", value: product.metalTypeLabel || product.metalType || "Gold" },
    { label: "Purity", value: product.purity || "22k" },
    { label: "Gross weight", value: `${product.grossWeightGrams || product.weightGrams} grams` },
    { label: "Making Charges", value: `${product.makingChargePercent}%` },
    { label: "Occasion", value: product.occasion || "Bridal, Festive, Daily Wear" },
    { label: "Hallmark", value: "BIS Hallmarked" },
    { label: "Product code", value: product.productCode || product.id },
  ];

  const avail =
    availabilityConfig[product.availabilityStatus] ||
    availabilityConfig.in_stock;

  return (
    <main className="pd-page">
      {/* ── Breadcrumb ── */}
      <nav className="pd-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">›</span>
        <Link to="/collections">Collections</Link>
        <span aria-hidden="true">›</span>
        <Link to={`/category/${product.categoryId}/products`}>
          {resolvedCategoryName}
        </Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      {/* ── Main 2-col layout ── */}
      <div className="pd-layout">
        {/* ═══ LEFT: Gallery ═══ */}
        <div className="pd-gallery-col">
          <ProductGallery
            images={product.images}
            videoUrl={product.videoUrl}
            badges={product.badges}
          />
        </div>

        {/* ═══ RIGHT: Info ═══ */}
        <div className="pd-info-col">
          {/* Collection + badges */}
          <div className="pd-info__top">
            <span className="pd-collection">{product.collectionName}</span>
            {product.badges?.length > 0 && (
              <div className="pd-badges">
                {product.badges.map((b) => {
                  const cfg = badgeConfig[b];
                  return cfg ? (
                    <span
                      key={b}
                      className="pd-badge"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      {cfg.label}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* Name */}
          <h1 className="pd-name">{product.name}</h1>



          {/* Price block */}
          <div className="pd-price-block">
            {priceLoading ? (
              <div className="pd-price-skeleton" />
            ) : breakdown ? (
              <>
                <div className="pd-price-row">
                  {breakdown.hasDiscount && breakdown.mrp && (
                    <span className="pd-price--mrp">
                      ₹{breakdown.mrp.toLocaleString("en-IN")}
                    </span>
                  )}
                  <span className="pd-price--main">
                    ₹{breakdown.total.toLocaleString("en-IN")}
                  </span>
                  {breakdown.hasDiscount && (
                    <span className="pd-price--off">
                      {product.discountPercent}% off
                    </span>
                  )}
                </div>
                <p className="pd-price-incl">Inclusive of all taxes</p>

                {goldRate && (
                  <div className="pd-live-rate">
                    <span className="pd-live-rate__dot" />
                    Live gold rate: <strong>{goldRate}</strong>
                  </div>
                )}

                <PriceBreakdown breakdown={breakdown} goldRate={goldRate} />
              </>
            ) : null}
          </div>

          {/* Quick specs grid */}
          <div className="pd-quick-specs">
            <div className="pd-quick-spec">
              <span className="pd-quick-spec__label">Purity</span>
              <span className="pd-quick-spec__val">{product.purity}</span>
            </div>
            <div className="pd-quick-spec">
              <span className="pd-quick-spec__label">Net weight</span>
              <span className="pd-quick-spec__val">
                {product.netWeightGrams ?? product.weightGrams ?? product.weight ?? 0} grams
              </span>
            </div>
            {product.grossWeightGrams > 0 &&
              product.grossWeightGrams !== product.netWeightGrams && (
                <div className="pd-quick-spec">
                  <span className="pd-quick-spec__label">Gross weight</span>
                  <span className="pd-quick-spec__val">
                    {product.grossWeightGrams} grams
                  </span>
                </div>
              )}
          </div>

          {/* Variants */}
          {product.variants?.length > 0 && (
            <div className="pd-variants">
              <p className="pd-variants__label">
                Size / Variant
                {selectedVariant && <span> — {selectedVariant.label}</span>}
              </p>
              <div className="pd-variants__options">
                {product.variants.map((v) => (
                  <button
                    key={v.sku}
                    className={`pd-variant-btn ${selectedVariant?.sku === v.sku ? "pd-variant-btn--active" : ""}`}
                    onClick={() => setSelectedVariant(v)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pd-actions">
            <div className="pd-actions__row">
              <button
                className="pd-btn pd-btn--whatsapp"
                onClick={handleWhatsApp}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                  aria-hidden="true"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.488 1.459 5.416 1.46 5.516-.002 10.007-4.49 10.011-10.01.002-2.673-1.04-5.184-2.937-7.084-1.896-1.899-4.41-2.942-7.086-2.943C6.52 1.58 2.03 6.07 2.028 11.59c-.001 1.96.512 3.878 1.492 5.578L2.5 20.83l3.785-.992zm11.233-5.263c-.312-.156-1.85-.913-2.133-1.017-.283-.104-.49-.156-.696.156-.206.312-.8 1.017-.98 1.225-.18.208-.36.234-.672.078-1.56-.78-2.658-1.748-3.48-3.17-.207-.356-.02-.547.137-.704.14-.143.312-.364.468-.546.156-.182.208-.312.312-.52.104-.208.052-.39-.026-.546-.078-.156-.696-1.678-.954-2.302-.25-.6-.546-.52-.696-.52-.156 0-.338-.026-.52-.026-.182 0-.477.065-.728.338-.25.273-1.014 1.014-1.014 2.47 0 1.456 1.06 2.86 1.208 3.056.148.195 2.085 3.183 5.05 4.465.706.305 1.258.487 1.687.625.713.227 1.36.195 1.871.118.571-.085 1.848-.754 2.11-1.48.263-.727.263-1.352.183-1.483-.078-.13-.286-.208-.598-.364z" />
                </svg>
                Enquiry
              </button>

              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="pd-btn pd-btn--primary pd-btn--icon-only"
                title="Book Appointment"
                aria-label="Book Appointment"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </button>

              <button
                className="pd-btn pd-btn--icon pd-btn--icon-only"
                onClick={handleShare}
                aria-label="Share product"
                title="Share"
              >
                {shareMsg ? (
                  <span style={{ fontSize: "10px", textTransform: "none" }}>Copied!</span>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="pd-trust">
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="pd-trust__icon" style={{ color: "var(--color-gold, #d4af37)" }}>
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                ),
                text: "BIS Hallmarked"
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="pd-trust__icon" style={{ color: "var(--color-gold, #d4af37)" }}>
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <polyline points="3 3 3 8 8 8" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <polyline points="16 16 21 16 21 21" />
                  </svg>
                ),
                text: "Gold exchange"
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="pd-trust__icon" style={{ color: "var(--color-gold, #d4af37)" }}>
                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8M10 11.5V5.5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v9M6 14v-2.5a1.5 1.5 0 0 0-1.5-1.5v0A1.5 1.5 0 0 0 3 11.5V16a5 5 0 0 0 5 5h4a8 8 0 0 0 8-8v-2" />
                  </svg>
                ),
                text: "Handcrafted"
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="pd-trust__icon" style={{ color: "var(--color-gold, #d4af37)" }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                text: "Lifetime service"
              }
            ].map((t) => (
              <div key={t.text} className="pd-trust__item">
                <span style={{ display: "flex", alignItems: "center" }} aria-hidden="true">{t.icon}</span>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Below fold: accordion ── */}
      <div className="pd-below">
        <div className="pd-below__inner">
          <SpecsAccordion
            specs={specs}
            description={descriptionParagraphs}
            breakdown={breakdown}
            goldRate={goldRate}
            product={product}
          />
        </div>
      </div>

      {/* ── Related products ── */}
      <div className="pd-related-wrap">
        <RecentlyViewed currentProductId={product.id} />
      </div>

      {/* ── Booking Modal Overlay ── */}
      {isBookingModalOpen && (
        <div className="pd-booking-overlay" onClick={() => setIsBookingModalOpen(false)}>
          <div className="pd-booking-content" onClick={(e) => e.stopPropagation()}>
            <button className="pd-booking-close" onClick={() => setIsBookingModalOpen(false)} aria-label="Close modal">
              &times;
            </button>
            <div className="pd-booking-modal-body">
              {/* Left Column: Image of woman wearing gold jewellery with smooth zoom transition */}
              <div className="pd-booking-banner-col">
                <div className="pd-booking-banner-wrap">
                  <img
                    src={bookingBannerImg}
                    alt="Elegant traditional gold jewellery"
                    className="pd-booking-banner-img"
                  />
                  <div className="pd-booking-banner-overlay">
                    <h3>Exclusive Consultation</h3>
                    <p>Schedule a personal session with our design experts</p>
                  </div>
                </div>
              </div>
              
              {/* Right Column: Appointment Form */}
              <div className="pd-booking-form-col">
                <h2 className="pd-booking-title">Book an Appointment</h2>
                <p className="pd-booking-subtitle">
                  For: <strong>{product?.name}</strong>
                </p>
                
                {bookingStatus.message && (
                  <div className={`alert-box alert-box--${bookingStatus.type}`}>
                    {bookingStatus.message}
                  </div>
                )}
                
                <form onSubmit={handleBookingSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={bookingFormData.fullName}
                        onChange={handleBookingChange}
                        className="form-input"
                        placeholder="Your full name"
                        required
                        disabled={bookingLoading}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="emailAddress"
                        value={bookingFormData.emailAddress}
                        onChange={handleBookingChange}
                        className="form-input"
                        placeholder="you@example.com"
                        disabled={bookingLoading}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={bookingFormData.phone}
                        onChange={handleBookingChange}
                        className="form-input"
                        placeholder="10-digit number"
                        required
                        disabled={bookingLoading}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Preferred Date *</label>
                      <CustomDatePicker
                        name="preferredDate"
                        value={bookingFormData.preferredDate}
                        onChange={handleBookingChange}
                        minDate={getTodayString()}
                        disabled={bookingLoading}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Preferred Time *</label>
                      <CustomSelect
                        name="preferredTime"
                        value={bookingFormData.preferredTime}
                        onChange={handleBookingChange}
                        options={timeOptions}
                        disabled={bookingLoading}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Estimated Budget</label>
                      <CustomSelect
                        name="estimatedBudget"
                        value={bookingFormData.estimatedBudget}
                        onChange={handleBookingChange}
                        options={budgetOptions}
                        disabled={bookingLoading}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Purpose of Visit</label>
                    <CustomSelect
                      name="purposeOfVisit"
                      value={bookingFormData.purposeOfVisit}
                      onChange={handleBookingChange}
                      options={purposeOptions}
                      disabled={bookingLoading}
                    />
                  </div>

                  <button type="submit" disabled={bookingLoading} className="form-submit" style={{ marginTop: "10px" }}>
                    {bookingLoading ? "Submitting..." : "Confirm Appointment"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Booking Success Modal Overlay ── */}
      {showBookingSuccess && (
        <div className="appt-modal-overlay" style={{ zIndex: 2100 }}>
          <div className="appt-modal-content">
            <div className="appt-modal-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="appt-modal-title">Submitted Successfully!</h2>
            <p className="appt-modal-desc">
              Your appointment request for <strong>{product?.name}</strong> has been received. We will contact you shortly to confirm.
            </p>
            <button className="appt-modal-btn" onClick={() => setShowBookingSuccess(false)}>
              Okay, Thanks
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetail;
