import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { topNavLinks } from "../../../data/navigationData";
import { useCategories } from "../../../hooks/useCategories";
import { fetchGoldRate } from "../../../services/goldRateService";
import { io } from "socket.io-client";
import { useSticky, useLockBodyScroll } from "../../../hooks/useSticky";
import Icon from "../../ui/Icon";
import MegaMenu from "./MegaMenu";
import MobileDrawer from "./MobileDrawer";
import "./UnnatiHeader.css";

const SEARCH_SUGGESTIONS = [
  "Necklaces",
  "Rings",
  "Bangles",
  "Earrings",
];

const UnnatiHeader = () => {
  const { categories } = useCategories();
  const location = useLocation();
  const navigate = useNavigate();
  const { isSticky, isHidden } = useSticky(60);

  // Mega menu
  const [hoveredCat, setHoveredCat] = useState(null);
  const hoverTimeoutRef = useRef(null);

  // Mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  useLockBodyScroll(drawerOpen);

  // Search
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchWrapRef = useRef(null);

  // Gold rate
  const [goldRate, setGoldRate] = useState(null);

  useEffect(() => {
    fetchGoldRate().then(setGoldRate).catch(() => {});

    const socket = io('https://api.unnatijewellers.com', {
      transports: ['websocket']
    });

    socket.on('metal-rates-update', (payload) => {
      if (payload && payload.success && payload.data) {
        const data = payload.data;
        setGoldRate({
          rate24kt: Math.round(data.goldCalculated.k24),
          rate22kt: Math.round(data.goldCalculated.k22),
          rate20kt: Math.round(data.goldCalculated.k20),
          rate18kt: Math.round(data.goldCalculated.k18),
          currency: "₹",
          unit: "g",
          lastUpdated: data.updatedAt || new Date().toISOString()
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Close everything on route change and sync search query
  useEffect(() => {
    setHoveredCat(null);
    setDrawerOpen(false);
    setShowSuggestions(false);
    const params = new URLSearchParams(location.search);
    setSearchValue(params.get("search") || "");
  }, [location]);

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

  const handleCatEnter = useCallback((catId) => {
    clearTimeout(hoverTimeoutRef.current);
    setHoveredCat(catId);
  }, []);

  const handleCatLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => setHoveredCat(null), 160);
  }, []);

  const handleMegaEnter = useCallback(() => {
    clearTimeout(hoverTimeoutRef.current);
  }, []);

  const handleMegaLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => setHoveredCat(null), 160);
  }, []);

  const activeCategoryData = categories.find((c) => c.id === hoveredCat);

  const filteredSuggestions = searchValue
    ? SEARCH_SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(searchValue.toLowerCase())
      )
    : SEARCH_SUGGESTIONS;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
      setSearchFocused(false);
      navigate(`/collections/products?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    setShowSuggestions(false);
    setSearchFocused(false);
    navigate(`/collections/products?search=${encodeURIComponent(suggestion)}`);
  };

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const headerClasses = [
    "unnati-header",
    isSticky ? "unnati-header--sticky" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* ── Main Header ──────────────────────────────────────────── */}
      <header className={headerClasses}>
        {/* ── Row 1: Logo + Search + Top Nav ─────────────────────── */}
        <div className="unnati-header__top">
          <div className="unnati-header__container">
            {/* Hamburger (mobile only) */}
            <button
              className="unnati-header__hamburger"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
            >
              <Icon name="menu" size={22} />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="brand-logo"
              aria-label="Unnati Jewellers — Home"
              onClick={handleLogoClick}
            >
              <span className="brand-logo__main">Unnati</span>
              <span className="brand-logo__sub">Jewellers</span>
            </Link>

            {/* Search Bar */}
            <div
              ref={searchWrapRef}
              className={`unnati-header__search ${
                searchFocused ? "unnati-header__search--focused" : ""
              }`}
            >
              <Icon name="search" size={17} className="search-icon" />
              <input
                type="text"
                placeholder="Search here..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  setSearchFocused(true);
                  setShowSuggestions(true);
                }}
                className="unnati-header__search-input"
                aria-label="Search jewellery"
                autoComplete="off"
              />
              {searchValue && (
                <button
                  className="search-clear"
                  onClick={() => {
                    setSearchValue("");
                    setShowSuggestions(false);
                    const params = new URLSearchParams(location.search);
                    if (params.get("search")) {
                      navigate("/collections/products");
                    }
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

            {/* Top Nav Links (desktop) */}
            <nav className="unnati-header__top-nav" aria-label="Main navigation">
              {topNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`unnati-header__nav-link ${
                    location.pathname === link.path
                      ? "unnati-header__nav-link--active"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Book Appointment CTA (Desktop) */}
            <Link to="/book-appointment" className="unnati-header__cta desktop-only-cta">
              Book Appointment
            </Link>

            {/* Mobile & Tablet Header Action Icons */}
            <div className="mobile-header-actions">
              <Link to="/collections/products" className="mobile-header-btn" title="All Jewellery" aria-label="All Jewellery">
                <Icon name="necklace" size={20} />
              </Link>
              <Link to="/book-appointment" className="mobile-header-btn" title="Book Appointment" aria-label="Book Appointment">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Divider ─────────────────────────────────────────────── */}
        <div className="unnati-header__divider" />

        {/* ── Row 2: Category Nav + Gold Rate ─────────────────────── */}
        <div className="unnati-header__bottom">
          <div className="unnati-header__container unnati-header__container--bottom">
            {/* Category pills */}
            <nav className="unnati-header__categories" aria-label="Shop by category">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`unnati-header__cat-item ${
                    hoveredCat === cat.id ? "unnati-header__cat-item--active" : ""
                  }`}
                  onMouseEnter={() => handleCatEnter(cat.id)}
                  onMouseLeave={handleCatLeave}
                >
                  <Link to={cat.path} className="unnati-header__cat-link">
                    <Icon name={cat.icon} size={16} className="cat-icon" />
                    <span>{cat.label}</span>
                  </Link>
                  <span className="unnati-header__cat-underline" aria-hidden="true" />
                </div>
              ))}
            </nav>

            <Link to="/gold-rate" className="unnati-header__gold-rate" aria-label="Live gold rate">
              <span className="gold-rate__label">Gold Rate</span>
              {goldRate ? (
                <span className="gold-rate__value">
                  <span className="gold-rate__dot" title="Live" />
                  {goldRate.currency}
                  {Math.round(goldRate.rate24kt * 10).toLocaleString("en-IN")}/10g · 24KT
                </span>
              ) : (
                <span className="gold-rate__value gold-rate__value--loading">
                  Fetching rate…
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ── Mega Menu ─────────────────────────────────────────────── */}
        {hoveredCat && activeCategoryData && (
          <div
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleMegaLeave}
            className="unnati-header__mega-wrapper"
          >
            <MegaMenu
              category={activeCategoryData}
              onClose={() => setHoveredCat(null)}
            />
          </div>
        )}
      </header>

      {/* ── Mobile Drawer ──────────────────────────────────────────── */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        goldRate={goldRate}
        categories={categories}
      />

      {/* Header height spacer (accounts for announce bar + header) */}
      <div
        className="unnati-header__spacer"
      />
    </>
  );
};

export default UnnatiHeader;
