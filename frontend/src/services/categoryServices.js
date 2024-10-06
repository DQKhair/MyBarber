import axiosRoot from "../config/axiosConfig";

const fetchCategories = async () => {
  const response = await axiosRoot.get(`/api/Categories`);
  return response.data;
};

const addCategory = async (category) => {
  try {
    const response = await axiosRoot.post(`/api/categories`, category);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

const deleteCategory = async (categoryID) => {
  try {
    const response = await axiosRoot.delete(`/api/categories/${categoryID}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

const updateCategory = async (categoryID, category) => {
  try {
    const response = await axiosRoot.put(
      `/api/categories/${categoryID}`,
      category
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

export { fetchCategories, addCategory, deleteCategory, updateCategory };
