import React from "react";
import ContactItem from "./ContactItem";
import SearchIcon from "../../assets/icons/Search";

const UserBoard = () => {
  return (
    <div className="border-0 w-0 xl:w-[408px] xl:min-w-[408px] h-full rounded-s-[12px] xl:border border-[#E0E5F2] xl:flex xl:flex-col overflow-x-hidden transition-all">
      <div className="min-h-[60px] h-[60px] flex justify-between items-center px-5">
        <div className="text-lg text-[#2B2929] font-bold">Online Users</div>
        <div className="text-[#47548C] font-[500]">+Add new contact</div>
      </div>
      <div className="min-h-[78px] h-[78px] flex items-center px-5 gap-4">
        <div className="relative">
          <img
            src="/avatars/user1.png"
            alt="user 1"
            width={58}
            height={58}
            className="rounded-[58px]"
          />
          <span className="absolute bottom-[2px] right-[2px] w-[11px] h-[11px] border rounded-lg bg-green-500"></span>
        </div>
        <div className="relative">
          <img
            src="/avatars/user2.png"
            alt="user 2"
            width={58}
            height={58}
            className="rounded-[58px]"
          />
          <span className="absolute bottom-[2px] right-[2px] w-[11px] h-[11px] border rounded-lg bg-green-500"></span>
        </div>
        <div className="relative">
          <img
            src="/avatars/user3.png"
            alt="user 3"
            width={58}
            height={58}
            className="rounded-[58px]"
          />
          <span className="absolute bottom-[2px] right-[2px] w-[11px] h-[11px] border rounded-lg bg-green-500"></span>
        </div>
        <div className="relative">
          <img
            src="/avatars/user4.png"
            alt="user 4"
            width={58}
            height={58}
            className="rounded-[58px]"
          />
          <span className="absolute bottom-[2px] right-[2px] w-[11px] h-[11px] border rounded-lg bg-green-500"></span>
        </div>
        <div className="relative">
          <img
            src="/avatars/user5.png"
            alt="user 5"
            width={58}
            height={58}
            className="rounded-[58px]"
          />
          <span className="absolute bottom-[2px] right-[2px] w-[11px] h-[11px] border rounded-lg bg-green-500"></span>
        </div>
      </div>
      <div className="min-h-[50px] h-[50px] flex justify-center items-end text-lg font-bold text-[#2B2929]">
        Messages
      </div>
      <div className="min-h-[84px] h-[84px] flex justify-center items-center px-5">
        <div className="w-full h-[44px] relative">
          <input
            className="w-full h-full border border-[#A3AED0] bg-[#F6F8FD] text-xs text-[#919090] rounded-lg pl-11 pe-4 py-3"
            placeholder="Search..."
          />
          <div className="absolute top-0 left-4 h-full flex items-center cursor-pointer">
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col overflow-y-scroll">
        <ContactItem active={true} />
        <ContactItem active={false} />
        <ContactItem active={false} />
        <ContactItem active={false} />
        <ContactItem active={false} />
        <ContactItem active={false} />
      </div>
    </div>
  );
};

export default UserBoard;
