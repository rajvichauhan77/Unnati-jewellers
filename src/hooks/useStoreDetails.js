import { useState, useEffect } from "react";
import { fetchStoreDetails } from "../services/storeService";
import storeImage from "../assets/images/store.png";

const DEFAULT_STORE = {
  address: "GROUND FLOOR, SHOP NO.2, SHANTI SKY, WAGHAVADI ROAD,\nPARIMAL CHOWK, Bhavnagar, Gujarat, 364001",
  hoursWeekdays: "Mon – Sat: 10:00 AM – 08:00 PM",
  hoursSunday: "Sunday: By Appointment Only",
  phone: "+91 6351630432",
  email: "support@unnatijewellers.com",
  imageUrl: storeImage,
};

/**
 * Hook to manage loading of CMS store info.
 */
export const useStoreDetails = () => {
  const [store, setStore] = useState(DEFAULT_STORE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const loadStore = async () => {
      try {
        const data = await fetchStoreDetails();
        if (active) {
          if (data) {
            setStore((prev) => ({
              address: data.address || prev.address,
              hoursWeekdays: data.hoursWeekdays || prev.hoursWeekdays,
              hoursSunday: data.hoursSunday || prev.hoursSunday,
              phone: data.phone || prev.phone,
              email: data.email || prev.email,
              imageUrl: data.imageUrl || prev.imageUrl,
            }));
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

    loadStore();

    return () => {
      active = false;
    };
  }, []);

  return { store, loading, error };
};
