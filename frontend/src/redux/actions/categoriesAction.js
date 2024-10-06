import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../services/categoryServices";

export const getCategoriesRD = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const _categories = await fetchCategories();
    return _categories;
  }
);

export const addCategoryRD = createAsyncThunk(
  "categories/addnewcategories",
  async (category) => {
    const _category = await addCategory(category);
    return _category;
  }
);

export const deleteCategoryRD = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryID) => {
    await deleteCategory(categoryID);
    return categoryID;
  }
);

export const updateCategoryRD = createAsyncThunk(
  "categories/updateCategory",
  async ({categoryID, category}) => {
    const _updated = await updateCategory(categoryID, category);
    return _updated;
  }
);
