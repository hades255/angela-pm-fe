import React from "react";
import ChatFilesPanel from "../chatfiles";
import PinnedChatItem from "./PinnedChatItem";
import ChatMediasPanel from "../chatmedia";

const PinnedPanel = () => {
  return (
    <>
      <div className="border-0 w-0 md:w-[284px] md:min-w-[284px] h-full rounded-br-[12px] md:border border-[#E0E5F2] md:p-5 md:flex md:flex-col gap-[14px] overflow-y-scroll overflow-x-hidden transition-all">
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
