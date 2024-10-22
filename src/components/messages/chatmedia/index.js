import React from "react";

const ChatMediasPanel = () => {
  return (
    <>
      <div className="mt-5 flex justify-between">
        <span className="text-lg text-[#2B2929] font-bold">Chat Media</span>
        <span className="text-[#47548C] font-[500]">View All</span>
      </div>
      <div className="flex flex-wrap -mx-1">
        <div className="w-1/3 p-1">
          <img
            src="/avatars/user7.png"
            alt="chat media"
            className="rounded-xl w-full"
          />
        </div>
        <div className="w-1/3 p-1">
          <img
            src="/avatars/user6.png"
            alt="chat media"
            className="rounded-xl w-full"
          />
        </div>
        <div className="w-1/3 p-1">
          <img
            src="/avatars/user5.png"
            alt="chat media"
            className="rounded-xl w-full"
          />
        </div>
        <div className="w-1/3 p-1">
          <img
            src="/avatars/user6.png"
            alt="chat media"
            className="rounded-xl w-full"
          />
        </div>
        <div className="w-1/3 p-1">
          <img
            src="/avatars/user5.png"
            alt="chat media"
            className="rounded-xl w-full"
          />
        </div>
        <div className="w-1/3 p-1 relative">
          <img
            src="/avatars/user4.png"
            alt="chat media"
            className="rounded-xl w-full"
          />
          <div className="absolute top-1 left-1 w-[calc(100%_-_8px)] h-[calc(100%_-_8px)] rounded-xl bg-[#000000A0] flex justify-center items-center text-sm font-bold text-white">
            +30
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatMediasPanel;
