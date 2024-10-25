import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useWebSocket } from "../../../WebSocketContext";

const StatusMonitor = () => {
  const { isAdmin, status } = useSelector((state) => state.auth);
  const { socket } = useWebSocket();
  const { selectedUser, room } = useSelector((state) => state.message);

  useEffect(() => {
    if (selectedUser) {
      console.log({
        room: isAdmin ? selectedUser : room,
        type: isAdmin ? "status" : "user-status",
        data: status,
      });
      if (socket.readyState === 1)
        socket.send(
          JSON.stringify({
            room: isAdmin ? selectedUser : room,
            type: isAdmin ? "status" : "user-status",
            data: status,
          })
        );
    }
  }, [isAdmin, selectedUser, status, socket]);

  return <></>;
};

export default StatusMonitor;
