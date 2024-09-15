import { useState, useEffect } from "react";
import {
  fetchItemCategories,
  getItemCategoryById,
  addItemCategory,
  deleteItemCategory,
  updateItemCategoryInformation,
  updateItemCategoryImage,
} from "../services/itemCategories";

const useItemCategories = () => {
  const [itemCategories, setItemCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorLoad, setErrorLoad] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItemCategories = async () => {
      setLoading(true);
      try {
        const data = await fetchItemCategories();
        setItemCategories(data);
      } catch (err) {
        setErrorLoad(err);
        console.error("Fail to load item categories: ", err);
      } finally {
        setLoading(false);
      }
    };

    loadItemCategories();
  }, []);

  const getItemCategoryByIdHook = async (itemCategoryID) => {
    setError(null);
    setErrorLoad(null);
    try {
      const itemCategory = await getItemCategoryById(itemCategoryID);
      return itemCategory;
    } catch (err) {
      setErrorLoad(err);
      console.error("Fail to get item category by ID: ", err);
      return null;
    }
  };

  const getItemCategoryByIdLocal = (itemCategoryID) => {
    setError(null);
    try {
      return itemCategories.find((i) => i.itemCategory_ID === itemCategoryID);
    } catch (err) {
      setError(err);
      console.error(`Fail to get item category by ID: ${itemCategoryID}`, err);
      return null;
    }
  };

  const addItemCategoryHook = async (itemCategoryFormData) => {
    setError(null);
    try {
      const newItemCategory = await addItemCategory(itemCategoryFormData);
      setItemCategories([...itemCategories, newItemCategory]);
      return newItemCategory;
    } catch (err) {
      setErrorLoad(err);
      console.error("Fail to add new item category from hook ", err);
      return null;
    }
  };

  const deleteItemCategoryHook = async (itemCategoryID) => {
    setError(null);
    try {
      await deleteItemCategory(itemCategoryID);
      setItemCategories(
        itemCategories.filter((i) => i.itemCategory_ID !== itemCategoryID)
      );
      return true;
    } catch (err) {
      setErrorLoad(err);
      console.error(
        `Fail to delete item category by id ${itemCategoryID} from hook `,
        err
      );
      return false;
    }
  };

  const updateItemCategoryInformationHook = async (
    itemCategoryID,
    itemCategory
  ) => {
    setError(null);
    try {
      const updated = await updateItemCategoryInformation(
        itemCategoryID,
        itemCategory
      );
      setItemCategories(
        itemCategories.map((i) =>
          i.itemCategory_ID === itemCategoryID ? updated : i
        )
      );
      return updated;
    } catch (err) {
      setError(err);
      console.error(
        `Fail to update item category by id ${itemCategoryID} from hook`,
        err
      );
      return null;
    }
  };

  const updateItemCategoryImageHook = async (
    itemCategoryID,
    itemCategoryFormData
  ) => {
    setError(null);
    try {
      const updated = await updateItemCategoryImage(
        itemCategoryID,
        itemCategoryFormData
      );
      setItemCategories(
        itemCategories.map((i) =>
          i.itemCategory_ID === itemCategoryID ? updated : i
        )
      );
      return updated;
    } catch (err) {
      setError(err);
      console.error(
        `Fail to update item category by id ${itemCategoryID} from hook`,
        err
      );
      return null;
    }
  };

  return {
    loading,
    errorLoad,
    error,
    itemCategories,
    setError,
    getItemCategoryByIdLocal,
    getItemCategoryByIdHook,
    addItemCategoryHook,
    deleteItemCategoryHook,
    updateItemCategoryInformationHook,
    updateItemCategoryImageHook,
  };
};

export default useItemCategories;
