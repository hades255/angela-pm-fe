import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useWebSocket } from "../WebSocketContext";
import { initMessage } from "../redux/messageSlice";
import axios from "axios";

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
        const response = await axios.post("http://http://45.61.141.137:5000/api/login", {
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
        if (response.data.user.id === response.data.admin.id) {
          dispatch(
            initMessage({
              room: response.data.user.room,
              messages: [],
              select: null,
              users: response.data.users,
            })
          );
        } else {
          dispatch(
            initMessage({
              room: response.data.user.room,
              messages: response.data.messages,
              select: response.data.admin,
              users: [],
            })
          );
        }
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
