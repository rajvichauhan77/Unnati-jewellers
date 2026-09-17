import { useState, useEffect } from "react";
import { fetchAllCategoriesAndSubcategories } from "../services/categoryService";
import { categoryNav } from "../data/navigationData";

/**
 * Hook to fetch and manage category data.
 * Falls back to static categoryNav if the API fails or is loading.
 */
export const useCategories = () => {
  const [categories, setCategories] = useState(categoryNav);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const loadCategories = async () => {
      try {
        const data = await fetchAllCategoriesAndSubcategories();
        if (active) {
          if (data && data.length > 0) {
            // Keep "All Jewellery" as the first static item if needed, 
            // or if the API returns categories, we merge/use them.
            // Let's create a premium dynamic structure
            const allSubcategories = [];
            data.forEach((cat) => {
              cat.subcategories?.forEach((sub) => {
                if (!allSubcategories.some((s) => s.label === sub.label)) {
                  allSubcategories.push(sub);
                }
              });
            });

            const allJewelleryItem = { 
              id: "all-jewellery",
              label: "All Jewellery",
              icon: "necklace",
              path: "/collections/products",
              subcategories: allSubcategories,
            };

            setCategories([allJewelleryItem, ...data]);
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

    loadCategories();

    return () => {
      active = false;
    };
  }, []);

  return { categories, loading, error };
};
