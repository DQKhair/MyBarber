import axiosRoot from "../config/axiosConfig";

const fetchItemCategories = async () => {
  const response = await axiosRoot.get(`/api/ItemCategories`);
  return response.data;
};

const getItemCategoryById = async (itemCategoryID) => {
  const response = await axiosRoot.get(`/api/itemCategories/${itemCategoryID}`);
  return response.data;
};

const addItemCategory = async (itemCategoryFormData) => {
  const response = await axiosRoot.post(
    `/api/itemCategories`,
    itemCategoryFormData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const deleteItemCategory = async (itemCategoryID) => {
  const response = await axiosRoot.delete(
    `/api/itemCategories/${itemCategoryID}`
  );
  return response.data;
};

const updateItemCategoryInformation = async (itemCategoryID, itemCategory) => {
  const response = await axiosRoot.put(
    `/api/itemCategories/update_information/${itemCategoryID}`,
    itemCategory
  );
  return response.data;
};

const updateItemCategoryImage = async (
  itemCategoryID,
  itemCategoryFormData
) => {
  const response = await axiosRoot.put(
    `/api/itemCategories/update_Image/${itemCategoryID}`,
    itemCategoryFormData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export {
  fetchItemCategories,
  getItemCategoryById,
  addItemCategory,
  deleteItemCategory,
  updateItemCategoryInformation,
  updateItemCategoryImage,
};
