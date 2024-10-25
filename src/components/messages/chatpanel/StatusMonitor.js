import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useWebSocket } from "../../../WebSocketContext";

const StatusMonitor = () => {
  const { isAdmin, status } = useSelector((state) => state.auth);
  const { socket } = useWebSocket();
  const { selectedUser, room } = useSelector((state) => state.message);

  useEffect(() => {
    if (selectedUser) {
      if (socket.readyState === 1)
        socket.send(
          JSON.stringify({
            room: isAdmin ? selectedUser : room,
            type: isAdmin ? "status" : "user-status",
            data: status,
          })
        );
    }
  }, [isAdmin, selectedUser, status, socket, room]);

  return <></>;
};

export default StatusMonitor;
