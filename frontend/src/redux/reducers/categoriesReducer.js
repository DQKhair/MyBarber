import { createSlice } from "@reduxjs/toolkit";
import {
  getCategoriesRD,
  addCategoryRD,
  deleteCategoryRD,
  updateCategoryRD,
} from "../actions/categoriesAction";

const initialCategory = {
  categoriesRD: [],
  loadingRD: false,
  errorLoadRD: null,
  errorRD: null,
};

const categoriesSlice = createSlice({
  name: "categoriesRD",
  initialState: initialCategory,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesRD.pending, (state) => {
        state.loadingRD = true;
        state.errorLoadRD = null;
      })
      .addCase(getCategoriesRD.fulfilled, (state, action) => {
        state.loadingRD = false;
        state.categoriesRD = action.payload;
      })
      .addCase(getCategoriesRD.rejected, (state, action) => {
        state.loadingRD = false;
        state.errorLoadRD = action.errorLoadRD;
      })

      //add
      .addCase(addCategoryRD.pending, (state) => {
        state.loadingRD = true;
        state.errorRD = null;
      })
      .addCase(addCategoryRD.fulfilled, (state, action) => {
        state.loadingRD = false;
        state.categoriesRD.push(action.payload);
      })
      .addCase(addCategoryRD.rejected, (state, action) => {
        state.loadingRD = false;
        state.errorRD = action.error.message || (action.payload?.message || "An error occurred");
      })

      //delete
      .addCase(deleteCategoryRD.pending, (state) => {
        state.loadingRD = true;
        state.errorRD = null;
      })
      .addCase(deleteCategoryRD.fulfilled, (state, action) => {
        state.loadingRD = false;
        state.categoriesRD = state.categoriesRD.filter(
          (c) => c.category_ID !== action.payload
        );
      })
      .addCase(deleteCategoryRD.rejected, (state, action) => {
        state.loadingRD = false;
        state.errorRD = action.error.message || (action.payload?.message || "An error occurred");
      })

      //update
      .addCase(updateCategoryRD.pending, (state) => {
        state.loadingRD = true;
        state.errorRD = null;
      })
      .addCase(updateCategoryRD.fulfilled, (state, action) => {
        state.loadingRD = false;
        state.categoriesRD = state.categoriesRD.map((c) =>
          c.category_ID === action.payload.category_ID ? action.payload : c
        );
      })
      .addCase(updateCategoryRD.rejected, (state, action) => {
        state.loadingRD = false;
        state.errorRD = action.error.message || (action.payload?.message || "An error occurred");
      });
  },
});

// export const { addCategoryRD, deleteCategoryRD, updateCategoryRD } =
//   categoriesSlice.actions;
export default categoriesSlice.reducer;
