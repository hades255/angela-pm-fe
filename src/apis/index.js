import axios from "axios";
import { SERVER_ADDRESS } from "@constants/config";

export const setMessageStatusAPI = async (id, status = "read") => {
  try {
    const response = await axios.post(SERVER_ADDRESS + "/api/message/status", {
      id,
      status,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const setMessagePinned = async ({ id, room }) => {
  try {
    const response = await axios.post(SERVER_ADDRESS + "/api/message/pin", {
      id,
      room,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
