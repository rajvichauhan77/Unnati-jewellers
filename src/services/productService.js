import { cleanImageUrl } from "./bannerService";
import { slugify } from "../utils/slugify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.unnatijewellers.com/api/v1";
const API_KEY = import.meta.env.VITE_API_KEY || "Au7Kv7L7LhtLcS5XTABzc2S55aybYnZnkMQeG5gOOQuW83TVQk5v2CLdjfmN/rrSu4q1gMjAJ7WsDXVrP4/ZYQ==";

const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
});

/**
 * Maps database product keys to standard frontend schema format.
 */
export const mapBackendProduct = (p) => {
  let productImages = [];
  if (p.images && Array.isArray(p.images)) {
    productImages = p.images.map((img) => cleanImageUrl(img));
  } else if (p.images && typeof p.images === "string") {
    productImages = [cleanImageUrl(p.images)];
  } else if (p.imageUrl || p.image) {
    productImages = [cleanImageUrl(p.imageUrl || p.image)];
  }

  if (productImages.length === 0) {
    productImages = [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
    ];
  }

  const categoryObj =
    p.category && typeof p.category === "object" ? p.category : null;
  const subCategoryObj =
    p.subCategory && typeof p.subCategory === "object" ? p.subCategory : null;

  const resolvedCategory =
    p.categoryId ||
    (categoryObj ? categoryObj._id || categoryObj.id : p.category) ||
    "women";
  const resolvedCategoryName = categoryObj
    ? categoryObj.categoryName
    : p.categoryName || "";

  const resolvedSubcategory =
    p.subcategoryId ||
    p.subcategory ||
    (subCategoryObj ? subCategoryObj._id || subCategoryObj.id : p.subCategory) ||
    "";
  const resolvedSubcategoryName = subCategoryObj
    ? subCategoryObj.subCategoryName
    : p.subCategoryName || "";

  const combinedPurityText = [
    p.purity,
    p.purityKarat,
    p.metalPurity,
    p.karat,
    p.goldKarat,
    p.goldPurity,
    p.metalType,
    p.metal,
    p.name,
    p.title
  ].filter(Boolean).map(String).join(" ").toLowerCase();

  const metalLower = String(p.metalType || p.metal || "").toLowerCase();

  let normalizedMetalType = "gold-22k";
  let detectedPurity = p.purity ? String(p.purity) : "";

  if (metalLower.includes("silver") || combinedPurityText.includes("silver")) {
    normalizedMetalType = "silver";
    if (!detectedPurity) {
      if (combinedPurityText.includes("999")) detectedPurity = "999 Silver";
      else if (combinedPurityText.includes("925")) detectedPurity = "925 Silver";
      else detectedPurity = "Silver 925";
    }
  } else if (metalLower.includes("platinum") || combinedPurityText.includes("platinum")) {
    normalizedMetalType = "platinum";
    if (!detectedPurity) detectedPurity = "Platinum";
  } else {
    if (combinedPurityText.includes("24k") || combinedPurityText.includes("24 k") || combinedPurityText.includes("24kt") || combinedPurityText.includes("24 kt") || combinedPurityText.includes("24 karat") || combinedPurityText.includes("999")) {
      normalizedMetalType = "gold-24k";
      if (!detectedPurity) detectedPurity = "24K";
    } else if (combinedPurityText.includes("20k") || combinedPurityText.includes("20 k") || combinedPurityText.includes("20kt") || combinedPurityText.includes("20 kt") || combinedPurityText.includes("20 karat") || combinedPurityText.includes("875")) {
      normalizedMetalType = "gold-20k";
      if (!detectedPurity) detectedPurity = "20K";
    } else if (combinedPurityText.includes("18k") || combinedPurityText.includes("18 k") || combinedPurityText.includes("18kt") || combinedPurityText.includes("18 kt") || combinedPurityText.includes("18 karat") || combinedPurityText.includes("750")) {
      normalizedMetalType = "gold-18k";
      if (!detectedPurity) detectedPurity = "18K";
    } else if (combinedPurityText.includes("14k") || combinedPurityText.includes("14 k") || combinedPurityText.includes("14kt") || combinedPurityText.includes("14 kt") || combinedPurityText.includes("14 karat") || combinedPurityText.includes("585")) {
      normalizedMetalType = "gold-14k";
      if (!detectedPurity) detectedPurity = "14K";
    } else if (combinedPurityText.includes("22k") || combinedPurityText.includes("22 k") || combinedPurityText.includes("22kt") || combinedPurityText.includes("22 kt") || combinedPurityText.includes("22 karat") || combinedPurityText.includes("916")) {
      normalizedMetalType = "gold-22k";
      if (!detectedPurity) detectedPurity = "22K";
    } else {
      const pKarat = String(p.purityKarat || p.karat || p.goldKarat || "");
      if (pKarat === "24" || combinedPurityText.includes("24")) {
        normalizedMetalType = "gold-24k";
        if (!detectedPurity) detectedPurity = "24K";
      } else if (pKarat === "20" || combinedPurityText.includes("20")) {
        normalizedMetalType = "gold-20k";
        if (!detectedPurity) detectedPurity = "20K";
      } else if (pKarat === "18" || combinedPurityText.includes("18")) {
        normalizedMetalType = "gold-18k";
        if (!detectedPurity) detectedPurity = "18K";
      } else if (pKarat === "14" || combinedPurityText.includes("14")) {
        normalizedMetalType = "gold-14k";
        if (!detectedPurity) detectedPurity = "14K";
      } else if (pKarat === "22" || combinedPurityText.includes("22")) {
        normalizedMetalType = "gold-22k";
        if (!detectedPurity) detectedPurity = "22K";
      } else {
        normalizedMetalType = "gold-22k";
        if (!detectedPurity) detectedPurity = "22K";
      }
    }
  }

  const dynamicWeight =
    parseFloat(
      p.netWeight ??
      p.netWeightGrams ??
      p.netWeightGram ??
      p.weight ??
      p.weightGrams ??
      p.grossWeightGrams ??
      p.grossWeight
    ) || 0;

  const grossWeight =
    parseFloat(
      p.grossWeightGrams ?? p.grossWeight ?? p.weightGrams ?? p.weight ?? dynamicWeight
    ) || dynamicWeight;

  const netWeight =
    parseFloat(
      p.netWeightGrams ?? p.netWeight ?? p.netWeightGram ?? p.weight ?? dynamicWeight
    ) || dynamicWeight;

  const makingPercent =
    parseFloat(
      p.makingChargePercent || p.makingCharges || p.makingChargeValue
    ) || 12;
  const otherCharges =
    parseFloat(
      p.otherCharges ||
      p.otherCharge ||
      p.otherChargesValue ||
      p.otherChargeValue ||
      p.hallmarkCharges ||
      p.hallmarkCharge
    ) || 0;
  const productCode = p.productCode || p._id || p.id;
  const purityVal = detectedPurity || (
    normalizedMetalType.includes("24k") ? "24K" :
      normalizedMetalType.includes("20k") ? "20K" :
        normalizedMetalType.includes("18k") ? "18K" :
          normalizedMetalType.includes("14k") ? "14K" :
            normalizedMetalType.includes("22k") ? "22K" : "Standard Purity"
  );

  // Map backend tags array to frontend badges
  const tagBadges = [];
  if (p.tags && Array.isArray(p.tags)) {
    p.tags.forEach((t) => {
      const lower = t.toLowerCase();
      if (lower.includes("best")) tagBadges.push("best-seller");
      else if (lower.includes("new")) tagBadges.push("new");
      else if (lower.includes("trend")) tagBadges.push("trending");
    });
  }

  const rawBadges = p.badges || [];
  if (p.isBestSeller) tagBadges.push("best-seller");
  if (p.isNew) tagBadges.push("new");
  if (p.isTrending) tagBadges.push("trending");

  const combinedBadges = Array.from(new Set([...rawBadges, ...tagBadges]));

  // Build specifications list
  const customSpecs =
    p.specifications &&
      Array.isArray(p.specifications) &&
      p.specifications.length > 0
      ? p.specifications.map((s) => ({ label: s.name, value: s.value }))
      : [];

  const coreSpecs = [
    { label: "Metal", value: p.metalType || "Gold" },
    { label: "Purity", value: purityVal },
    { label: "Weight", value: `${grossWeight} grams` },
    ...(p.gender ? [{ label: "Gender", value: p.gender }] : []),
    { label: "Product code", value: productCode },
  ];

  // Merge custom specs while avoiding exact label duplicates
  const existingLabels = new Set(coreSpecs.map((s) => s.label.toLowerCase()));
  const mergedSpecs = [...coreSpecs];
  customSpecs.forEach((cs) => {
    if (!existingLabels.has(cs.label.toLowerCase())) {
      mergedSpecs.push(cs);
    }
  });

  const rawDesc = p.description || p.desc || "";
  const descriptionParagraphs =
    Array.isArray(p.descriptionParagraphs) && p.descriptionParagraphs.length > 0
      ? p.descriptionParagraphs
      : rawDesc
        ? [rawDesc]
        : [];

  return {
    id: p._id || p.id,
    _id: p._id || p.id,
    name: p.name || p.productName || p.title || "",
    productName: p.productName || p.name || p.title || "",
    slug: p.slug || slugify(p.name || p.productName || p.title) || p._id || p.id,
    productCode: productCode,
    collectionName:
      p.collectionName ||
      (p.collection && p.collection.title) ||
      resolvedSubcategoryName ||
      resolvedCategoryName ||
      "",
    categoryId: resolvedCategory,
    categoryName: resolvedCategoryName,
    subcategoryId: resolvedSubcategory,
    subCategoryName: resolvedSubcategoryName,
    gender: (p.gender || "").toLowerCase(),
    metalType: normalizedMetalType,
    rawMetalType: p.metalType || "",
    stoneType: p.stoneType || p.stone || "",
    purity: purityVal,
    occasion: p.occasion || "",
    weightGrams: grossWeight,
    grossWeightGrams: grossWeight,
    netWeightGrams: netWeight,
    makingChargePercent: makingPercent,
    makingChargeType: p.makingChargeType || "",
    makingChargeValue: parseFloat(p.makingChargeValue) || makingPercent,
    otherChargeType: p.otherChargeType || "",
    otherChargeValue: parseFloat(p.otherChargeValue) || 0,
    otherCharges: otherCharges,
    stoneValue: parseFloat(p.stoneValue || p.stonePrice) || 0,
    gstPercent: parseFloat(p.gstPercent || p.gstValue || p.gst) || 3,
    discountPercent: parseFloat(p.discountPercent || p.discount) || 0,
    images: productImages,
    badges: combinedBadges,
    isNew: p.isNew || combinedBadges.includes("new"),
    isTrending: p.isTrending || combinedBadges.includes("trending"),
    isBestSeller: p.isBestSeller || combinedBadges.includes("best-seller"),
    isFixedPrice: !!p.isFixedPrice,
    fixedPrice: parseFloat(p.fixedPrice) || 0,
    baseRate: parseFloat(p.baseRate) || 0,
    metalValue: parseFloat(p.metalValue) || 0,
    makingCharge: parseFloat(p.makingCharge) || 0,
    otherCharge: parseFloat(p.otherCharge) || 0,
    gst: parseFloat(p.gst) || 0,
    calculatedPrice: parseFloat(p.calculatedPrice) || 0,
    description: rawDesc,
    descriptionParagraphs: descriptionParagraphs,
    popularityScore: p.popularityScore || 50,
    createdAt: p.createdAt || new Date().toISOString(),
    specs: mergedSpecs,
    specifications: p.specifications || [],
  };
};

