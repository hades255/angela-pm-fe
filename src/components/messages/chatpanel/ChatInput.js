import React from "react";
import EmojiIcon from "../../../assets/icons/input/Emoji";
import AttachmentIcon from "../../../assets/icons/input/Attachment";
import SendIcon from "../../../assets/icons/input/Send";

const ChatInput = () => {
  return (
    <>
      <div className="absolute left-0 bottom-0 w-full h-24 p-5 border-b border-[#CBD5E1] flex items-center gap-5">
        <div className="w-[calc(100%_-_80px)] h-[60px] relative">
          <input
            className="w-full h-full bg-[#EEF1F4] rounded-xl text-lg text-[#34335B] px-14"
            placeholder="Type your message here"
          />
          <div className="absolute top-0 left-4 h-full flex items-center cursor-pointer">
            <EmojiIcon />
          </div>
          <div className="absolute top-0 right-4 h-full flex items-center cursor-pointer">
            <AttachmentIcon />
          </div>
        </div>
        <button className="w-[60px] h-[60px] bg-chat-send-button rounded-xl flex justify-center items-center">
          <SendIcon />
        </button>
      </div>
    </>
  );
};

export default ChatInput;
