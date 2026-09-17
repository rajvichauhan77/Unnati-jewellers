import { useState, useEffect } from "react";
import { fetchTimelessCollections } from "../services/collectionService";

/**
 * Hook to manage fetching of CMS timeless collections.
 */
export const useTimelessCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const loadCollections = async () => {
      try {
        const data = await fetchTimelessCollections();
        if (active) {
          if (data && data.length > 0) {
            setCollections(data);
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

    loadCollections();

    return () => {
      active = false;
    };
  }, []);

  return { collections, loading, error };
};
