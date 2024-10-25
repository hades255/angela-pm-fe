import React, { useCallback, useMemo, useState } from "react";
import ChatMediaModal from "./modal";
import { useSelector } from "react-redux";
import { useAuth } from "../../../contexts/AuthContext";

const ChatMediasPanel = () => {
  const { isAdmin } = useAuth();
  const { attachments, selectedUser } = useSelector((state) => state.message);

  const _attachments = useMemo(() => {
    if (isAdmin) {
      if (selectedUser) {
        return attachments.filter(
          (item) => item.room === selectedUser && item.type === "media"
        );
      }
      return [];
    }
    return (attachments || []).filter((item) => item.type === "media");
  }, [isAdmin, attachments, selectedUser]);

  const [viewAll, setViewAll] = useState(false);

  const handleClickViewAll = useCallback(() => setViewAll(true), []);
  const handleCloseViewAll = useCallback(() => setViewAll(false), []);

  return (
    <>
      <div className="mt-5 flex justify-between">
        <span className="text-lg text-[#2B2929] font-bold">Chat Media</span>
        <span
          className="text-[#47548C] font-[500] cursor-pointer"
          onClick={handleClickViewAll}
        >
          View All
        </span>
      </div>
      <div className="flex flex-wrap -mx-1">
        {_attachments &&
          _attachments.map(
            (item, index) =>
              index < 6 && (
                <div className="p-1" key={item.id}>
                  <img
                    src="/avatars/user7.png"
                    alt="chat media"
                    className="rounded-xl w-full max-w-[75px]"
                  />
                </div>
              )
          )}
        {_attachments && _attachments.length > 6 && (
          <div className="p-1 relative">
            <img
              src="/avatars/user4.png"
              alt="chat media"
              className="rounded-xl w-full max-w-[75px]"
            />
            <div className="absolute top-1 left-1 w-[calc(100%_-_8px)] h-[calc(100%_-_8px)] rounded-xl bg-[#000000A0] flex justify-center items-center text-sm font-bold text-white">
              +{_attachments.length - 6}
            </div>
          </div>
        )}
      </div>
      {viewAll && (
        <ChatMediaModal show={viewAll} onClose={handleCloseViewAll} />
      )}
    </>
  );
};

export default ChatMediasPanel;
