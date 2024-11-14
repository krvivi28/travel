import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth.slice";
import fileUploadReducer from "./slices/fileUpload.slice";
import userReducer from "./slices/user.slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fileUpload: fileUploadReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
