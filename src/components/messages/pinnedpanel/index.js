import React, { useMemo } from "react";
import ChatFilesPanel from "../chatfiles";
import PinnedChatItem from "./PinnedChatItem";
import ChatMediasPanel from "../chatmedia";
import classNames from "classnames";
import { useAuth } from "../../../contexts/AuthContext";
import { useSelector } from "react-redux";

const PinnedPanel = ({ show }) => {
  const { isAdmin } = useAuth();
  const { pinned, selectedUser } = useSelector((state) => state.message);
  console.log(pinned);

  const _pinned = useMemo(() => {
    if (isAdmin) {
      if (selectedUser) {
        return pinned.filter((item) => item.room === selectedUser);
      }
      return [];
    }
    return pinned;
  }, [isAdmin, pinned, selectedUser]);

  return (
    <>
      <div
        className={classNames(
          "border-0 w-0 xl:w-[284px] xl:min-w-[284px] h-full rounded-br-[12px] xl:border border-[#E0E5F2] xl:p-5 xl:flex xl:flex-col gap-[14px] overflow-y-scroll overflow-x-hidden transition-all",
          {
            "w-full !border bg-white p-5 flex flex-col": show,
          }
        )}
      >
        {_pinned && (
          <>
            <div className="text-lg text-[#2B2929] font-bold">Pinned Chats</div>
            <div className="w-full h-[320px] min-h-[320px] overflow-y-scroll flex flex-col gap-[14px]">
              {_pinned.map((item) => (
                <PinnedChatItem key={item.id} message={item} />
              ))}
            </div>
          </>
        )}
        <ChatMediasPanel />
        <ChatFilesPanel />
      </div>
    </>
  );
};

export default PinnedPanel;
