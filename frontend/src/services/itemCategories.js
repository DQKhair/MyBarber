import axios from "axios";
import { API_URL } from "../constants/constants";

const fetchItemCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/ItemCategories.json`);
    return response.data;
  } catch (err) {
    console.error("Fail to fetch item categories: ", err);
    return [];
  }
};

const addItemCategory = async (category) => {
  try {
    const response = await axios.post(`${API_URL}/itemcategories`, category);
    return response.data;
  } catch (err) {
    console.error("Fail to add item category: ", err);
    return [];
  }
};

const deleteItemCategory = async (itemCategoryID) => {
  try {
    const response = await axios.delete(
      `${API_URL}/itemcategories/${itemCategoryID}`
    );
    return response.data;
  } catch (err) {
    console.error("Fail to delete item category: ", err);
    return [];
  }
};

const updateItemCategory = async (categoryID, category) => {
  try {
    const response = await axios.put(
      `${API_URL}/itemcategories/${categoryID}`,
      category
    );
    return response.data;
  } catch (err) {
    console.error("Fail to update item category");
    return [];
  }
};

export {
  fetchItemCategories,
  addItemCategory,
  deleteItemCategory,
  updateItemCategory,
};
