import { useState, useEffect } from "react";
import {
  fetchCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../services/categoryServices";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(err);
        console.error("Fail to load categories: ",err);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  const getCategoryById = (categoryID) => {
    try {
      const category = categories.find((c) => c.Category_ID === categoryID);
      return category;
    } catch (err) {
      setError(err);
      console.error("Fail to get category by ID: ", err);
      return [];
    }
  };

  const addCategoryHook = async (category) => {
    try {
      const newCategory = await addCategory(category);
      setCategories([...categories, newCategory]);
    } catch (err) {
      setError(err);
      console.error("Fail to add category from hook: ", err);
    }
  };

  const updateCategoryHook = async (categoryID, category) => {
    try {
      const updated = await updateCategory(categoryID, category);
      setCategories(
        categories.map((c) => (c.Category_ID === categoryID ? updated : c))
      );
    } catch (err) {
      setError(err);
      console.error("Fail to update category from hook: ", err);
    }
  };

  const deleteCategoryHook = async (categoryID) => {
    try {
      await deleteCategory(categoryID);
      setCategories(categories.filter((c) => c.Category_ID !== categoryID));
    } catch (err) {
      setError(err);
      console.error("Fail to delete category from hook: ", err);
    }
  };

  return {
    loading,
    error,
    categories,
    getCategoryById,
    addCategoryHook,
    updateCategoryHook,
    deleteCategoryHook
  };
};

export default useCategories;
