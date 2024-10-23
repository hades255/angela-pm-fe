import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userId: "",
    name: "",
    email: "",
    username: "",
    avatar: "",
    confirmemail: "",
    point: 0,
    token: 0,
  },
  reducers: {
    login: (state, payload) => {
      state.userId = payload.payload.userId;
      state.name = payload.payload.name;
      state.email = payload.payload.email;
      state.username = payload.payload.username;
      state.avatar = payload.payload.avatar;
      state.point = payload.payload.point;
      state.token = payload.payload.token;
      state.confirmemail = "";
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.confirmemail = "";
    },
    updateUser: (state, payload) => {
      payload.payload.forEach((item) => {
        state[item.key] = item.value;
      });
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export default authSlice.reducer;
