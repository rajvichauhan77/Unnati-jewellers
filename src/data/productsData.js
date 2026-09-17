// ── Product Catalog ────────────────────────────────────────────────
// Replace with API call later: GET /api/products
// Pricing is calculated dynamically from live gold/silver rates,
// not hardcoded — see calculateProductPrice() below.

import { fetchGoldRate, fetchLatestRates } from "../services/goldRateService";

/**
 * Calculates a product's live price.
 * price = (metal weight * metal rate/gram) + making charges + stone value
 */
export async function calculateProductPrice(product) {
  if (!product) return 0;

  // 1. Prioritize fixed price if set
  if (product.isFixedPrice && product.fixedPrice > 0) {
    return Math.round(product.fixedPrice);
  }

  // 2. Prioritize pre-calculated price from backend API
  if (product.calculatedPrice > 0) {
    return Math.round(product.calculatedPrice);
  }

  let metalRate = 0;
  const metalType = (product.metalType || "").toLowerCase();
  const purity = (product.purity || "").toLowerCase();

  try {
    const rates = await fetchLatestRates();
    
    if (metalType.includes("gold")) {
      if (purity.includes("24k")) {
        metalRate = rates.goldCalculated?.k24 || 0;
      } else if (purity.includes("22k")) {
        metalRate = rates.goldCalculated?.k22 || 0;
      } else if (purity.includes("20k")) {
        metalRate = rates.goldCalculated?.k20 || 0;
      } else if (purity.includes("18k")) {
        metalRate = rates.goldCalculated?.k18 || 0;
      } else if (purity.includes("14k")) {
        metalRate = rates.goldCalculated?.k14 || 0;
      } else {
        metalRate = rates.goldCalculated?.k22 || 0;
      }
    } else if (metalType.includes("silver")) {
      if (purity.includes("999")) {
        metalRate = (rates.silverCalculated?.s999 || 226998) / 1000;
      } else if (purity.includes("925")) {
        metalRate = (rates.silverCalculated?.s925 || 209973.15) / 1000;
      } else {
        metalRate = (rates.silverCalculated?.ordinary || 181598.4) / 1000;
      }
    } else if (metalType.includes("platinum")) {
      metalRate = 3400;
    } else {
      if (purity.includes("24k")) metalRate = rates.goldCalculated?.k24 || 0;
      else if (purity.includes("22k")) metalRate = rates.goldCalculated?.k22 || 0;
      else if (purity.includes("20k")) metalRate = rates.goldCalculated?.k20 || 0;
      else if (purity.includes("18k")) metalRate = rates.goldCalculated?.k18 || 0;
      else if (purity.includes("14k")) metalRate = rates.goldCalculated?.k14 || 0;
      else if (purity.includes("999")) metalRate = (rates.silverCalculated?.s999 || 226998) / 1000;
      else if (purity.includes("925")) metalRate = (rates.silverCalculated?.s925 || 209973.15) / 1000;
      else {
        metalRate = 0;
      }
    }
  } catch (error) {
    console.error("Error fetching live rate, using fallbacks:", error);
    if (metalType.includes("gold-22k") || purity.includes("22k")) {
      metalRate = 13000;
    } else if (metalType.includes("gold-18k") || purity.includes("18k")) {
      metalRate = 11100;
    } else if (metalType.includes("silver") || purity.includes("999") || purity.includes("925")) {
      metalRate = 220;
    } else {
      metalRate = 0;
    }
  }

  const weight = parseFloat(product.netWeightGrams || product.grossWeightGrams || product.weightGrams || product.weight) || 10;
  const makingChargePercent = parseFloat(product.makingChargePercent || product.makingCharges || product.makingChargeValue || 12);
  const otherCharges = parseFloat(product.otherCharges || product.otherCharge || product.otherChargesValue || product.otherChargeValue || 0) || 0;
  const stoneValue = parseFloat(product.stoneValue || product.stonePrice) || 0;

  const metalValue = product.metalValue > 0 ? product.metalValue : (weight * metalRate);
  const makingValue = product.makingCharge > 0 ? product.makingCharge : (metalValue * (makingChargePercent / 100));
  const subtotal = metalValue + makingValue + stoneValue + otherCharges;
  const gstPercent = parseFloat(product.gstPercent || product.gstValue || 3);
  const gstValue = product.gst > 0 ? product.gst : (subtotal * (gstPercent / 100));

  return Math.round(subtotal + gstValue);
}

// ── Product List ────────────────────────────────────────────────────
export const products = [];

