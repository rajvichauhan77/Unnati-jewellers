import { useState, useEffect, useRef } from "react";
import { calculateProductPrice } from "../data/productsData";

/**
 * Takes a list of products and returns the same list with a `_price`
 * field attached, computed from live gold/silver rates.
 */
export function useProductPrices(productList) {
  const [pricedProducts, setPricedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function attachPrices() {
      setLoading(true);
      const priced = await Promise.all(
        (productList || []).map(async (p) => {
          const priceVal = await calculateProductPrice(p);
          return {
            ...p,
            _price: priceVal,
          };
        })
      );
      if (!cancelled) {
        setPricedProducts(priced);
        setLoading(false);
      }
    }

    attachPrices();
    return () => {
      cancelled = true;
    };
  }, [productList]);

  return { pricedProducts, loading };
}
