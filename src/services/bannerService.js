import { fetchAllCategoriesAndSubcategories } from "./categoryService";
import { slugify } from "../utils/slugify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.unnatijewellers.com/api/v1";
const API_KEY = import.meta.env.VITE_API_KEY || "Au7Kv7L7LhtLcS5XTABzc2S55aybYnZnkMQeG5gOOQuW83TVQk5v2CLdjfmN/rrSu4q1gMjAJ7WsDXVrP4/ZYQ==";

const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
});

/**
 * Clean image URLs returned by the API. If they contain localhost:3000, 
 * replace it with the correct API host.
 * @param {string} url 
 * @returns {string} Cleaned URL.
 */
export const cleanImageUrl = (url) => {
  if (!url) return "";
  return url.replace(/https?:\/\/localhost:\d+/, "http://api.unnatijewellers.com");
};

/**
 * Fetch active hero banners from backend API.
 * @returns {Promise<Array>} List of formatted banners.
 */
export const fetchHeroBanners = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cms/banners?active=true`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch hero banners: ${response.statusText}`);
    }

    const result = await response.json();
    if (result.success && result.data && result.data.length > 0) {
      // Load categories and products to map IDs to slugs
      let categories = [];
      let products = [];
      try {
        categories = await fetchAllCategoriesAndSubcategories();
      } catch (err) {
        console.error("Failed to load categories map in bannerService:", err);
      }
      try {
        const { fetchAllProducts } = await import("./productService");
        products = await fetchAllProducts();
      } catch (err) {
        console.error("Failed to load products list in bannerService:", err);
      }

      return result.data.map((banner) => {
        // Map backend linkType and linkTarget to buttonLink path
        let buttonLink = "/collections/products";
        if (banner.linkType === "category") {
          const category = categories.find((cat) => cat.id === banner.linkTarget);
          if (category) {
            buttonLink = `/category/${slugify(category.label)}/products`;
          } else {
            buttonLink = `/category/${banner.linkTarget}/products`;
          }
        } else if (banner.linkType === "subcategory") {
          let matchedSub = null;
          for (const cat of categories) {
            const found = cat.subcategories?.find((sub) => sub.id === banner.linkTarget);
            if (found) {
              matchedSub = found;
              break;
            }
          }
          if (matchedSub) {
            buttonLink = `/subcategory/${slugify(matchedSub.label)}/products`;
          } else {
            buttonLink = `/subcategory/${banner.linkTarget}/products`;
          }
        } else if (banner.linkType === "product") {
          // If a product slug or id is used
          const isId = /^[0-9a-fA-F]{24}$/.test(banner.linkTarget);
          if (isId && products.length > 0) {
            const matched = products.find(p => p.id === banner.linkTarget);
            if (matched) {
              buttonLink = `/product/${matched.slug}`;
            } else {
              buttonLink = `/product/${banner.linkTarget}`;
            }
          } else {
            buttonLink = `/product/${banner.linkTarget}`;
          }
        }

        const cleanImg = cleanImageUrl(banner.imageUrl);

        return {
          id: banner._id || banner.id,
          title: banner.title,
          subtitle: banner.subtitle,
          buttonText: banner.btnText || "Explore Collection",
          buttonLink,
          desktopImage: cleanImg,
          mobileImage: cleanImg,
        };
      });
    }
    return [];
  } catch (error) {
    console.error("Error fetching hero banners:", error);
    return [];
  }
};
