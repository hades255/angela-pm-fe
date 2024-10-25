import React, { useCallback, useMemo, useState } from "react";
import Mp4Icon from "../../../assets/icons/media/Mp4";
import DocumentIcon from "../../../assets/icons/media/Document";
import ChatFilesModal from "./modal";
import { useAuth } from "../../../contexts/AuthContext";
import { useSelector } from "react-redux";
import moment from "moment";

const ChatFilesPanel = () => {
  const { isAdmin } = useAuth();
  const { attachments, selectedUser } = useSelector((state) => state.message);

  const _attachments = useMemo(() => {
    if (isAdmin) {
      if (selectedUser) {
        return attachments.filter(
          (item) => item.room === selectedUser && item.type === "file"
        );
      }
      return [];
    }
    return (attachments || []).filter((item) => item.type === "file");
  }, [isAdmin, attachments, selectedUser]);

  const [viewAll, setViewAll] = useState(false);

  const handleClickViewAll = useCallback(() => setViewAll(true), []);
  const handleCloseViewAll = useCallback(() => setViewAll(false), []);

  return (
    <>
      <div className="mt-5 flex justify-between">
        <span className="text-lg text-[#2B2929] font-bold">Chat Files</span>
        <span
          className="text-[#47548C] font-[500] cursor-pointer"
          onClick={handleClickViewAll}
        >
          View All
        </span>
      </div>
      <div>
        {_attachments &&
          _attachments.map(
            (item, index) =>
              index < 3 && (
                <ChatFileItem
                  key={item.id}
                  type={"mp4"}
                  title={"File Name.mp4"}
                  size={"480KB"}
                  createdAt={moment(item.created_at).format("D MMMM YYYY")}
                />
              )
          )}
      </div>
      {viewAll && (
        <ChatFilesModal show={viewAll} onClose={handleCloseViewAll} />
      )}
    </>
  );
};

export default ChatFilesPanel;

const ChatFileItem = ({ type, title, size, createdAt }) => {
  return (
    <div className="h-[64px] flex items-center px-3 gap-3">
      <div className="w-12 h-12 rounded-[24px] bg-[#F1F5F9] flex justify-center items-center">
        {type === "mp4" && <Mp4Icon />}
        {type === "doc" && <DocumentIcon />}
      </div>
      <div className="flex flex-col">
        <div className="text-sm text-[#34335B] font-bold">{title}</div>
        <div className="flex">
          <span className="text-xs text-[#34335B] min-w-14">{size}</span>
          <span className="text-xs text-[#34335B] ">{createdAt}</span>
        </div>
      </div>
    </div>
  );
};
