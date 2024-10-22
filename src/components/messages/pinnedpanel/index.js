import React from "react";
import ChatFilesPanel from "../chatfiles";
import PinnedChatItem from "./PinnedChatItem";
import ChatMediasPanel from "../chatmedia";

const PinnedPanel = () => {
  return (
    <>
      <div className="w-[284px] min-w-[284px] h-full rounded-br-[12px] border border-[#E0E5F2] p-5 flex flex-col gap-[14px] overflow-y-scroll">
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
