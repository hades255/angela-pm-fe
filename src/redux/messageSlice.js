import { createSlice } from "@reduxjs/toolkit";
import { setMessageStatusAPI } from "../apis";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    room: "",
    messages: [],
    status: 0, //  0-online  1-idle  2-offline 3-typing
    lastViewed: Date.now(),
    selectedUser: null,
    users: [],
    pinned: [],
    attachments: [],
  },
  reducers: {
    initMessage: (state, payload) => {
      state.room = payload.payload.room;
      state.messages = payload.payload.messages;
      state.selectedUser = payload.payload.select;
      state.users = payload.payload.users;
      state.pinned = payload.payload.pinned;
      state.attachments = payload.payload.attachments;
      if (payload.payload.isAdmin) {
        let _s = {};
        payload.payload.messages.reverse().forEach((item) => {
          if (!_s[item.room]) _s[item.room] = item.text;
        });
        state.users = state.users.map((item) => {
          if (_s[item.room]) {
            item.lastMsg = _s[item.room];
          }
          return item;
        });
      }
    },
    addMessage: (state, payload) => {
      console.log(payload.payload);
      state.messages.push(payload.payload.data);
      if (payload.payload.type === "receive") {
        const room = payload.payload.data.room;
        if (state.selectedUser === room) state.status = 0;
        state.users = state.users.map((item) => ({
          ...item,
          status: item.room === room ? 0 : item.status,
          updated_at:
            item.room === room
              ? payload.payload.data.created_at
              : item.updated_at,
          lastMsg:
            item.room === room ? payload.payload.data.text : item.lastMsg || "",
        }));
      }
    },
    setMessage: (state, payload) => {
      state.messages = payload.payload;
    },
    setStatus: (state, payload) => {
      state.status = Number(payload.payload);
    },
    setUserSelect: (state, payload) => {
      state.selectedUser = payload.payload.room;
    },
    setMessageStatus: (state, payload) => {
      state.messages = state.messages.map((item) => {
        if (item.id === payload.payload.id && item.status === "unread") {
          item.status = "read";
          setMessageStatusAPI(payload.payload.id);
        }
        return item;
      });
    },
    setMessagePin: (state, payload) => {
      let exist = false;
      console.log(payload.payload);
      state.pinned = state.pinned.filter((item) => {
        if (item.id === payload.payload.id) {
          exist = true;
          return false;
        }
        return true;
      });
      console.log(exist);
      if (!exist) state.pinned.push(payload.payload);
    },
    setUserStatus: (state, payload) => {
      const status = Number(payload.payload.data);
      state.users = state.users.map((item) => ({
        ...item,
        status: item.room === payload.payload.room ? status : item.status,
        updated_at:
          item.room === payload.payload.room && (status === 0 || status === 3)
            ? new Date().toISOString()
            : item.updated_at,
      }));
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
  setUserStatus,
  setMessagePin,
} = messageSlice.actions;

export default messageSlice.reducer;

export const getSelectedUser = ({ message }) => {
  if (message.selectedUser) {
    const user = message.users.filter(
      (item) => item.room === message.selectedUser
    )[0];
    return user;
  }
  return null;
};
