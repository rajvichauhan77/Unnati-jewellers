import React from "react";
import FilterGroup from "./FilterGroup";
import {
  categoryTaxonomy,
  metalTypes,
  stoneTypes,
  genderOptions,
  occasionOptions,
  priceRangeBounds,
  weightRangeBounds,
} from "../../data/categoryTaxonomy";

const ProductFilters = ({ filters, setFilters, onClearAll, resultCount, onWeightLimitExceeded, categories = [] }) => {
  const [goldOpen, setGoldOpen] = React.useState(false);
  const [silverOpen, setSilverOpen] = React.useState(false);

  const activeCategoriesList = categories.length > 0 ? categories : categoryTaxonomy;

  const toggleArrayValue = (key, value) => {
    setFilters((prev) => {
      const current = prev[key] || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const toggleCategory = (catId) => {
    setFilters((prev) => {
      const current = prev.categoryId || [];
      const isSelected = current.includes(catId);
      const nextCategoryId = isSelected
        ? current.filter((c) => c !== catId)
        : [...current, catId];

      // cascade: deselect subcategories belonging to a removed category
      const cat = activeCategoriesList.find((c) => c.id === catId || c._id === catId);
      const subIds = cat ? (cat.subcategories || []).map((s) => s.id || s._id) : [];
      const nextSubcategoryId = isSelected
        ? (prev.subcategoryId || []).filter((s) => !subIds.includes(s))
        : prev.subcategoryId || [];

      return { ...prev, categoryId: nextCategoryId, subcategoryId: nextSubcategoryId };
    });
  };

  const selectedCategories = filters.categoryId || [];
  const visibleSubcats = activeCategoriesList.filter((c) => selectedCategories.includes(c.id) || selectedCategories.includes(c._id));

  return (
    <aside className="product-filters">
      <div className="product-filters__header">
        <h3 className="product-filters__title">Filters</h3>
        {resultCount != null && (
          <span className="product-filters__count">{resultCount} items</span>
        )}
      </div>

      <button className="product-filters__clear" onClick={onClearAll}>
        Clear all filters
      </button>

      {/* ── Category (cascades to subcategory) ── */}
      <FilterGroup title="Category">
        {activeCategoriesList.map((cat) => {
          const catId = cat.id || cat._id;
          return (
            <label className="filter-checkbox" key={catId}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(catId)}
                onChange={() => toggleCategory(catId)}
              />
              <span className="filter-checkbox__box" />
              <span className="filter-checkbox__label">{cat.label}</span>
            </label>
          );
        })}
      </FilterGroup>

      {/* ── Subcategory (cascades from category) ── */}
      {visibleSubcats.length > 0 && (
        <FilterGroup title="Subcategory">
          <div className="filter-group__scroll-container">
            {visibleSubcats.map((cat) => {
              const catId = cat.id || cat._id;
              return (
                <div className="filter-subgroup" key={catId}>
                  <p className="filter-subgroup__label">{cat.label}</p>
                  {(cat.subcategories || []).map((sub) => {
                    const subId = sub.id || sub._id;
                    return (
                      <label className="filter-checkbox filter-checkbox--nested" key={subId}>
                        <input
                          type="checkbox"
                          checked={(filters.subcategoryId || []).includes(subId)}
                          onChange={() => toggleArrayValue("subcategoryId", subId)}
                        />
                        <span className="filter-checkbox__box" />
                        <span className="filter-checkbox__label">{sub.label}</span>
                      </label>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </FilterGroup>
      )}

      {/* ── Price Range ── */}
      <FilterGroup title="Price Range">
        <div className="filter-range-inputs">
          <div className="filter-range-input-wrap">
            <span className="filter-range-prefix">₹</span>
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin ?? ""}
              onChange={(e) => {
                const val = e.target.value === "" ? undefined : Number(e.target.value);
                setFilters((prev) => ({ ...prev, priceMin: val }));
              }}
              className="filter-range-field filter-range-field--prefix"
            />
          </div>
          <span className="filter-range-separator">to</span>
          <div className="filter-range-input-wrap">
            <span className="filter-range-prefix">₹</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax ?? ""}
              onChange={(e) => {
                const val = e.target.value === "" ? undefined : Number(e.target.value);
                setFilters((prev) => ({ ...prev, priceMax: val }));
              }}
              className="filter-range-field filter-range-field--prefix"
            />
          </div>
        </div>
      </FilterGroup>

      {/* ── Metal Type ── */}
      <FilterGroup title="Metal Type">
        {/* Gold Category */}
        <div style={{ marginBottom: "8px" }}>
          <div className="filter-metal-parent" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label className="filter-checkbox" style={{ flexGrow: 1, margin: 0 }}>
              <input
                type="checkbox"
                checked={(filters.metalType || []).includes("gold")}
                onChange={() => {
                  const isChecked = (filters.metalType || []).includes("gold");
                  toggleArrayValue("metalType", "gold");
                  if (!isChecked) {
                    setGoldOpen(true);
                  }
                }}
              />
              <span className="filter-checkbox__box" />
              <span className="filter-checkbox__label" style={{ fontWeight: 500, color: "var(--ink)" }}>Gold</span>
            </label>
            <button
              type="button"
              className="filter-metal-toggle"
              onClick={() => setGoldOpen(!goldOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "6px 8px", display: "flex", alignItems: "center" }}
              aria-label="Toggle gold subcategories"
            >
              <span style={{ 
                display: "inline-block", 
                transform: (goldOpen || (filters.metalType || []).includes("gold")) ? "rotate(180deg)" : "rotate(0deg)", 
                transition: "transform 0.25s ease",
                fontSize: "9px",
                color: "var(--muted)"
              }}>
                ▼
              </span>
            </button>
          </div>
          
          {(goldOpen || (filters.metalType || []).includes("gold")) && (
            <div className="filter-metal-children" style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "2px", marginTop: "4px" }}>
              {["24k", "22k", "20k", "18k", "14k"].map((k) => (
                <label className="filter-checkbox" key={k} style={{ padding: "3px 0" }}>
                  <input
                    type="checkbox"
                    checked={(filters.metalType || []).includes(k)}
                    onChange={() => toggleArrayValue("metalType", k)}
                  />
                  <span className="filter-checkbox__box" />
                  <span className="filter-checkbox__label">{k}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Silver Category */}
        <div>
          <div className="filter-metal-parent" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label className="filter-checkbox" style={{ flexGrow: 1, margin: 0 }}>
              <input
                type="checkbox"
                checked={(filters.metalType || []).includes("silver")}
                onChange={() => {
                  toggleArrayValue("metalType", "silver");
                }}
              />
              <span className="filter-checkbox__box" />
              <span className="filter-checkbox__label" style={{ fontWeight: 500, color: "var(--ink)" }}>Silver</span>
            </label>
          </div>
        </div>
      </FilterGroup>

      {/* ── Gender ── */}
      <FilterGroup title="Gender">
        {genderOptions.map((g) => (
          <label className="filter-checkbox" key={g.id}>
            <input
              type="checkbox"
              checked={(filters.gender || []).includes(g.id)}
              onChange={() => toggleArrayValue("gender", g.id)}
            />
            <span className="filter-checkbox__box" />
            <span className="filter-checkbox__label">{g.label}</span>
          </label>
        ))}
      </FilterGroup>

      {/* ── Weight Range ── */}
      <FilterGroup title="Weight Range" defaultOpen={false}>
        <div className="filter-range-inputs">
          <div className="filter-range-input-wrap">
            <input
              type="number"
              placeholder="Min"
              max={2000}
              value={filters.weightMin ?? ""}
              onChange={(e) => {
                const val = e.target.value === "" ? undefined : Number(e.target.value);
                if (val > 2000) {
                  onWeightLimitExceeded();
                  return;
                }
                setFilters((prev) => ({ ...prev, weightMin: val }));
              }}
              className="filter-range-field filter-range-field--suffix"
            />
            <span className="filter-range-suffix">g</span>
          </div>
          <span className="filter-range-separator">to</span>
          <div className="filter-range-input-wrap">
            <input
              type="number"
              placeholder="Max"
              max={2000}
              value={filters.weightMax ?? ""}
              onChange={(e) => {
                const val = e.target.value === "" ? undefined : Number(e.target.value);
                if (val > 2000) {
                  onWeightLimitExceeded();
                  return;
                }
                setFilters((prev) => ({ ...prev, weightMax: val }));
              }}
              className="filter-range-field filter-range-field--suffix"
            />
            <span className="filter-range-suffix">g</span>
          </div>
        </div>
      </FilterGroup>

      {/* ── Quick toggles ── */}
      <FilterGroup title="Highlights" defaultOpen={false}>
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={!!filters.isNew}
            onChange={() => setFilters((p) => ({ ...p, isNew: !p.isNew }))}
          />
          <span className="filter-checkbox__box" />
          <span className="filter-checkbox__label">New Arrivals</span>
        </label>
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={!!filters.isTrending}
            onChange={() => setFilters((p) => ({ ...p, isTrending: !p.isTrending }))}
          />
          <span className="filter-checkbox__box" />
          <span className="filter-checkbox__label">Trending</span>
        </label>
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={!!filters.isBestSeller}
            onChange={() => setFilters((p) => ({ ...p, isBestSeller: !p.isBestSeller }))}
          />
          <span className="filter-checkbox__box" />
          <span className="filter-checkbox__label">Best Sellers</span>
        </label>
      </FilterGroup>
    </aside>
  );
};

export default ProductFilters;
