import { useState, useEffect } from "react";
import { fetchItemCategories } from "../services/itemCategories";

const useItemCategories = () => {
  const [itemCategories, setItemCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItemCategories = async () => {
      try {
        const data = await fetchItemCategories();
        setItemCategories(data);
      } catch (err) {
        setError(err);
        console.error("Fail to load item categories: ", err);
      } finally {
        setLoading(false);
      }
    };

    
    loadItemCategories();

  }, []);

  const getItemCategoryById = (itemCategoryID) => {
    try {
      return itemCategories.find((i) => i.ItemCategory_ID === itemCategoryID);
    } catch (err) {
      setError(err);
      console.error("Fail to get item category by ID: ", err);
      return [];
    }
  };

  return {
    loading,
    error,
    itemCategories,
    getItemCategoryById,
  };
};

export default useItemCategories;
