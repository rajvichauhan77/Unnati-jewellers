const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.unnatijewellers.com/api/v1";
const API_KEY = import.meta.env.VITE_API_KEY || "Au7Kv7L7LhtLcS5XTABzc2S55aybYnZnkMQeG5gOOQuW83TVQk5v2CLdjfmN/rrSu4q1gMjAJ7WsDXVrP4/ZYQ==";

const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  };
  const token = localStorage.getItem("token") || localStorage.getItem("authToken");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

/**
 * Submit an appointment booking request.
 * @param {Object} appointmentData 
 * @returns {Promise<Object>} API response.
 */
export const bookAppointment = async (appointmentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(appointmentData),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error booking appointment:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred while booking your appointment.",
    };
  }
};
