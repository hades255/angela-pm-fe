import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: "2",
    name: "Elon Mask",
    avatar: "user1.png",
    isAuthenticated: false,
    isAdmin: false,
    admin: null,
    status: 0,
  },
  reducers: {
    login: (state, payload) => {
      state.id = payload.payload.user.id;
      state.name = payload.payload.user.name;
      state.avatar = payload.payload.user.avatar;
      state.isAuthenticated = true;
      state.admin = payload.payload.admin;
      if (payload.payload.user.id === payload.payload.admin.id) {
        state.isAdmin = true;
      } else state.isAdmin = false;
    },
    logout: (state) => {
      state.id = "";
      state.name = "";
      state.avatar = "";
      state.isAuthenticated = false;
    },
    setStatus: (state, payload) => {
      state.status = Number(payload.payload);
    },
  },
});

export const { login, logout, setStatus } = authSlice.actions;
export default authSlice.reducer;
