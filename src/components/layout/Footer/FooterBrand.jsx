import { Link, useLocation } from "react-router-dom";

const FooterBrand = () => {
  const location = useLocation();

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="uj-footer-brand">
      <Link
        to="/"
        className="brand-logo"
        aria-label="Unnati Jewellers — Home"
        style={{ marginBottom: "20px", display: "inline-flex" }}
        onClick={handleLogoClick}
      >
        <span className="brand-logo__main">Unnati</span>
        <span className="brand-logo__sub">Jewellers</span>
      </Link>
      <p className="uj-footer-brand-desc">
        Crafting Contemporary Heritage Since 1992. A legacy built on trust,
        transparency, and timeless design.
      </p>
    </div>
  );
};

export default FooterBrand;
