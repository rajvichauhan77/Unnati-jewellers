import React, { useState } from "react";
import ProductIcon from "../ui/ProductIcon";

const FilterGroup = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`filter-group ${open ? "filter-group--open" : ""}`}>
      <button
        className="filter-group__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <ProductIcon name="chevronDown" size={16} className="filter-group__chevron" />
      </button>
      <div className="filter-group__panel">
        <div className="filter-group__inner">{children}</div>
      </div>
    </div>
  );
};

export default FilterGroup;
