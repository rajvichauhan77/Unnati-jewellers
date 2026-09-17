import { useState, useEffect } from "react";
import { fetchStylingItems } from "../services/stylingService";

/**
 * Hook to manage loading of CMS styling reels.
 */
export const useStylingItems = () => {
  const [styling, setStyling] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const loadStyling = async () => {
      try {
        const data = await fetchStylingItems();
        if (active) {
          if (data && data.length > 0) {
            setStyling(data);
          }
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(err);
          setLoading(false);
        }
      }
    };

    loadStyling();

    return () => {
      active = false;
    };
  }, []);

  return { styling, loading, error };
};
