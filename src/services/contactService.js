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
 * Submit a contact inquiry via POST request to the contact-inquiries API.
 * @param {Object} inquiryData 
 * @returns {Promise<Object>} API response.
 */
export const submitContactInquiry = async (inquiryData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact-inquiries/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        name: inquiryData.name,
        fullName: inquiryData.name,
        email: inquiryData.email,
        emailAddress: inquiryData.email,
        phone: inquiryData.phone,
        phoneNumber: inquiryData.phone,
        phone_number: inquiryData.phone,
        mobile: inquiryData.phone,
        mobileNumber: inquiryData.phone,
        contact: inquiryData.phone,
        contactNumber: inquiryData.phone,
        subject: inquiryData.subject || `Contact Inquiry from ${inquiryData.name || "Customer"}`,
        subject_line: inquiryData.subject || `Contact Inquiry from ${inquiryData.name || "Customer"}`,
        message: inquiryData.message,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error submitting contact inquiry:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred while sending your inquiry.",
    };
  }
};
