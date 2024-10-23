import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import toastSlice from "./toastSlice";
import notificationSlice from "./notificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastSlice,
    notification: notificationSlice,
  },
});

export default store;
