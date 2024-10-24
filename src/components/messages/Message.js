import React, { useCallback, useEffect, useState } from "react";
import ChatPanel from "./chatpanel";
import PinnedPanel from "./pinnedpanel";
import LeftVectorIcon from "../../assets/icons/vector/Left";
import RightVectorIcon from "../../assets/icons/vector/Right";
import { useSelector } from "react-redux";
import classNames from "classnames";
import moment from "moment";
import AnimTypingIcon from "../../assets/icons/loader/AnimTyping";

const Message = () => {
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
    <div className="h-full w-full flex flex-col">
      <div className="w-full h-[68px] rounded-tl-[12px] rounded-tr-[12px] border border-[#E0E5F2] flex items-center justify-between px-[18px]">
        <UserHeadItem />
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

const UserHeadItem = () => {
  const { status, lastViewed } = useSelector((state) => state.message);
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <img
          src="/avatars/user0.png"
          alt="user 0"
          width={40}
          height={40}
          className="rounded-[58px] min-w-10 min-h-10 max-w-10 max-h-10"
        />
        <span
          className={classNames(
            "absolute bottom-[2px] right-[2px] w-2 h-2 border rounded-lg",
            {
              "bg-[#24D164]": status === 0 || status === 3,
              "bg-[#FFAA05]": status === 1,
              "bg-[#F73164]": status === 2,
              "bg-[#34335B]": status > 3,
            }
          )}
        ></span>
      </div>
      <div className="flex flex-col">
        <div className="text-[#2D396B] font-bold text-nowrap">Angela L.</div>
        <div
          className={classNames("text-sm text-nowrap", {
            "text-[#24D164]": status === 0 || status === 3,
            "text-[#FFAA05]": status === 1,
            "text-[#F73164]": status === 2,
            "text-[#34335B]": status > 3,
          })}
        >
          {status === 0 && "online"}
          {(status === 1 || status === 2 || status > 3) &&
            moment(lastViewed).fromNow()}
          {status == 3 && (
            <span className="flex items-center">
              <AnimTypingIcon color="#24D164" width={32} /> Typing
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
