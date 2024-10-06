import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import categoriesReducer from "./reducers/categoriesReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
  },
});

export default store;
