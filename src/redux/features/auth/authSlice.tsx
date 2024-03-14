import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  phone: number;
  bio: string;
  picture: string;
}

interface AuthState {
  isLoggedIn: boolean;
  isChangePasswordModalOpen: boolean;
  name: string;
  user: User;
}

//const name: string | null = JSON.parse(localStorage.getItem('name'));
const name: string | null = "sa";

const initialState: AuthState = {
  isLoggedIn: false,
  isChangePasswordModalOpen: false,
  name: name ? name : "",
  user: {
    name: "",
    email: "",
    phone: 0,
    bio: "",
    picture: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action: PayloadAction<string>) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action: PayloadAction<User>) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.picture = profile.picture;
    },
    SET_CHANGE_PASSWORD_MODAL(state, action: PayloadAction<boolean>) {
      state.isChangePasswordModalOpen = action.payload;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER, SET_CHANGE_PASSWORD_MODAL } =
  authSlice.actions;

export const selectIsLoggedIn = (state: { auth: AuthState }) =>
  state.auth.isLoggedIn;
export const selectisOpenChangePasswordModal = (state: { auth: AuthState }) =>
  state.auth.isChangePasswordModalOpen;
export const selectName = (state: { auth: AuthState }) => state.auth.name;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;
