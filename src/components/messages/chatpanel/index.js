import React from "react";
import ChatInput from "./ChatInput";
import MoreIcon from "../../../assets/icons/More";

const ChatPanel = () => {
  return (
    <>
      <div className="w-full md:w-[calc(100%_-_284px)] h-full rounded-bl-[12px] xl:rounded-bl-none rounded-br-[12px] md:rounded-br-none border border-[#E0E5F2] relative">
        <div className="flex flex-col h-full overflow-y-scroll p-5 gap-6">
          <div className="flex justify-stretch items-center">
            <div className="border-t-2 border-[#34335B10] w-full"></div>
            <div className="text-[#34335BA0] font-[500] text-nowrap mx-4">July 1, 2023</div>
            <div className="border-t-2 border-[#34335B10] w-full"></div>
          </div>
          <ChatItem mine={false} />
          <ChatItem mine={true} />
        </div>
        <ChatInput />
      </div>
    </>
  );
};

export default ChatPanel;

const ChatItem = ({ mine }) => {
  return mine ? (
    <div className="flex justify-end">
      <div className="w-full sm:w-3/4 min-w-[300px] flex flex-col">
        <div className="flex justify-stretch">
          <div className="min-w-8 flex justify-start items-start">
            <div className="cursor-pointer">
              <MoreIcon />
            </div>
          </div>
          <div className="bg-chat-send-button px-8 py-5 rounded-xl rounded-br-none text-white text-sm">
            Hi! I'm excited to start out project for "Company Name." Can we
            discuss the first milestone?
          </div>
          <div className="min-w-12 flex justify-end items-end">
            <img
              src="/avatars/user0.png"
              alt="user avatar"
              className="w-9 h-9 rounded-3xl"
            />
          </div>
        </div>
        <div className="pl-8 text-sm text-[#34335B]">12:34</div>
      </div>
    </div>
  ) : (
    <div className="flex justify-start">
      <div className="w-full sm:w-3/4 min-w-[300px] flex flex-col">
        <div className="flex justify-stretch">
          <div className="min-w-12 flex items-end">
            <img
              src="/avatars/user3.png"
              alt="user avatar"
              className="w-9 h-9 rounded-3xl"
            />
          </div>
          <div className="bg-[#F6F8FD] px-8 py-5 rounded-xl rounded-bl-none text-[#2B3674] text-sm">
            Hi! I'm excited to start out project for "Company Name." Can we
            discuss the first milestone?
          </div>
          <div className="min-w-8 flex justify-end items-start">
            <div className="cursor-pointer">
              <MoreIcon />
            </div>
          </div>
        </div>
        <div className="flex justify-end pr-8 text-sm text-[#34335B]">
          12:34
        </div>
      </div>
    </div>
  );
};
