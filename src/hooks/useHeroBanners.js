import { useState, useEffect } from "react";
import { fetchHeroBanners } from "../services/bannerService";

/**
 * Hook to manage fetching of hero banners.
 */
export const useHeroBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const loadBanners = async () => {
      try {
        const data = await fetchHeroBanners();
        console.log("Unnati Banners dynamic data loaded:", data);
        if (active) {
          if (data && data.length > 0) {
            setBanners(data);
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

    loadBanners();

    return () => {
      active = false;
    };
  }, []);

  return { banners, loading, error };
};
