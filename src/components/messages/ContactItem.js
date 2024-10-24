import classNames from "classnames";
import React, { useCallback } from "react";
import { UserAvatar } from "./Message";
import moment from "moment";

const ContactItem = ({ user, active, onClick }) => {
  const handleClick = useCallback(() => onClick(user), [onClick, user]);

  return (
    <div
      className={classNames(
        "flex border-t border-[#CBD5E1] px-[18px] py-6 gap-[10px] relative cursor-pointer hover:bg-[#f6f6fd] transition-all",
        { "bg-[#F6F8FD]": active }
      )}
      onClick={handleClick}
    >
      <div>
        <UserAvatar
          onClick={handleClick}
          avatar={user.avatar}
          status={user.status}
          width={58}
          height={58}
          class1="w-[58px] min-w-[58px] h-[58px] min-h-[58px]"
          class2="w-[11px] h-[11px]"
        />
      </div>
      <div className="flex-grow flex flex-col gap-1">
        <div className="flex justify-between items-baseline">
          <div className="text-lg font-bold text-[#2D396B]">{user.name}</div>
          <div className="text-[#34335B]">
            {moment(user.updated_at).fromNow()}
          </div>
        </div>
        <div className="text-sm text-[#68769F]">
          Recent Message of chat display here
        </div>
      </div>
      {user.news && (
        <span className="absolute bottom-7 right-4 w-5 h-5 rounded-[20px] bg-[#F73164] text-xs text-white flex justify-center items-center">
          {user.news || 0}
        </span>
      )}
    </div>
  );
};

export default ContactItem;
