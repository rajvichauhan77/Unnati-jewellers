import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ProductFilters from "../components/products/ProductFilters";
import ProductCard from "../components/products/ProductCard";
import QuickViewModal from "../components/products/QuickViewModal";
import ProductIcon from "../components/ui/ProductIcon";
import { products, filterProducts, sortProducts, matchesSearchQuery } from "../data/productsData";
import { sortOptions } from "../data/categoryTaxonomy";
import { useProductPrices } from "../hooks/useProductPrices";
import { fetchAllProducts, fetchFilteredProducts } from "../services/productService";
import { fetchShowcaseCollections } from "../services/collectionService";
import { fetchUnnatiWorlds } from "../services/worldService";
import { useCategories } from "../hooks/useCategories";
import { slugify } from "../utils/slugify";
import "./Products.css";

const INITIAL_FILTERS = {};
const PAGE_SIZE = 8;

const LOCAL_SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-low-high", label: "Price: Low to High" },
  { id: "price-high-low", label: "Price: High to Low" },
  { id: "popularity", label: "Most Popular" },
  { id: "newest", label: "Newest" },
];

const Products = () => {
  const { categorySlug, subcategorySlug, collectionSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { categories: catNavList, loading: catsLoading } = useCategories();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const searchQuery = searchParams.get("search") || "";

  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [sort, setSort] = useState("featured");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const [allProducts, setAllProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    if (catsLoading) return;

    let active = true;
    setProductsLoading(true);
    if (page === 1) {
      setAllProducts([]);
    }

    const apiParams = {
      page: 1,
      limit: page * PAGE_SIZE,
      search: searchQuery,
    };

    const activeCatFilter = (filters.categoryId || []).filter(c => c !== "all-jewellery");
    if (activeCatFilter.length) {
      apiParams.category = activeCatFilter.join(",");
    }
    if (filters.subcategoryId?.length) {
      apiParams.subCategory = filters.subcategoryId.join(",");
    }
    if (filters.gender?.length) {
      apiParams.gender = filters.gender.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(",");
    }
    
    const activeMetalTypes = [...(filters.metalType || [])];
    if (activeCatFilter.includes("6a57262fbe71db62ce019ddd")) {
      activeMetalTypes.push("24k", "22k", "20k", "18k", "gold");
    }
    if (activeCatFilter.includes("6a572657be71db62ce019e9d")) {
      activeMetalTypes.push("silver999", "silver925", "silver");
    }
    if (activeMetalTypes.length) {
      const KARAT_LIST = ["24k", "22k", "20k", "18k", "14k"];
      const userKarats = (filters.metalType || []).filter((m) => KARAT_LIST.includes(m.toLowerCase()));
      if (userKarats.length > 0) {
        apiParams.metalType = Array.from(new Set(userKarats)).join(",");
      } else {
        apiParams.metalType = Array.from(new Set(activeMetalTypes)).join(",");
      }
    }
    if (filters.weightMin != null) apiParams.minWeight = filters.weightMin;
    if (filters.weightMax != null) apiParams.maxWeight = filters.weightMax;
    if (filters.priceMin != null) apiParams.minPrice = filters.priceMin;
    if (filters.priceMax != null) apiParams.maxPrice = filters.priceMax;

    const activeTags = [];
    if (filters.isTrending) activeTags.push("trending now");
    if (filters.isNew) activeTags.push("new arrivals");
    if (filters.isBestSeller) activeTags.push("best sellers");
    if (activeTags.length > 0) {
      apiParams.tag = activeTags.join(",");
    }

    const loadProducts = async () => {
      let resolvedCol = "null";

      if (collectionSlug && collectionSlug !== "trending" && collectionSlug !== "new-arrivals" && collectionSlug !== "best-sellers") {
        const hardcoded = ["mangalsutra-edit", "grand-heritage-necklaces", "kundan-sets", "handcrafted-bangles", "diamond-rings", "pearl-elegance", "bracelet-edit", "temple-jewels", "eternal-solitaires"];
        if (!hardcoded.includes(collectionSlug)) {
          // 1) Try showcase collections first
          try {
            const showcases = await fetchShowcaseCollections();
            if (showcases && showcases.length > 0) {
              for (const subArray of showcases) {
                const meta = subArray.find(item => item && item.id !== undefined && item.title !== undefined);
                if (meta && slugify(meta.title) === collectionSlug) {
                  resolvedCol = meta.id;
                  break;
                }
              }
            }
          } catch (err) {
            console.error("Failed to map collection slug to ID via showcase:", err);
          }

          // 2) If still unresolved, try CMS world items (Unnati World cards)
          if (resolvedCol === "null") {
            try {
              const worldItems = await fetchUnnatiWorlds();
              const match = worldItems.find(
                (wi) => wi.type === "collection" && slugify(wi.title) === collectionSlug
              );
              if (match) {
                resolvedCol = match.targetId;
              }
            } catch (err) {
              console.error("Failed to map collection slug to ID via world CMS:", err);
            }
          }
        }
        if (resolvedCol === "null") {
          resolvedCol = collectionSlug;
        }
      } else {
        const queryCol = searchParams.get("collection");
        if (queryCol && queryCol !== "trending" && queryCol !== "new" && queryCol !== "best-seller") {
          resolvedCol = queryCol;
        }
      }

      if (resolvedCol && resolvedCol !== "null") {
        apiParams.collection = resolvedCol;
      } else {
        apiParams.collection = "null";
      }

      try {
        const { products: fetchedProducts, pagination } = await fetchFilteredProducts(apiParams);
        if (active) {
          let finalProducts = fetchedProducts || [];

          if (searchQuery.trim()) {
            finalProducts = finalProducts.filter((p) => matchesSearchQuery(p, searchQuery));
            if (finalProducts.length === 0) {
              const allBackendProducts = await fetchAllProducts();
              const pool = (allBackendProducts && allBackendProducts.length > 0) ? allBackendProducts : products;
              finalProducts = pool.filter((p) => matchesSearchQuery(p, searchQuery));
            }
          }

          finalProducts = filterProducts(finalProducts, filters);

          const totalFromApi = pagination?.total;
          const finalTotal = (totalFromApi != null && totalFromApi > 0)
            ? totalFromApi
            : (fetchedProducts && fetchedProducts.length >= apiParams.limit
                ? (page + 1) * PAGE_SIZE
                : finalProducts.length);

          setAllProducts(finalProducts);
          setTotalCount(finalTotal);
          setProductsLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch filtered products:", err);
        if (active) {
          let pool = products;
          if (searchQuery.trim()) {
            pool = products.filter((p) => matchesSearchQuery(p, searchQuery));
          }
          const localFiltered = filterProducts(pool, filters);
          const finalTotal = localFiltered.length >= apiParams.limit ? (page + 1) * PAGE_SIZE : localFiltered.length;
          setAllProducts(localFiltered);
          setTotalCount(finalTotal);
          setProductsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, [filters, page, catsLoading, location.search, searchQuery, collectionSlug]);

  const { pricedProducts, loading: pricesLoading } = useProductPrices(allProducts);
  const loading = productsLoading || pricesLoading || catsLoading;

  useEffect(() => {
    if (catsLoading) return;

    let nextFilters = {};

    if (categorySlug) {
      const matchedCat = catNavList.find(
        (c) => slugify(c.label) === categorySlug.toLowerCase() || c.id === categorySlug
      );
      if (matchedCat && matchedCat.id !== "all-jewellery") {
        nextFilters.categoryId = [matchedCat.id];
      }
    } else if (subcategorySlug) {
      let matchedSub = null;
      let matchedParentCatId = null;

      for (const cat of catNavList) {
        const found = cat.subcategories?.find(
          (s) => slugify(s.label) === subcategorySlug.toLowerCase() || s.id === subcategorySlug
        );
        if (found) {
          matchedSub = found;
          matchedParentCatId = cat.id;
          break;
        }
      }

      if (matchedSub) {
        nextFilters.subcategoryId = [matchedSub.id];
        if (matchedParentCatId && matchedParentCatId !== "all-jewellery") {
          nextFilters.categoryId = [matchedParentCatId];
        }
      }
    } else if (collectionSlug) {
      if (collectionSlug === "trending") {
        nextFilters.isTrending = true;
      } else if (collectionSlug === "new-arrivals") {
        nextFilters.isNew = true;
      } else if (collectionSlug === "best-sellers") {
        nextFilters.isBestSeller = true;
      } else if (collectionSlug === "mangalsutra-edit") {
        nextFilters.subcategoryId = ["women-mangalsutra", "bridal-mangalsutra"];
      } else if (collectionSlug === "grand-heritage-necklaces") {
        nextFilters.subcategoryId = ["women-necklace"];
      } else if (collectionSlug === "kundan-sets") {
        nextFilters.subcategoryId = ["kundan-jewellery"];
      } else if (collectionSlug === "handcrafted-bangles") {
        nextFilters.subcategoryId = ["women-bangles"];
      } else if (collectionSlug === "diamond-rings") {
        nextFilters.subcategoryId = ["women-rings"];
      } else if (collectionSlug === "pearl-elegance") {
        nextFilters.subcategoryId = ["pearl-jewellery"];
      } else if (collectionSlug === "bracelet-edit") {
        nextFilters.subcategoryId = ["women-bracelet"];
      } else if (collectionSlug === "temple-jewels") {
        nextFilters.subcategoryId = ["temple-jewels"];
      } else if (collectionSlug === "eternal-solitaires") {
        nextFilters.stoneType = ["diamond"];
      }
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      const queryCat = searchParams.get("category") || searchParams.get("categoryId");
      const querySub = searchParams.get("subcategory") || searchParams.get("subcategoryId");
      const queryCol = searchParams.get("collection");

      if (queryCat) {
        const matchedCat = catNavList.find(
          (c) => c.id === queryCat || slugify(c.label) === queryCat.toLowerCase()
        );
        if (matchedCat && matchedCat.id !== "all-jewellery") {
          nextFilters.categoryId = [matchedCat.id];
        }
      }
      if (querySub) {
        let matchedSub = null;
        let matchedParentCatId = null;
        for (const cat of catNavList) {
          const found = cat.subcategories?.find(
            (s) => s.id === querySub || slugify(s.label) === querySub.toLowerCase()
          );
          if (found) {
            matchedSub = found;
            matchedParentCatId = cat.id;
            break;
          }
        }
        if (matchedSub) {
          nextFilters.subcategoryId = [matchedSub.id];
          if (matchedParentCatId && matchedParentCatId !== "all-jewellery") {
            nextFilters.categoryId = [matchedParentCatId];
          }
        }
      }
      if (queryCol) {
        if (queryCol === "trending") nextFilters.isTrending = true;
        else if (queryCol === "new") nextFilters.isNew = true;
        else if (queryCol === "best-seller") nextFilters.isBestSeller = true;
        else if (queryCol === "mangalsutra-edit") {
          nextFilters.subcategoryId = ["women-mangalsutra", "bridal-mangalsutra"];
        } else if (queryCol === "grand-heritage-necklaces") {
          nextFilters.subcategoryId = ["women-necklace"];
        } else if (queryCol === "kundan-sets") {
          nextFilters.subcategoryId = ["kundan-jewellery"];
        } else if (queryCol === "handcrafted-bangles") {
          nextFilters.subcategoryId = ["women-bangles"];
        } else if (queryCol === "diamond-rings") {
          nextFilters.subcategoryId = ["women-rings"];
        } else if (queryCol === "pearl-elegance") {
          nextFilters.subcategoryId = ["pearl-jewellery"];
        } else if (queryCol === "bracelet-edit") {
          nextFilters.subcategoryId = ["women-bracelet"];
        } else if (queryCol === "temple-jewels") {
          nextFilters.subcategoryId = ["temple-jewels"];
        } else if (queryCol === "eternal-solitaires") {
          nextFilters.stoneType = ["diamond"];
        }
      }
    }

    setFilters(nextFilters);
    setPage(1);
  }, [categorySlug, subcategorySlug, collectionSlug, catNavList, catsLoading, window.location.search]);

  const filtered = useMemo(() => {
    const f = filterProducts(pricedProducts, filters);

    // price filter needs live _price
    return f.filter((p) => {
      if (filters.priceMin != null && p._price < filters.priceMin) return false;
      if (filters.priceMax != null && p._price > filters.priceMax) return false;
      return true;
    });
  }, [pricedProducts, filters]);

  const sorted = useMemo(() => {
    if (sort === "featured") {
      return [...filtered].sort((a, b) => {
        const scoreA = (a.isBestSeller ? 2 : 0) + (a.isTrending ? 1 : 0);
        const scoreB = (b.isBestSeller ? 2 : 0) + (b.isTrending ? 1 : 0);
        if (scoreA !== scoreB) {
          return scoreB - scoreA;
        }
        return b.popularityScore - a.popularityScore;
      });
    }
    return sortProducts(filtered, sort);
  }, [filtered, sort]);
  const visible = sorted;
  const hasMore = visible.length < totalCount;

  const clearAll = () => {
    setFilters(INITIAL_FILTERS);
    setPage(1);
  };

  const handleFilterChange = (fn) => {
    setFilters(fn);
    setPage(1);
  };

  const activeFilterCount = [
    ...(filters.categoryId || []),
    ...(filters.subcategoryId || []),
    ...(filters.metalType || []),
    ...(filters.stoneType || []),
    ...(filters.gender || []),
    ...(filters.occasion || []),
    filters.isNew,
    filters.isTrending,
    filters.isBestSeller,
  ].filter(Boolean).length;

  return (
    <main className="products-page">
      {/* ── Page header ── */}
      <div className="products-page__header">
        <div className="products-page__header-inner">
          <h1 className="products-page__title">
            {searchQuery ? `Search Results for "${searchQuery}"` : "All Jewellery"}
          </h1>
          <p className="products-page__subtitle">
            {loading ? "Loading…" : `${sorted.length} pieces`}
          </p>
        </div>
      </div>

      <div className="products-layout">
        {/* ── Desktop Sidebar ── */}
        <ProductFilters
          filters={filters}
          setFilters={handleFilterChange}
          onClearAll={clearAll}
          resultCount={sorted.length}
          onWeightLimitExceeded={() => setShowWarning(true)}
          categories={catNavList}
        />

        {/* ── Mobile filter drawer backdrop ── */}
        {drawerOpen && (
          <div
            className="products-drawer-backdrop"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        {/* ── Mobile filter drawer ── */}
        <div
          className={`products-drawer ${drawerOpen ? "products-drawer--open" : ""}`}
        >
          <div className="products-drawer__header">
            <span>Filters</span>
            <button
              onClick={() => setDrawerOpen(false)}
              className="products-drawer__close"
            >
              <ProductIcon name="close" size={20} />
            </button>
          </div>
          <div className="products-drawer__body">
            <ProductFilters
              filters={filters}
              setFilters={handleFilterChange}
              onClearAll={clearAll}
              resultCount={sorted.length}
              onWeightLimitExceeded={() => setShowWarning(true)}
              categories={catNavList}
            />
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="products-main">
          {/* ── Toolbar ── */}
          <div className="products-toolbar">
            <div className="products-toolbar__left-btns">
              <button
                className="products-toolbar__filter-btn"
                onClick={() => setDrawerOpen(true)}
              >
                <ProductIcon name="filter" size={16} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="products-toolbar__filter-badge">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <button
                className="products-toolbar__sort-mobile-btn"
                onClick={() => setMobileSortOpen(true)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="16" y2="12" />
                  <line x1="4" y1="18" x2="12" y2="18" />
                </svg>
                Sort
              </button>
            </div>

            <div className="products-toolbar__right">
              <span className="products-toolbar__count">
                {loading ? "" : `${sorted.length} results`}
              </span>
              <div className="products-toolbar__sort-container products-sort-desktop-only">
                <button
                  className="products-sort-trigger"
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  aria-label="Sort options menu"
                >
                  <span>Sort by: {LOCAL_SORT_OPTIONS.find((o) => o.id === sort)?.label}</span>
                  <span className={`products-sort-trigger-chevron ${sortDropdownOpen ? "open" : ""}`}>
                    <ProductIcon name="chevronDown" size={12} />
                  </span>
                </button>
                {sortDropdownOpen && (
                  <>
                    <div className="products-sort-dropdown-backdrop" onClick={() => setSortDropdownOpen(false)} />
                    <ul className="products-sort-dropdown-menu">
                      {LOCAL_SORT_OPTIONS.map((o) => (
                        <li
                          key={o.id}
                          className={`products-sort-dropdown-item ${sort === o.id ? "active" : ""}`}
                          onClick={() => {
                            setSort(o.id);
                            setPage(1);
                            setSortDropdownOpen(false);
                          }}
                        >
                          {o.label}
                          {sort === o.id && <span className="products-sort-dropdown-check">✓</span>}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── Active filter chips ── */}
          {activeFilterCount > 0 && (
            <div className="products-chips">
              {[...(filters.gender || [])].map((v) => (
                <button
                  key={v}
                  className="products-chip"
                  onClick={() =>
                    handleFilterChange((p) => ({
                      ...p,
                      gender: p.gender.filter((x) => x !== v),
                    }))
                  }
                >
                  {v} ×
                </button>
              ))}
              {[...(filters.metalType || [])].map((v) => (
                <button
                  key={v}
                  className="products-chip"
                  onClick={() =>
                    handleFilterChange((p) => ({
                      ...p,
                      metalType: p.metalType.filter((x) => x !== v),
                    }))
                  }
                >
                  {v} ×
                </button>
              ))}
              {[...(filters.stoneType || [])].map((v) => (
                <button
                  key={v}
                  className="products-chip"
                  onClick={() =>
                    handleFilterChange((p) => ({
                      ...p,
                      stoneType: p.stoneType.filter((x) => x !== v),
                    }))
                  }
                >
                  {v} ×
                </button>
              ))}
              {filters.isNew && (
                <button
                  className="products-chip"
                  onClick={() =>
                    handleFilterChange((p) => ({ ...p, isNew: false }))
                  }
                >
                  New Arrivals ×
                </button>
              )}
              {filters.isTrending && (
                <button
                  className="products-chip"
                  onClick={() =>
                    handleFilterChange((p) => ({ ...p, isTrending: false }))
                  }
                >
                  Trending ×
                </button>
              )}
              {filters.isBestSeller && (
                <button
                  className="products-chip"
                  onClick={() =>
                    handleFilterChange((p) => ({ ...p, isBestSeller: false }))
                  }
                >
                  Best Sellers ×
                </button>
              )}
              <button
                className="products-chip products-chip--clear"
                onClick={clearAll}
              >
                Clear all
              </button>
            </div>
          )}

          {/* ── Product grid ── */}
          {loading && allProducts.length === 0 ? (
            <div className="products-skeleton-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="products-skeleton-card">
                  <div className="products-skeleton-card__img" />
                  <div className="products-skeleton-card__text" />
                  <div className="products-skeleton-card__text products-skeleton-card__text--short" />
                </div>
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="products-empty">
              <ProductIcon name="grid" size={40} />
              <p>
                {searchQuery
                  ? `No products found matching "${searchQuery}".`
                  : "No products match your filters."}
              </p>
              <button
                className="products-empty__clear"
                onClick={() => {
                  clearAll();
                  if (searchQuery) {
                    navigate("/collections/products");
                  }
                }}
              >
                {searchQuery ? "Clear Search & Filters" : "Clear Filters"}
              </button>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {visible.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
              {loading && (
                <div className="products-skeleton-grid" style={{ marginTop: "20px" }}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={`more-skeleton-${i}`} className="products-skeleton-card">
                      <div className="products-skeleton-card__img" />
                      <div className="products-skeleton-card__text" />
                      <div className="products-skeleton-card__text products-skeleton-card__text--short" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── Load More ── */}
          {hasMore && !loading && (
            <div className="products-load-more">
              <button
                className="products-load-more__btn"
                onClick={() => setPage((p) => p + 1)}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Quick View Modal ── */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* ── Mobile Sort Bottom Sheet ── */}
      {mobileSortOpen && (
        <div className="mobile-sort-overlay" onClick={() => setMobileSortOpen(false)}>
          <div className="mobile-sort-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-sort-sheet__handle" />

            <div className="mobile-sort-sheet__header">
              <div className="mobile-sort-sheet__icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="16" y2="12" />
                  <line x1="4" y1="18" x2="12" y2="18" />
                </svg>
              </div>
              <h3 className="mobile-sort-sheet__title">Sort Collections</h3>
            </div>

            <div className="mobile-sort-sheet__options">
              {LOCAL_SORT_OPTIONS.map((o) => {
                const isSelected = sort === o.id;
                return (
                  <button
                    key={o.id}
                    className={`mobile-sort-sheet__option ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      setSort(o.id);
                      setPage(1);
                      setMobileSortOpen(false);
                    }}
                  >
                    <span className={`mobile-sort-sheet__radio ${isSelected ? "checked" : "unchecked"}`}>
                      {isSelected && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="1.5 4 4 6.5 8.5 2" />
                        </svg>
                      )}
                    </span>
                    <span className="mobile-sort-sheet__option-label">{o.label}</span>
                    {o.id === "featured" && (
                      <span className="mobile-sort-sheet__star">✦</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Warning Modal ── */}
      {showWarning && (
        <div className="filter-warning-overlay" onClick={() => setShowWarning(false)}>
          <div className="filter-warning-modal" onClick={(e) => e.stopPropagation()}>
            <div className="filter-warning-icon">⚠️</div>
            <h4 className="filter-warning-title">Limit Exceeded</h4>
            <p className="filter-warning-desc">
              Weight limit cannot exceed <strong>2000g</strong>.
            </p>
            <button
              className="filter-warning-btn"
              onClick={() => setShowWarning(false)}
            >
              Understand
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Products;
