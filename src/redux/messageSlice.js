import { createSlice } from "@reduxjs/toolkit";

const messages = [
  {
    room: "room",
    id: "1",
    text: `Hi! I'm excited to start out project for "Company Name." Can we discuss the first milestone?`,
    from: { id: "1", name: "admin", avatar: "user0.png" },
    to: { id: "2", name: "Elon Mask", avatar: "user1.png" },
    attachments: [],
    created_at: "2024-10-02 21:14:08",
    updated_at: "2024-10-02 21:14:08",
    status: "read",
  },
  {
    room: "room",
    id: "2",
    text: `Hi! I'm excited to start out project for "Company Name." Can we discuss the first milestone?`,
    from: { id: "2", name: "Elon Mask", avatar: "user1.png" },
    to: { id: "1", name: "admin", avatar: "user0.png" },
    attachments: [],
    created_at: "2024-10-20 21:14:08",
    updated_at: "2024-10-20 21:14:08",
    status: "read",
  },
  {
    room: "room",
    id: "3",
    text: `Hi`,
    from: { id: "1", name: "admin", avatar: "user0.png" },
    to: { id: "2", name: "Elon Mask", avatar: "user1.png" },
    attachments: ["/avatars/user0.png"],
    created_at: "2024-10-21 21:14:08",
    updated_at: "2024-10-21 21:14:08",
    status: "read",
  },
  {
    room: "room",
    id: "4",
    text: `Hi! I'm excited to start out project for "Company Name." Can we discuss the first milestone?`,
    from: { id: "2", name: "Elon Mask", avatar: "user1.png" },
    to: { id: "1", name: "admin", avatar: "user0.png" },
    attachments: [],
    created_at: "2024-10-22 21:14:08",
    updated_at: "2024-10-22 21:14:08",
    status: "read",
  },
  {
    room: "room",
    id: "5",
    text: `Hi! I'm excited to start out project for "Company Name." Can we discuss the first milestone?`,
    from: { id: "1", name: "admin", avatar: "user0.png" },
    to: { id: "2", name: "Elon Mask", avatar: "user1.png" },
    attachments: [],
    created_at: "2024-10-22 21:15:08",
    updated_at: "2024-10-22 21:15:08",
    status: "read",
  },
  {
    room: "room",
    id: "6",
    text: `Hi! I'm excited to start out project for "Company Name." Can we discuss the first milestone?`,
    from: { id: "2", name: "Elon Mask", avatar: "user1.png" },
    to: { id: "1", name: "admin", avatar: "user0.png" },
    attachments: [],
    created_at: "2024-10-22 21:16:08",
    updated_at: "2024-10-22 21:16:08",
    status: "read",
  },
  {
    room: "room",
    id: "7",
    text: `Hi`,
    from: { id: "1", name: "admin", avatar: "user0.png" },
    to: { id: "2", name: "Elon Mask", avatar: "user1.png" },
    attachments: ["/avatars/user0.png"],
    created_at: "2024-10-22 22:14:08",
    updated_at: "2024-10-22 22:14:08",
    status: "read",
  },
];

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [...messages],
  },
  reducers: {
    addMessage: (state, payload) => {
      console.log(payload.payload);
      state.messages.push(payload.payload);
    },
  },
});

export const { addMessage } = messageSlice.actions;
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
