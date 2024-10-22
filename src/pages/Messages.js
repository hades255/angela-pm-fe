import React from "react";
import UserBoard from "../components/messages/UserBoard";
import Message from "../components/messages/Message";

const Messages = () => {
  return (
    <div className="h-screen min-h-screen max-h-screen w-screen min-w-screen max-w-screen relative sm:pl-[74px] pt-[74px] flex justify-center">
      <div className="h-full flex flex-col px-10">
        <div className="my-4 text-[24px] font-bold text-[#1D1C1C]">
          Messages
        </div>
        <div className="w-full h-[calc(100vh_-_172px)] flex">
          <UserBoard />
          <Message />
        </div>
      </div>
    </div>
  );
};

export default Messages;
