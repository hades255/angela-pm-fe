import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: "2",
    name: "Elon Mask",
    avatar: "user1.png",
  },
  reducers: {
    login: (state, payload) => {
      state.id = payload.payload.id;
      state.name = payload.payload.name;
      state.avatar = payload.payload.avatar;
    },
    logout: (state) => {
      state.id = "";
      state.name = "";
      state.avatar = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