let cachedProductsPromise = null;

/**
 * Fetch a single product by ID from backend API.
 * @param {string} productId 
 * @returns {Promise<Object|null>} Raw product details or null.
 */
export const fetchProductById = async (productId) => {
  if (!productId) return null;
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      const fallbackResponse = await fetch(`${API_BASE_URL}/products/product/${productId}`, {
        method: "GET",
        headers: getHeaders(),
      });
      if (!fallbackResponse.ok) return null;
      const fallbackResult = await fallbackResponse.json();
      return fallbackResult.success ? fallbackResult.data : null;
    }

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error(`Error fetching product details for ${productId}:`, error);
    return null;
  }
};

/**
 * Fetch all products from backend API.
 * @returns {Promise<Array>} List of mapped products.
 */
export const fetchAllProducts = async () => {
  if (cachedProductsPromise) return cachedProductsPromise;

  cachedProductsPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products?limit=1000`, {
        method: "GET",
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success && result.data) {
        return result.data.map(mapBackendProduct);
      }
      return [];
    } catch (error) {
      console.error("Error fetching all products:", error);
      // Clear cache so it can retry next time
      cachedProductsPromise = null;
      return [];
    }
  })();

  return cachedProductsPromise;
};

/**
 * Fetch products from the backend with dynamic query filtering.
 * @param {Object} params - The query parameters.
 * @returns {Promise<Object>} Mapped products and pagination info.
 */
export const fetchFilteredProducts = async (params = {}) => {
  try {
    const query = new URLSearchParams();

    if (params.metalType) query.append("metalType", params.metalType);
    if (params.gender) query.append("gender", params.gender);
    if (params.minWeight != null) query.append("minWeight", params.minWeight);
    if (params.maxWeight != null) query.append("maxWeight", params.maxWeight);
    if (params.minPrice != null) query.append("minPrice", params.minPrice);
    if (params.maxPrice != null) query.append("maxPrice", params.maxPrice);
    if (params.tag) query.append("tag", params.tag);
    if (params.search) query.append("search", params.search);
    if (params.page != null) query.append("page", params.page);
    if (params.limit != null) query.append("limit", params.limit);

    // Convert 'null' or undefined collection appropriately
    if (params.collection && params.collection !== "null") {
      query.append("collection", params.collection);
    }
    if (params.category) query.append("category", params.category);
    if (params.subCategory) query.append("subCategory", params.subCategory);

    const response = await fetch(`${API_BASE_URL}/products?${query.toString()}`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch filtered products: ${response.statusText}`);
    }

    const result = await response.json();
    if (result.success && result.data) {
      return {
        products: result.data.map(mapBackendProduct),
        pagination: result.pagination || { total: result.data.length }
      };
    }
    return { products: [], pagination: { total: 0 } };
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return { products: [], pagination: { total: 0 } };
  }
};
