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
  const [errorLoad,setErrorLoad] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
    setLoading(true);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setErrorLoad(err);
        console.error("Fail to load categories: ",err);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  const getCategoryById = (categoryID) => {
  setError(null);
    try {
      const category = categories.find((c) => c.category_ID === categoryID);
      return category;
    } catch (err) {
      setError(err);
      console.error("Fail to get category by ID: ", err);
      return [];
    }
  };

  const addCategoryHook = async (category) => {
  setError(null);
    try {
      const newCategory = await addCategory(category);
      setCategories([...categories, newCategory]);
      return newCategory;
    } catch (err) {
      setError(err);
      console.error("Fail to add category from hook: ", err);
      return null;
    }
  };

  const updateCategoryHook = async (categoryID, category) => {
  setError(null);
    try {
      const updated = await updateCategory(categoryID, category);
      setCategories(
        categories.map((c) => (c.category_ID === categoryID ? updated : c))
      );
      return updated;
    } catch (err) {
      setError(err);
      console.error("Fail to update category from hook: ", err);
      return null;
    }
  };

  const deleteCategoryHook = async (categoryID) => {
  setError(null);
    try {
      await deleteCategory(categoryID);
      setCategories(categories.filter((c) => c.category_ID !== categoryID));
      return true;
    } catch (err) {
      setError(err);
      console.error("Fail to delete category from hook: ", err);
      return false;
    }
  };

  return {
    loading,
    errorLoad,
    error,
    categories,
    setError,
    getCategoryById,
    addCategoryHook,
    updateCategoryHook,
    deleteCategoryHook
  };
};

export default useCategories;
