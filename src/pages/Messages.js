import React, { useCallback, useEffect, useState } from "react";
import UserBoard from "../components/messages/UserBoard";
import Message from "../components/messages/Message";

const Messages = () => {
  const [showUsersPanel, setShowUsersPanel] = useState(false);

  const handleClickUsersPanelView = useCallback(
    () => setShowUsersPanel(!showUsersPanel),
    [showUsersPanel]
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) setShowUsersPanel(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen min-h-screen max-h-screen w-screen relative sm:pl-[74px] pt-[74px] flex justify-center">
      <div className="h-full w-full flex flex-col px-10">
        <div className="my-4 text-[24px] font-bold text-[#1D1C1C]">
          Messages
        </div>
        <div className="w-full h-[calc(100vh_-_172px)] flex">
          <UserBoard show={showUsersPanel} />
          <Message
            hide={showUsersPanel}
            setShowUsersPanel={handleClickUsersPanelView}
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;
