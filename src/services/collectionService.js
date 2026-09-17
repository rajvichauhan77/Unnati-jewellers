import { fetchCategories } from "./categoryService";
import { cleanImageUrl } from "./bannerService";
import { slugify } from "../utils/slugify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.unnatijewellers.com/api/v1";
const API_KEY = import.meta.env.VITE_API_KEY || "Au7Kv7L7LhtLcS5XTABzc2S55aybYnZnkMQeG5gOOQuW83TVQk5v2CLdjfmN/rrSu4q1gMjAJ7WsDXVrP4/ZYQ==";

const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
});

/**
 * Fetch cms collections and resolve their image URLs from their category mappings.
 * @returns {Promise<Array>} List of resolved collections.
 */
export const fetchTimelessCollections = async () => {
  try {
    const showcases = await fetchShowcaseCollections();
    if (showcases && showcases.length > 0) {
      return showcases.map((subArray) => {
        const colMeta = subArray.find(item => item && item.id !== undefined && item.title !== undefined);
        if (!colMeta) return null;
        const cleanSlug = slugify(colMeta.title);
        return {
          id: colMeta.id,
          title: colMeta.title,
          subtitle: colMeta.description || "EXPLORE THE COLLECTION",
          imageUrl: cleanImageUrl(colMeta.backgroundImage),
          slug: cleanSlug,
          link: `/collection/${cleanSlug}/products`,
        };
      }).filter(Boolean);
    }
    return [];
  } catch (error) {
    console.error("Error fetching timeless collections:", error);
    return [];
  }
};

/**
 * Fetch showcase collections (active).
 * @returns {Promise<Array>} List of showcase collections containing products and metadata.
 */
export const fetchShowcaseCollections = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/collections/showcase/active`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch active showcase collections: ${response.statusText}`);
    }

    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching active showcase collections:", error);
    return [];
  }
};
