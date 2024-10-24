import { createSlice } from "@reduxjs/toolkit";
import { setMessageStatusAPI } from "../apis";

const messageSlice = createSlice({
  name: "message",
  room: "",
  initialState: {
    messages: [],
    status: 0, //  0-online  1-idle  2-offline 3-typing
    lastViewed: Date.now(),
    selectedUser: null,
    users: [],
  },
  reducers: {
    initMessage: (state, payload) => {
      state.room = payload.payload.room;
      state.messages = payload.payload.messages;
      state.selectedUser = payload.payload.select;
      state.users = payload.payload.users;
    },
    addMessage: (state, payload) => {
      console.log(payload.payload);
      state.messages.push(payload.payload);
    },
    setMessage: (state, payload) => {
      state.messages = payload.payload;
    },
    setStatus: (state, payload) => {
      state.status = payload.payload;
    },
    setUserSelect: (state, payload) => {
      state.selectedUser = payload.payload;
    },
    setMessageStatus: (state, payload) => {
      state.messages = state.messages.map((item) => ({
        ...item,
        status: item.id === payload.payload.id ? "read" : item.status,
      }));
      setMessageStatusAPI(payload.payload.id);
    },
  },
});

export const {
  addMessage,
  setMessage,
  setStatus,
  initMessage,
  setUserSelect,
  setMessageStatus,
} = messageSlice.actions;
export default messageSlice.reducer;

const MESSAGE = {
  room: "room",
  id: "1",
  text: `Hi! I'm excited to start out project for "Company Name." Can we discuss the first milestone?`,
  from: { id: "1", name: "admin", avatar: "user0.png" },
  to: { id: "2", name: "Elon Mask", avatar: "user1.png" },
  attachments: [],
  created_at: "2024-10-02 21:14:08",
  updated_at: "2024-10-02 21:14:08",
  status: "read",
};
