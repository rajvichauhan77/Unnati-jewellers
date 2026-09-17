import React from "react";
import { Link } from "react-router-dom";

const getSubcategoryImage = (label) => {
  const normalized = label.toLowerCase();

  if (normalized.includes("ring")) {
    return "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=80&h=80&fit=crop&q=80";
  }
  if (normalized.includes("necklace") || normalized.includes("mangalsutra") || normalized.includes("choker")) {
    return "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=80&h=80&fit=crop&q=80";
  }
  if (normalized.includes("earring") || normalized.includes("stud") || normalized.includes("jhumka") || normalized.includes("hoop") || normalized.includes("chandbali") || normalized.includes("drop") || normalized.includes("cuff") || normalized.includes("tops")) {
    return "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=80&h=80&fit=crop&q=80";
  }
  if (normalized.includes("bangle") || normalized.includes("bracelet") || normalized.includes("kada") || normalized.includes("band")) {
    return "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=80&h=80&fit=crop&q=80";
  }
  if (normalized.includes("chain")) {
    return "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=80&h=80&fit=crop&q=80";
  }
  if (normalized.includes("pendant")) {
    return "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=80&h=80&fit=crop&q=80";
  }
  if (normalized.includes("nose pin") || normalized.includes("nath")) {
    return "https://images.unsplash.com/photo-1620656798579-1984d2e3799d?w=80&h=80&fit=crop&q=80";
  }
  if (normalized.includes("anklet")) {
    return "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?w=80&h=80&fit=crop&q=80";
  }
  if (normalized.includes("tikka") || normalized.includes("bridal") || normalized.includes("wedding")) {
    return "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=80&h=80&fit=crop&q=80";
  }
  if (normalized.includes("ruby") || normalized.includes("emerald") || normalized.includes("sapphire") || normalized.includes("pearl") || normalized.includes("polki") || normalized.includes("kundan") || normalized.includes("gemstone")) {
    return "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=80&h=80&fit=crop&q=80";
  }
  if (normalized.includes("groom") || normalized.includes("men")) {
    return "https://images.unsplash.com/photo-1621616875450-79f224480400?w=80&h=80&fit=crop&q=80";
  }
  // Default fallback image
  return "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80&h=80&fit=crop&q=80";
};

const MegaMenu = ({ category, onClose }) => {
  if (!category || !category.subcategories?.length) return null;

  return (
    <div
      className="mega-menu"
      role="dialog"
      aria-label={`${category.label} subcategories`}
    >
      <div className="mega-menu__inner">
        {/* Header row */}
        <div className="mega-menu__header">
          <span className="mega-menu__title">{category.label}</span>
          <Link
            to={category.path}
            className="mega-menu__view-all"
            onClick={onClose}
          >
            View  {category.label} →
          </Link>
        </div>

        {/* Grid of subcategories */}
        <div className="mega-menu__grid">
          {category.subcategories.map((sub) => (
            <Link
              key={sub.path}
              to={sub.path}
              className="mega-menu__item"
              onClick={onClose}
            >
              <img
                src={sub.image || getSubcategoryImage(sub.label)}
                alt=""
                className="mega-menu__item-img"
                loading="lazy"
              />
              {sub.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
