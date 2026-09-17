import { useState, useEffect } from "react";
import { fetchUnnatiWorlds } from "../services/worldService";

/**
 * Hook to manage fetching of CMS Unnati World bento items.
 */
export const useUnnatiWorld = () => {
  const [worlds, setWorlds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const loadWorlds = async () => {
      try {
        const data = await fetchUnnatiWorlds();
        if (active) {
          if (data && data.length > 0) {
            setWorlds(data);
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

    loadWorlds();

    return () => {
      active = false;
    };
  }, []);

  return { worlds, loading, error };
};
