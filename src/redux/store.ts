import { configureStore } from "@reduxjs/toolkit";
import mystroReducer from "./mystroSlice";

/**
 * Redux store
 */
export default configureStore({
  reducer:{
    mystro: mystroReducer,
  }
});