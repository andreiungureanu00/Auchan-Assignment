import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/auth-slice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
