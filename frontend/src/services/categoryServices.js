import axiosRoot from "../config/axiosConfig";

const fetchCategories = async () => {
    const response = await axiosRoot.get(`/api/Categories`);
    return response.data;
};

const addCategory = async (category) => {
    const response = await axiosRoot.post(`/api/categories`, category);
    return response.data;
};

const deleteCategory = async (categoryID) => {
    const response = await axiosRoot.delete(`/api/categories/${categoryID}`);
    return response.data;
};

const updateCategory = async (categoryID, category) => {
    const response = await axiosRoot.put(
      `/api/categories/${categoryID}`,
      category
    );
    return response.data;
};

export { fetchCategories, addCategory, deleteCategory, updateCategory };
