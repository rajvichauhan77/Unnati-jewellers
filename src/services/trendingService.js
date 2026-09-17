import { cleanImageUrl } from "./bannerService";
import { slugify } from "../utils/slugify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.unnatijewellers.com/api/v1";
const API_KEY = import.meta.env.VITE_API_KEY || "Au7Kv7L7LhtLcS5XTABzc2S55aybYnZnkMQeG5gOOQuW83TVQk5v2CLdjfmN/rrSu4q1gMjAJ7WsDXVrP4/ZYQ==";

const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
});

/**
 * Fetch a single product by ID.
 * @param {string} productId 
 * @returns {Promise<Object|null>} Product details or null.
 */
export const fetchProductById = async (productId) => {
  if (!productId) return null;
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      // Try alternative endpoint /products/product/:id if direct fails
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
 * Fetch dynamic trending items and resolve their product details (images, pricing, etc.)
 * @returns {Promise<Array>} Resolved list of trending products.
 */
export const fetchTrendingItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cms/trending`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch trending items: ${response.statusText}`);
    }

    const result = await response.json();
    if (result.success && result.data && result.data.length > 0) {
      const resolvedItems = await Promise.all(
        result.data.map(async (item) => {
          // Fetch product details for image & price
          const productDetail = await fetchProductById(item.productId);

          let imageUrl = "";
          let price = null;

          if (productDetail) {
            // Support single image or array       of images
            const rawImg = productDetail.imageUrl || productDetail.image || (productDetail.images && productDetail.images[0]);
            imageUrl = cleanImageUrl(rawImg);
            price = productDetail.price || productDetail._price;
          }

          // Return compiled slide details
          return {
            id: item._id || item.id,
            productId: item.productId,
            name: item.title || (productDetail && productDetail.name) || "Unnati Fine Jewellery",
            subtitle: item.subtitle || "HOT SELLER",
            image: imageUrl || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
            price: price ? `₹ ${price.toLocaleString("en-IN")}` : null,
            path: `/product/${productDetail?.slug || (productDetail ? slugify(productDetail.name || productDetail.productName || productDetail.title) : "") || item.productId}`,
          };
        })
      );
      return resolvedItems;
    }
    return [];
  } catch (error) {
    console.error("Error fetching trending items:", error);
    return [];
  }
};
