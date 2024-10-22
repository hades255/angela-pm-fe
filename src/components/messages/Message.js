import React from "react";
import ChatPanel from "./chatpanel";
import PinnedPanel from "./pinnedpanel";
import LeftVectorIcon from "../../assets/icons/vector/Left";
import RightVectorIcon from "../../assets/icons/vector/Right";

const Message = () => {
  return (
    <div className="flex-grow h-full flex flex-col">
      <div className="w-full h-[68px] rounded-tl-[12px] xl:rounded-tl-none rounded-tr-[12px] border border-[#E0E5F2] flex items-center justify-between px-[18px]">
        <div className="flex items-center gap-3">
          <div className="cursor-pointer px-1 xl:hidden">
            <LeftVectorIcon width={12} height={18} />
          </div>
          <div className="relative">
            <img
              src="/avatars/user5.png"
              alt="user 5"
              width={40}
              height={40}
              className="rounded-[58px]"
            />
            <span className="absolute bottom-[2px] right-[2px] w-2 h-2 border rounded-lg bg-green-500"></span>
          </div>
          <div className="flex flex-col">
            <div className="text-[#2D396B] font-bold">User Contact Name</div>
            <div className="text-sm text-[#34335B]">Active 28 min ago</div>
          </div>
        </div>
        <div className="cursor-pointer px-1 lg:hidden">
          <RightVectorIcon width={12} height={18} />
        </div>
      </div>
      <div className="w-full h-[calc(100%_-_68px)] flex">
        <ChatPanel />
        <PinnedPanel />
      </div>
    </div>
  );
};

export default Message;
