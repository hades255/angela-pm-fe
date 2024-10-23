import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: "2",
    name: "Elon Mask",
    avatar: "user1.png",
    isAuthenticated: false,
  },
  reducers: {
    login: (state, payload) => {
      state.id = payload.payload.id;
      state.name = payload.payload.name;
      state.avatar = payload.payload.avatar;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = "";
      state.name = "";
      state.avatar = "";
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
