import { useState, useEffect } from "react";
// import {
//   fetchCategories,
//   addCategory,
//   deleteCategory,
//   updateCategory,
// } from "../services/categoryServices";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesRD,
  addCategoryRD,
  deleteCategoryRD,
  updateCategoryRD,
} from "../redux/actions/categoriesAction";

const useCategories = () => {
  // const [categories, setCategories] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [errorLoad,setErrorLoad] = useState(null);
  // const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { categoriesRD, loadingRD, errorLoadRD, errorRD } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    // const loadCategories = async () => {
    // setLoading(true);
    //   try {
    //     const data = await fetchCategories();
    //     setCategories(data);
    //   } catch (err) {
    //     setErrorLoad(err);
    //     console.error("Fail to load categories: ",err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // loadCategories();
    const loadCategories = async () => {
      await dispatch(getCategoriesRD());
    };
    loadCategories();
  }, [dispatch]);

  const getCategoryById = (categoryID) => {
    // setError(null);
    try {
      const category = categoriesRD.find((c) => c.category_ID === categoryID);
      return category;
    } catch (err) {
      // setError(err);
      console.error("Fail to get category by ID: ", err);
      return [];
    }
  };

  const addCategoryHook = async (category) => {
    // setError(null);
    // try {
    //   const newCategory = await addCategory(category);
    //   setCategories([...categories, newCategory]);
    //   return newCategory;
    // } catch (err) {
    //   setError(err);
    //   console.error("Fail to add category from hook: ", err);
    //   return null;
    // }
    const result = dispatch(await addCategoryRD(category)).unwrap();
    return result;
  };

  const updateCategoryHook = async (categoryID, category) => {
    // setError(null);
    // try {
    //   const updated = await updateCategory(categoryID, category);
    //   setCategories(
    //     categories.map((c) => (c.category_ID === categoryID ? updated : c))
    //   );
    //   return updated;
    // } catch (err) {
    //   setError(err);
    //   console.error("Fail to update category from hook: ", err);
    //   return null;
    // }

    const result = await dispatch(await updateCategoryRD({ categoryID, category })).unwrap();
    return result;
  };

  const deleteCategoryHook = async (categoryID) => {
    // setError(null);
    // try {
    //   await deleteCategory(categoryID);
    //   setCategories(categories.filter((c) => c.category_ID !== categoryID));
    //   return true;
    // } catch (err) {
    //   setError(err);
    //   console.error("Fail to delete category from hook: ", err);
    //   return false;
    // }
    const result = await dispatch(await deleteCategoryRD(categoryID)).unwrap();
    return result;
  };

  return {
    loadingRD,
    errorLoadRD,
    errorRD,
    categoriesRD,
    getCategoryById,
    addCategoryHook,
    updateCategoryHook,
    deleteCategoryHook,
  };
};

export default useCategories;
