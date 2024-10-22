import React from "react";
import BellIcon from "../../../../assets/icons/Bell";
import DownVectorIcon from "../../../../assets/icons/vector/Down";
import MarkIcon from "../../../../assets/icons/Mark";

const Header = () => {
  return (
    <div className="absolute top-0 left-0 w-screen h-[74px] border border-[#F4F7FE] bg-white shadow-[0_1px_2px_#0000000F,0_1px_3px_#0000001A] px-8 z-20">
      <div className="w-full h-full flex justify-between items-center">
        <div className="sm:invisible">
          <MarkIcon />
        </div>
        <div className="flex items-center">
          <div className="flex justify-center items-center w-10 h-10 rounded-lg bg-[#F2F4F1] hover:bg-[#ced1cc] relative mr-3 cursor-pointer transition-all">
            <BellIcon />
            <span className="absolute top-3 left-[22px] w-[6px] h-[6px] rounded bg-red-500"></span>
          </div>
          <div className="flex items-center">
            <div className="px-3 flex flex-col items-end">
              <div className="text-[20px] font-bold">Angela L.</div>
              <div className="text-sm text-[#64748B]">Project Manager</div>
            </div>
            <div className="flex items-center cursor-pointer">
              <div className="mx-1 w-10 h-10 rounded-[40px] bg-[#F2F4F1]">
                <img
                  src="/avatars/user0.png"
                  alt="user avatar"
                  className="w-10 h-10 rounded-[40px]"
                />
              </div>
              <div className="px-1">
                <DownVectorIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
