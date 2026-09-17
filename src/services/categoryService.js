import { slugify } from "../utils/slugify";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.unnatijewellers.com/api/v1";
const API_KEY = import.meta.env.VITE_API_KEY || "Au7Kv7L7LhtLcS5XTABzc2S55aybYnZnkMQeG5gOOQuW83TVQk5v2CLdjfmN/rrSu4q1gMjAJ7WsDXVrP4/ZYQ==";

const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
});

/**
 * Maps a category name to a valid header icon.
 * @param {string} categoryName 
 * @returns {string} Icon name.
 */
export const mapCategoryIcon = (categoryName) => {
  if (!categoryName) return "ring";
  const name = categoryName.toLowerCase();
  if (name.includes("earring")) return "earrings";
  if (name.includes("ring")) return "rings";
  if (name.includes("gold")) return "gold";
  if (name.includes("silver")) return "silver";
  if (name.includes("gem") || name.includes("diamond")) return "gemstone";
  if (name.includes("wedding") || name.includes("bridal") || name.includes("marriage")) return "wedding";
  return "ring"; // fallback default icon
};

/**
 * Fetch all categories from the API.
 * @returns {Promise<Array>} List of categories.
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

/**
 * Fetch subcategories for a given category ID from the API.
 * @param {string} categoryId - The ID of the category.
 * @returns {Promise<Array>} List of subcategories.
 */
export const fetchSubcategories = async (categoryId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/subcategories`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch subcategories: ${response.statusText}`);
    }

    const result = await response.json();
    if (result.success && result.data) {
      if (categoryId) {
        return result.data.filter(
          (sub) => sub.parentCategory && (sub.parentCategory._id === categoryId || sub.parentCategory.id === categoryId)
        );
      }
      return result.data;
    }
    return [];
  } catch (error) {
    console.error(`Error fetching subcategories for category ${categoryId}:`, error);
    return [];
  }
};

let cachedCategoriesAndSubcategories = null;
let activeFetchPromise = null;

/**
 * Fetch categories and their respective subcategories, formatting them for consumption by header and filters.
 * Utilizes caching to prevent duplicate API requests.
 * @returns {Promise<Array>} List of structured categories.
 */
export const fetchAllCategoriesAndSubcategories = async () => {
  if (cachedCategoriesAndSubcategories) {
    return cachedCategoriesAndSubcategories;
  }

  if (activeFetchPromise) {
    return activeFetchPromise;
  }

  activeFetchPromise = (async () => {
    try {
      const categories = await fetchCategories();
      
      const response = await fetch(`${API_BASE_URL}/subcategories`, {
        method: "GET",
        headers: getHeaders(),
      });

      let subcategories = [];
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          subcategories = result.data;
        }
      }

      const detailedCategories = categories.map((cat) => {
        const matchingSubcats = subcategories.filter(
          (sub) => sub.parentCategory && (sub.parentCategory._id === cat._id || sub.parentCategory.id === cat._id)
        );
        
        return {
          id: cat._id,
          label: cat.categoryName,
          icon: mapCategoryIcon(cat.categoryName),
          path: `/category/${slugify(cat.categoryName)}/products`,
          image: cat.image,
          displayOrder: cat.displayOrder,
          isActive: cat.isActive,
          subcategories: matchingSubcats.map((sub) => ({
            id: sub._id,
            label: sub.subCategoryName,
            path: `/subcategory/${slugify(sub.subCategoryName)}/products`,
            image: sub.image,
            isActive: sub.isActive,
          })),
        };
      });

      cachedCategoriesAndSubcategories = detailedCategories;
      return detailedCategories;
    } catch (err) {
      console.error("Error loading categories hierarchy:", err);
      return [];
    } finally {
      activeFetchPromise = null;
    }
  })();

  return activeFetchPromise;
};
