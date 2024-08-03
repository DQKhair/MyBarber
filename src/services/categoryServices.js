import axios from "axios";
import { API_URL } from "../constants/constants";

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories.json`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories: ", error);
    return [];
  }
};

const addCategory = async (category) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, category);
    return response.data;
  } catch (err) {
    console.error("Fail to add category: ", err);
    return [];
  }
};

const deleteCategory = async (categoryID) => {
  try {
    const response = await axios.delete(`${API_URL}/categories/${categoryID}`);
    return response.data;
  } catch (err) {
    console.err("Fail to delete category: ", err);
    return [];
  }
};

const updateCategory = async (categoryID, category) => {
  try {
    const response = await axios.put(
      `${API_URL}/categories/${categoryID}`,
      category
    );
    return response.data;
  } catch (err) {
    console.error("Fail to update category: ", err);
    return [];
  }
};

export { fetchCategories, addCategory, deleteCategory, updateCategory };
