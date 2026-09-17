import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "../../ui/Icon";
import { topNavLinks, categoryNav } from "../../../data/navigationData";

const SEARCH_SUGGESTIONS = [
  "Necklaces",
  "Rings",
  "Bangles",
  "Earrings",
];

const MobileDrawer = ({ isOpen, onClose, goldRate, categories = categoryNav }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchWrapRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggle = (id) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const filteredSuggestions = searchValue
    ? SEARCH_SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(searchValue.toLowerCase())
      )
    : SEARCH_SUGGESTIONS;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
      setSearchFocused(false);
      onClose();
      navigate(`/collections/products?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    setShowSuggestions(false);
    setSearchFocused(false);
    onClose();
    navigate(`/collections/products?search=${encodeURIComponent(suggestion)}`);
  };

  // Close suggestions and reset focus when drawer is closed, sync search query
  useEffect(() => {
    if (!isOpen) {
      setShowSuggestions(false);
      setSearchFocused(false);
    }
    const params = new URLSearchParams(location.search);
    setSearchValue(params.get("search") || "");
  }, [isOpen, location]);

  // Click-outside to close search suggestions
  useEffect(() => {
    const handler = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setShowSuggestions(false);
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${isOpen ? "drawer-backdrop--visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={`mobile-drawer ${isOpen ? "mobile-drawer--open" : ""}`}
        aria-label="Mobile navigation"
        aria-modal={isOpen}
        role="dialog"
      >
        {/* Header */}
        <div className="mobile-drawer__header">
          <Link
            to="/"
            className="brand-logo"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              onClose();
            }}
          >
            <span className="brand-logo__main">Unnati</span>
            <span className="brand-logo__sub">Jewellers</span>
          </Link>
          <button
            className="mobile-drawer__close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <Icon name="close" size={22} />
          </button>
        </div>

        {/* Search */}
        <div
          ref={searchWrapRef}
          className={`mobile-drawer__search ${
            searchFocused ? "mobile-drawer__search--focused" : ""
          }`}
        >
          <Icon name="search" size={16} className="drawer-search-icon" />
          <input
            type="text"
            placeholder="Search jewellery..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setSearchFocused(true);
              setShowSuggestions(true);
            }}
            className="mobile-drawer__search-input"
            aria-label="Search jewellery"
            autoComplete="off"
          />
          {searchValue && (
            <button
              className="search-clear"
              onClick={() => {
                setSearchValue("");
                setShowSuggestions(true);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#bba89e",
                padding: "3px",
                display: "flex",
                alignItems: "center",
                borderRadius: "50%",
                flexShrink: 0,
              }}
              aria-label="Clear search"
            >
              <Icon name="close" size={13} />
            </button>
          )}

          {/* Suggestions dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="search-suggestions" role="listbox">
              <div className="search-suggestions__label">Popular Searches</div>
              {filteredSuggestions.map((s) => (
                <div
                  key={s}
                  role="option"
                  className="search-suggestions__item"
                  onMouseDown={() => handleSuggestionClick(s)}
                >
                  <Icon name="search" size={14} className="suggest-icon" />
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gold rate pill */}
        {goldRate && (
          <Link
            to="/gold-rate"
            onClick={onClose}
            className="mobile-drawer__gold"
            style={{ display: "block", textDecoration: "none", color: "inherit" }}
          >
            <span className="gold-rate__dot" />
            Live Gold Rate: {goldRate.currency}
            {Math.round(goldRate.rate24kt * 10).toLocaleString("en-IN")}/10g (24KT)
          </Link>
        )}

        {/* Top nav links */}
        <nav className="mobile-drawer__top-nav" aria-label="Primary navigation">
          {topNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-drawer__top-link ${location.pathname === link.path ? "active" : ""
                }`}
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mobile-drawer__divider" />

        {/* Category accordion */}
        <div className="mobile-drawer__categories">
          <p className="mobile-drawer__section-label">Shop by Category</p>
          {categories.map((cat) => (
            <div key={cat.id} className="drawer-category">
              <button
                className={`drawer-category__trigger ${expandedId === cat.id ? "drawer-category__trigger--open" : ""
                  }`}
                onClick={() => toggle(cat.id)}
                aria-expanded={expandedId === cat.id}
              >
                <span className="drawer-category__label">
                  <Icon name={cat.icon} size={18} />
                  {cat.label}
                </span>
                <Icon
                  name="chevronDown"
                  size={16}
                  className={`drawer-chevron ${expandedId === cat.id ? "drawer-chevron--rotated" : ""
                    }`}
                />
              </button>

              {/* Accordion panel */}
              <div
                className={`drawer-category__panel ${expandedId === cat.id ? "drawer-category__panel--open" : ""
                  }`}
              >
                <Link
                  to={cat.path}
                  className="drawer-sub-link drawer-sub-link--all"
                  onClick={onClose}
                >
                  View  {cat.label}
                </Link>
                {cat.subcategories.map((sub) => (
                  <Link
                    key={sub.path}
                    to={sub.path}
                    className="drawer-sub-link"
                    onClick={onClose}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTAs */}
        <div className="mobile-drawer__footer">
          <Link
            to="/book-appointment"
            className="mobile-drawer__cta"
            onClick={onClose}
          >
            Book Appointment
          </Link>
          <Link
            to="/suvarna-scheme"
            className="mobile-drawer__cta mobile-drawer__cta--outline"
            onClick={onClose}
          >
            Suvarna Gold Scheme
          </Link>
        </div>
      </aside>
    </>
  );
};

export default MobileDrawer;
