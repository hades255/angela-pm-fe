import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage, setStatus } from "./redux/messageSlice";

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
      dispatch(addMessage(data.data));
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
