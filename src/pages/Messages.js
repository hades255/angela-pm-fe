import React from "react";
import Message from "../components/messages/Message";

const AdminMessages = () => {
  return (
    <div className="h-screen min-h-screen max-h-screen w-screen relative sm:pl-[74px] pt-[74px] flex justify-center">
      <div className="h-full w-full p-10 flex justify-center">
        <div className="h-full w-full max-w-[1024px]">
          <Message />
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
