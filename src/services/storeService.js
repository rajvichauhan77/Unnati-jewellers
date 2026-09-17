import { cleanImageUrl } from "./bannerService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.unnatijewellers.com/api/v1";
const API_KEY = import.meta.env.VITE_API_KEY || "Au7Kv7L7LhtLcS5XTABzc2S55aybYnZnkMQeG5gOOQuW83TVQk5v2CLdjfmN/rrSu4q1gMjAJ7WsDXVrP4/ZYQ==";

const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
});

/**
 * Fetch store CMS settings from backend API.
 * @returns {Promise<Object|null>} Store settings details.
 */
export const fetchStoreDetails = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cms/store`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch store details: ${response.statusText}`);
    }

    const result = await response.json();
    if (result.success && result.data) {
      const data = result.data;
      return {
        address: data.address || "",
        hoursWeekdays: data.hoursWeekdays || "",
        hoursSunday: data.hoursSunday || "",
        phone: data.phone || "",
        email: data.email || "",
        mediaType: data.mediaType || "image",
        imageUrl: data.imageUrl ? cleanImageUrl(data.imageUrl) : "",
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching store details:", error);
    return null;
  }
};
