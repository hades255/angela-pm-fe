import classNames from "classnames";
import React, { useCallback } from "react";

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
        <div className="relative">
          <img
            src={`/avatars/${user.avatar}`}
            alt={user.avatar}
            width={58}
            height={58}
            className="rounded-[58px] w-[58px] min-w-[58px]"
          />
          <span className="absolute bottom-[2px] right-[2px] w-[11px] h-[11px] border rounded-lg bg-green-500"></span>
        </div>
      </div>
      <div className="flex-grow flex flex-col gap-1">
        <div className="flex justify-between items-baseline">
          <div className="text-lg font-bold text-[#2D396B]">{user.name}</div>
          <div className="text-[#34335B]">28 min ago</div>
        </div>
        <div className="text-sm text-[#68769F]">
          Recent Message of chat display here
        </div>
      </div>
      <span className="absolute bottom-7 right-4 w-5 h-5 rounded-[20px] bg-[#F73164] text-xs text-white flex justify-center items-center">
        2
      </span>
    </div>
  );
};

export default ContactItem;
