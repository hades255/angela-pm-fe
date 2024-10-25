import React, { useCallback, useMemo } from "react";
import PinIcon from "../../../assets/icons/Pin";
import MoreIcon from "../../../assets/icons/More";
import moment from "moment";
import { useAuth } from "../../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedUser, setMessagePin } from "../../../redux/messageSlice";
import { useWebSocket } from "../../../WebSocketContext";

const PinnedChatItem = ({ message }) => {
  const { text, from, created_at } = message;

  const { id } = useAuth();
  const dispatch = useDispatch();
  const { socket } = useWebSocket();
  const selectedUser = useSelector(getSelectedUser);

  const username = useMemo(() => {
    if (id.toString() === from.toString()) return "You";
    if (selectedUser) return selectedUser.name;
  }, [id, selectedUser, from]);

  const handlePin = useCallback(() => {
    dispatch(setMessagePin(message));
    socket.send(
      JSON.stringify({
        room: message.room,
        type: "pin",
        data: message,
      })
    );
  }, [message, dispatch, socket]);

  return (
    <div className="flex flex-col rounded bg-[#F4F6F8] p-2 gap-1">
      <div className="flex justify-between items-center">
        <div className="flex w-9 h-9 justify-center items-center">
          <PinIcon />
        </div>
        <div className="flex items-center gap-[14px]">
          <span className="text-xs text-[#919090]">
            {moment(created_at).format("M/D/YY HH:mm")}
          </span>
          <div className="cursor-pointer" onClick={handlePin}>
            <MoreIcon width={18} height={18} color="#2B2929" />
          </div>
        </div>
      </div>
      <div className="text-sm text-[#2D396B] font-[500]">{username}</div>
      <div className="text-xs text-[#2B2929] font-[500]">
        {text.length > 100 ? text.substring(0, 100) + "..." : text}
      </div>
    </div>
  );
};

export default PinnedChatItem;
