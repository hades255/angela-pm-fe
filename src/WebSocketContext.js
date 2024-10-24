import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage, setStatus } from "./redux/messageSlice";
import moment from "moment";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/chat");

    ws.onopen = () => {
      console.log("WebSocket connection established.");
    };

    ws.onmessage = (event) => {
      setMessage(event.data);
      const data = JSON.parse(event.data);
      dispatch(
        addMessage({
          room: "room",
          id: Date.now(),
          text: data.message,
          from: { id: "1", name: "admin", avatar: "user0.png" },
          to: { id: "2", name: "Elon Mask", avatar: "user1.png" },
          attachments: [],
          created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          status: "read",
        })
      );
      dispatch(setStatus(0));
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket, message }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
