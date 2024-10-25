import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useWebSocket } from "../WebSocketContext";
import { initMessage } from "../redux/messageSlice";
import axios from "axios";
import { SERVER_ADDRESS } from "../constants/config";

const Signin = () => {
  const dispatch = useDispatch();
  const { socket } = useWebSocket();
  const [username, setUsername] = useState("admin");

  const handleInputChange = useCallback(({ target: { value } }) => {
    setUsername(value);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(SERVER_ADDRESS + "/api/login", {
          name: username,
        });
        console.log(response.data);
        dispatch(
          login({ user: response.data.user, admin: response.data.admin })
        );
        socket.send(
          JSON.stringify({
            room: response.data.user.room,
            type: "login",
            data: response.data.user.id,
          })
        );
        const isAdmin = response.data.user.id === response.data.admin.id;
        dispatch(
          initMessage({
            isAdmin,
            room: response.data.user.room,
            messages: response.data.messages,
            pinned: response.data.pinned,
            attachments: response.data.attachments,
            select: isAdmin ? null : response.data.admin.room,
            users: isAdmin ? response.data.users : [response.data.admin],
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    [username, dispatch, socket]
  );

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="max-w-[360px] w-full p-8 rounded-xl bg-[#EEF1F4] flex flex-col gap-2">
          <input
            className="w-full rounded-lg px-8 py-2"
            value={username}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="border border-white px-4 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
