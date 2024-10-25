import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addMessage,
  setUserStatus,
  setStatus,
  setMessagePin,
} from "./redux/messageSlice";

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
      console.log(data);
      if (data.type === "message") {
        dispatch(
          addMessage({ room: data.room, data: data.data, type: "receive" })
        );
        dispatch(setStatus(0));
      }
      if (data.type === "status") dispatch(setStatus(Number(data.data || 0)));
      if (data.type === "user-status") dispatch(setUserStatus(data));
      if (data.type === "pin") dispatch(setMessagePin(data.data));
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [dispatch]);

  return (
    <WebSocketContext.Provider value={{ socket, message }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
