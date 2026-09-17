import { useState, useEffect } from "react";
import { fetchTrendingItems } from "../services/trendingService";

/**
 * Hook to manage loading of CMS trending products.
 */
export const useTrendingItems = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const loadTrending = async () => {
      try {
        const data = await fetchTrendingItems();
        if (active) {
          if (data && data.length > 0) {
            setTrending(data);
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

    loadTrending();

    return () => {
      active = false;
    };
  }, []);

  return { trending, loading, error };
};
