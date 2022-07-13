import { configureStore } from "@reduxjs/toolkit";
import mystroReducer from "./mystroSlice";
import sortReducer from "./sortingSlice";

/**
 * Redux store
 */
export default configureStore({
  reducer:{
    mystro: mystroReducer,
    sort: sortReducer,
  }
});