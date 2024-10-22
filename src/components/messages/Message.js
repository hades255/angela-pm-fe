import React, { useCallback, useEffect, useState } from "react";
import ChatPanel from "./chatpanel";
import PinnedPanel from "./pinnedpanel";
import LeftVectorIcon from "../../assets/icons/vector/Left";
import RightVectorIcon from "../../assets/icons/vector/Right";
import classNames from "classnames";

const Message = ({ setShowUsersPanel, hide }) => {
  const [showPinnedPanel, setShowPinnedPanel] = useState(false);

  const handleClickPinnedPanelView = useCallback(
    () => setShowPinnedPanel(!showPinnedPanel),
    [showPinnedPanel]
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setShowPinnedPanel(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={classNames("flex-grow h-full w-full flex flex-col", {
        "w-[calc(100vw_-_508px)] overflow-hidden border rounded-[12px]": hide,
      })}
    >
      <div className="w-full h-[68px] rounded-tl-[12px] xl:rounded-tl-none rounded-tr-[12px] border border-[#E0E5F2] flex items-center justify-between px-[18px]">
        <div className="flex items-center gap-3">
          <div
            className="cursor-pointer px-2 xl:hidden"
            onClick={setShowUsersPanel}
          >
            {hide ? (
              <RightVectorIcon width={12} height={18} />
            ) : (
              <LeftVectorIcon width={12} height={18} />
            )}
          </div>
          <div className="relative">
            <img
              src="/avatars/user5.png"
              alt="user 5"
              width={40}
              height={40}
              className="rounded-[58px] min-w-10 min-h-10 max-w-10 max-h-10"
            />
            <span className="absolute bottom-[2px] right-[2px] w-2 h-2 border rounded-lg bg-green-500"></span>
          </div>
          <div className="flex flex-col">
            <div className="text-[#2D396B] font-bold text-nowrap">
              User Contact Name
            </div>
            <div className="text-sm text-[#34335B] text-nowrap">
              Active 28 min ago
            </div>
          </div>
        </div>
        <div
          className="cursor-pointer px-2 md:hidden"
          onClick={handleClickPinnedPanelView}
        >
          {showPinnedPanel ? (
            <LeftVectorIcon width={12} height={18} />
          ) : (
            <RightVectorIcon width={12} height={18} />
          )}
        </div>
      </div>
      <div className="w-full h-[calc(100%_-_68px)] flex">
        <ChatPanel hide={showPinnedPanel} />
        <PinnedPanel show={showPinnedPanel} />
      </div>
    </div>
  );
};

export default Message;
