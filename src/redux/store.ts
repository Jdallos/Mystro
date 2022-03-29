import { configureStore } from "@reduxjs/toolkit";
import mystroReducer from "./mystroSlice";

export default configureStore({
  reducer:{
    mystro: mystroReducer,
  }
});