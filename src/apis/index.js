import axios from "axios";

export const setMessageStatusAPI = async (id, status = "read") => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/message/status",
      {
        id,
        status,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
