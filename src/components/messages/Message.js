import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChatPanel from "./chatpanel";
import PinnedPanel from "./pinnedpanel";
import LeftVectorIcon from "../../assets/icons/vector/Left";
import RightVectorIcon from "../../assets/icons/vector/Right";
import { useSelector } from "react-redux";
import classNames from "classnames";
import moment from "moment";
import AnimTypingIcon from "../../assets/icons/loader/AnimTyping";
import { useAuth } from "../../contexts/AuthContext";
import { getSelectedUser } from "../../redux/messageSlice";

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
          className="cursor-pointer px-2 xl:hidden"
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

export const UserHeadItem = () => {
  const { isAdmin } = useAuth();
  const { status, lastViewed } = useSelector((state) => state.message);
  const selectedUser = useSelector(getSelectedUser);

  const _status = useMemo(() => {
    if (isAdmin) return selectedUser?.status;
    return status;
  }, [isAdmin, status, selectedUser]);

  return (
    selectedUser && (
      <div className="flex items-center gap-3">
        <UserAvatar avatar={selectedUser.avatar} status={_status} />
        <div className="flex flex-col">
          <div className="text-[#2D396B] font-bold text-nowrap">
            {selectedUser.name}
          </div>
          <div
            className={classNames("text-sm text-nowrap", {
              "text-[#24D164]": _status === 3 || (!isAdmin && _status === 0),
              "text-[#34335B]":
                _status === 1 || _status === 2 || (isAdmin && _status !== 3),
            })}
          >
            {_status === 0 && !isAdmin && "online"}
            {(_status === 1 ||
              _status === 2 ||
              _status > 3 ||
              (_status === 0 && isAdmin)) &&
              moment(isAdmin ? selectedUser.updated_at : lastViewed).fromNow()}
            {_status === 3 && (
              <span className="flex items-center">
                <AnimTypingIcon color="#24D164" width={32} /> Typing
              </span>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export const UserAvatar = ({
  avatar,
  status,
  width = 40,
  height = 40,
  class1 = "",
  class2 = "",
  onClick,
}) => {
  const _status = Number(status);

  return (
    <div className="relative" onClick={onClick}>
      <img
        src={`/avatars/${avatar}`}
        alt="user avatar"
        width={width}
        height={height}
        className={classNames(
          "rounded-[58px] min-w-10 min-h-10 max-w-10 max-h-10 cursor-pointer",
          class1
        )}
      />
      <span
        className={classNames(
          "absolute bottom-[2px] right-[2px] w-2 h-2 border rounded-lg",
          {
            "bg-[#24D164]": _status === 0 || _status === 3,
            "bg-[#FFAA05]": _status === 1,
            "bg-[#F73164]": _status === 2,
            "bg-[#34335B]": _status > 3,
          },
          class2
        )}
      ></span>
    </div>
  );
};
