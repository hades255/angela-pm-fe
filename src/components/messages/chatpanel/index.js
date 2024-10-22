import React from "react";
import ChatInput from "./ChatInput";
import MoreIcon from "../../../assets/icons/More";
import classNames from "classnames";

const ChatPanel = ({ hide }) => {
  return (
    <>
      <div
        className={classNames(
          "w-full md:w-[calc(100%_-_284px)] h-full rounded-bl-[12px] xl:rounded-bl-none rounded-br-[12px] md:rounded-br-none border border-[#E0E5F2] relative transition-all overflow-x-hidden",
          { "w-0 max-w-0 border-0": hide }
        )}
      >
        <div className="flex flex-col h-full overflow-y-scroll p-5 pb-28 gap-6">
          <DayDivider date={"July 1, 2023"} />
          <ChatItem mine={false} />
          <ChatItem mine={true} />
          <DayDivider date={"July 9, 2023"} />
          <ChatItem mine={true} />
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
      <div className="w-full sm:w-3/4 md:min-w-[300px] flex flex-col">
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
              className="w-9 h-9 min-w-9 rounded-3xl"
            />
          </div>
        </div>
        <div className="pl-8 text-sm text-[#34335B90]">12:34</div>
        <div className="flex justify-end mt-2 mr-12 gap-4 flex-wrap">
          <img
            src="/avatars/user6.png"
            width={63}
            height={63}
            alt="attached"
            className="rounded-[10px]"
          />
          <img
            src="/avatars/user7.png"
            width={63}
            height={63}
            alt="attached"
            className="rounded-[10px]"
          />
          <img
            src="/avatars/user4.png"
            width={63}
            height={63}
            alt="attached"
            className="rounded-[10px]"
          />
          <img
            src="/avatars/user5.png"
            width={63}
            height={63}
            alt="attached"
            className="rounded-[10px]"
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-start">
      <div className="w-full sm:w-3/4 md:min-w-[300px] flex flex-col">
        <div className="flex justify-stretch">
          <div className="min-w-12 flex items-end">
            <img
              src="/avatars/user3.png"
              alt="user avatar"
              className="w-9 h-9 min-w-9 rounded-3xl"
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
        <div className="flex justify-end pr-8 text-sm text-[#34335B90]">
          12:34
        </div>
        <div className="flex justify-start mt-2 ml-12 gap-4 flex-wrap">
          <img
            src="/avatars/user6.png"
            width={63}
            height={63}
            alt="attached"
            className="rounded-[10px]"
          />
          <img
            src="/avatars/user7.png"
            width={63}
            height={63}
            alt="attached"
            className="rounded-[10px]"
          />
          <img
            src="/avatars/user4.png"
            width={63}
            height={63}
            alt="attached"
            className="rounded-[10px]"
          />
          <img
            src="/avatars/user5.png"
            width={63}
            height={63}
            alt="attached"
            className="rounded-[10px]"
          />
        </div>
      </div>
    </div>
  );
};

const DayDivider = ({ date }) => {
  return (
    <div className="mt-2 mb-1 flex justify-stretch items-center">
      <div className="border-t-2 border-[#34335B10] w-full"></div>
      <div className="text-[#34335BA0] font-[500] text-nowrap mx-4">{date}</div>
      <div className="border-t-2 border-[#34335B10] w-full"></div>
    </div>
  );
};
