import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import itemReducer from "./features/item/itemSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import filterReducer from "./features/entertainment/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
    sidebar: sidebarReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
