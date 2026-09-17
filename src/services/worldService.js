import { fetchProductById } from "./trendingService";
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
 * Fetch dynamic Unnati World showcase items and resolve their target images & paths.
 * @returns {Promise<Array>} List of resolved bento items.
 */
export const fetchUnnatiWorlds = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cms/world`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Unnati World: ${response.statusText}`);
    }

    const result = await response.json();
    if (result.success && result.data && result.data.length > 0) {
      // Fetch categories list in case we need it to resolve category image targets
      let categories = [];
      try {
        categories = await fetchCategories();
      } catch (e) {
        console.error("Failed to load categories map in worldService:", e);
      }

      const resolvedItems = await Promise.all(
        result.data.map(async (item, index) => {
          let imageUrl = "";
          let path = "/collections/products";

          if (item.type === "product") {
            const product = await fetchProductById(item.targetId);
            if (product) {
              const rawImg = product.imageUrl || product.image || (product.images && product.images[0]);
              imageUrl = cleanImageUrl(rawImg);
              path = `/product/${product.slug || slugify(product.name || product.productName || product.title) || item.targetId}`;
            }
          } else if (item.type === "collection") {
            // Fetch products in this collection to get a representative image
            try {
              const colRes = await fetch(
                `${API_BASE_URL}/products?collection=${item.targetId}&limit=1`,
                { method: "GET", headers: getHeaders() }
              );
              if (colRes.ok) {
                const colData = await colRes.json();
                const firstProduct =
                  (colData.data && colData.data[0]) ||
                  (colData.products && colData.products[0]);
                if (firstProduct) {
                  const rawImg =
                    firstProduct.imageUrl ||
                    firstProduct.image ||
                    (firstProduct.images && firstProduct.images[0]);
                  imageUrl = cleanImageUrl(rawImg);
                }
              }
            } catch (e) {
              console.error("Failed to fetch collection preview image:", e);
            }
            // Route to products page using a human-readable slug from the CMS title
            path = `/collection/${slugify(item.title)}/products`;
          } else if (item.type === "category") {
            const category = categories.find(
              (cat) => cat._id === item.targetId || cat.id === item.targetId
            );
            if (category) {
              imageUrl = cleanImageUrl(category.image);
              path = `/category/${slugify(category.categoryName)}/products`;
            } else {
              path = `/category/${item.targetId}/products`;
            }
          }

          return {
            id: item._id || item.id,
            type: item.type,
            targetId: item.targetId,
            title: item.title,
            subtitle: item.subtitle,
            imageUrl: cleanImageUrl(item.imageUrl) || imageUrl,
            path,
            featured: index === 0, // Mark first item as featured for the bento grid layout
          };
        })
      );
      return resolvedItems;
    }
    return [];
  } catch (error) {
    console.error("Error fetching Unnati World data:", error);
    return [];
  }
};
