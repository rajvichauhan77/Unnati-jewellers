import { cleanImageUrl } from "./bannerService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.unnatijewellers.com/api/v1";
const API_KEY = import.meta.env.VITE_API_KEY || "Au7Kv7L7LhtLcS5XTABzc2S55aybYnZnkMQeG5gOOQuW83TVQk5v2CLdjfmN/rrSu4q1gMjAJ7WsDXVrP4/ZYQ==";

const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
});

/**
 * Fetch styling items from backend API.
 * @returns {Promise<Array>} List of dynamic styling/reel items.
 */
export const fetchStylingItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cms/styling`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch styling items: ${response.statusText}`);
    }

    const result = await response.json();
    if (result.success && result.data && result.data.length > 0) {
      return result.data.map((item) => {
        return {
          id: item._id || item.id,
          title: item.title || "Unnati Style Edit",
          caption: item.title || "Gold that speaks for itself 💛",
          videoUrl: item.videoUrl ? cleanImageUrl(item.videoUrl) : "",
          thumbnailUrl: item.thumbnailUrl ? cleanImageUrl(item.thumbnailUrl) : "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
          reelUrl: item.videoUrl ? cleanImageUrl(item.videoUrl) : "https://www.instagram.com/unnatijewellersin/",
          productName: "Classic Fine Jewellery",
        };
      });
    }
    return [];
  } catch (error) {
    console.error("Error fetching styling items:", error);
    return [];
  }
};
