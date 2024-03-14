import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  isSidebarOpen: boolean;
}

const initialState: SidebarState = {
  isSidebarOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    SET_SIDEBAR(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { SET_SIDEBAR } = sidebarSlice.actions;

export const selectIsSidebarOpen = (state: { sidebar: SidebarState }) =>
  state.sidebar.isSidebarOpen;

export default sidebarSlice.reducer;
