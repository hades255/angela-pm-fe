import React from "react";
import ChatFilesPanel from "../chatfiles";
import PinnedChatItem from "./PinnedChatItem";
import ChatMediasPanel from "../chatmedia";
import classNames from "classnames";

const PinnedPanel = ({ show }) => {
  return (
    <>
      <div
        className={classNames(
          "border-0 w-0 md:w-[284px] md:min-w-[284px] h-full rounded-br-[12px] md:border border-[#E0E5F2] md:p-5 md:flex md:flex-col gap-[14px] overflow-y-scroll overflow-x-hidden transition-all",
          {
            "w-full !border bg-white p-5 flex flex-col": show,
          }
        )}
      >
        <div className="text-lg text-[#2B2929] font-bold">Pinned Chats</div>
        <PinnedChatItem />
        <PinnedChatItem />
        <PinnedChatItem />
        <ChatMediasPanel />
        <ChatFilesPanel />
      </div>
    </>
  );
};

export default PinnedPanel;
