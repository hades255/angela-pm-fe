import React from "react";
import UserBoard from "../components/messages/UserBoard";
import PinnedPanel from "../components/messages/pinnedpanel";
import ChatPanel from "../components/messages/chatpanel";

const Messages = () => {
  return (
    <div className="h-screen min-h-screen max-h-screen w-screen min-w-screen max-w-screen relative pl-[74px] pt-[74px] flex justify-center">
      <div className="container h-full flex flex-col px-10">
        <div className="my-4 text-[24px] font-bold text-[#1D1C1C]">
          Messages
        </div>
        <div className="w-full h-[calc(100vh_-_172px)] flex">
          {true && <UserBoard />}
          <div className="flex-grow h-full flex flex-col">
            <div className="w-full h-[68px] rounded-tr-[12px] border border-[#E0E5F2] flex items-center px-[18px]">
              <div className="flex items-center gap-3">
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
                  <div className="text-[#2D396B] font-bold">
                    User Contact Name
                  </div>
                  <div className="text-sm text-[#34335B]">
                    Active 28 min ago
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[calc(100%_-_68px)] flex">
              <ChatPanel />
              <PinnedPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
