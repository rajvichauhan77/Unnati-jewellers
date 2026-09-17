const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.unnatijewellers.com/api/v1";
const API_KEY = import.meta.env.VITE_API_KEY || "Au7Kv7L7LhtLcS5XTABzc2S55aybYnZnkMQeG5gOOQuW83TVQk5v2CLdjfmN/rrSu4q1gMjAJ7WsDXVrP4/ZYQ==";

/**
 * Fetch website maintenance status from backend API.
 * @returns {Promise<boolean>} True if under maintenance, false otherwise.
 */
export const fetchMaintenanceStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cms/maintenance`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return Boolean(data && data.success && data.underMaintenance === true);
  } catch (error) {
    console.error("Error fetching maintenance status:", error);
    return false;
  }
};