// ── Search query helper ───────────────────────────────────────────
export function matchesSearchQuery(product, query) {
  if (!query || !query.trim()) return true;
  if (!product) return false;

  const q = query.toLowerCase().trim();
  const terms = q.split(/\s+/).filter(Boolean);

  const searchableText = [
    product.name,
    product.productName,
    product.title,
    product.categoryName,
    product.categoryId,
    product.subCategoryName,
    product.subcategoryName,
    product.subcategoryId,
    product.collectionName,
    product.metalType,
    product.rawMetalType,
    product.purity,
    product.stoneType,
    product.occasion,
    product.gender,
    product.description,
    product.productCode,
    product.slug,
    ...(Array.isArray(product.badges) ? product.badges : []),
    ...(Array.isArray(product.tags) ? product.tags : []),
    ...(Array.isArray(product.specs) ? product.specs.map((s) => `${s.label} ${s.value}`) : []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return terms.every((term) => searchableText.includes(term));
}

// ── Filtering helper ───────────────────────────────────────────────
export function filterProducts(list, filters) {
  return list.filter((p) => {
    if (filters.search && !matchesSearchQuery(p, filters.search)) return false;
    if (filters.gender?.length && !filters.gender.includes(p.gender)) return false;
    const activeCatFilter = (filters.categoryId || []).filter(c => c !== "all-jewellery");
    if (activeCatFilter.length) {
      const matchesCategory = activeCatFilter.some((catId) => {
        if (catId === "6a57262fbe71db62ce019ddd") {
          return (p.metalType || "").toLowerCase().includes("gold");
        }
        if (catId === "6a572657be71db62ce019e9d") {
          return (p.metalType || "").toLowerCase().includes("silver");
        }
        return p.categoryId === catId;
      });
      if (!matchesCategory) return false;
    }
    if (filters.subcategoryId?.length && !filters.subcategoryId.includes(p.subcategoryId)) return false;
    if (filters.metalType?.length) {
      const selectedMetals = filters.metalType.map((f) => f.toLowerCase());
      const KARAT_LIST = ["24k", "22k", "20k", "18k", "14k"];
      const specificKarats = selectedMetals.filter((f) => KARAT_LIST.includes(f));

      const normMetal = (p.metalType || "").toLowerCase();
      const normPurity = (p.purity || "").toLowerCase();
      const normRawMetal = (p.rawMetalType || "").toLowerCase();

      if (specificKarats.length > 0) {
        const matchesSpecificKarat = specificKarats.some((k) => {
          const digit = k.replace("k", "");
          return (
            normMetal.includes(k) ||
            normPurity.includes(k) ||
            normRawMetal.includes(k) ||
            normPurity.includes(digit) ||
            normMetal.includes(digit)
          );
        });

        const nonKaratFilters = selectedMetals.filter((f) => !KARAT_LIST.includes(f) && f !== "gold");
        let matchesOtherMetal = false;
        if (nonKaratFilters.length > 0) {
          matchesOtherMetal = nonKaratFilters.some((f) => {
            if (f === "silver999") return normMetal.includes("silver") && (normPurity.includes("999") || normPurity.includes("99.9"));
            if (f === "silver925") return normMetal.includes("silver") && (normPurity.includes("925") || normPurity.includes("92.5"));
            return normMetal.includes(f) || normPurity.includes(f);
          });
        }

        if (!matchesSpecificKarat && !matchesOtherMetal) return false;
      } else {
        const matchesMetal = selectedMetals.some((f) => {
          if (f === "silver999") return normMetal.includes("silver") && (normPurity.includes("999") || normPurity.includes("99.9"));
          if (f === "silver925") return normMetal.includes("silver") && (normPurity.includes("925") || normPurity.includes("92.5"));
          return normMetal.includes(f) || normPurity.includes(f);
        });             
        if (!matchesMetal) return false;
      }
    }
    if (filters.stoneType?.length && !filters.stoneType.includes(p.stoneType)) return false;
    if (filters.occasion?.length && !filters.occasion.includes(p.occasion)) return false;
    if (filters.weightMin != null && p.weightGrams < filters.weightMin) return false;
    if (filters.weightMax != null && p.weightGrams > filters.weightMax) return false;
    if (filters.isNew && !p.isNew) return false;
    if (filters.isTrending && !p.isTrending) return false;
    if (filters.isBestSeller && !p.isBestSeller) return false;
    return true;
  });
}

export function sortProducts(list, sortId) {
  const sorted = [...list];
  switch (sortId) {
    case "price-low-high":
      return sorted.sort((a, b) => (a._price ?? 0) - (b._price ?? 0));
    case "price-high-low":
      return sorted.sort((a, b) => (b._price ?? 0) - (a._price ?? 0));
    case "popularity":
      return sorted.sort((a, b) => b.popularityScore - a.popularityScore);
    case "newest":
    default:
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}
