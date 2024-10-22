import React from "react";
import PinIcon from "../../../assets/icons/Pin";
import MoreIcon from "../../../assets/icons/More";

const PinnedChatItem = () => {
  return (
    <div className="flex flex-col rounded bg-[#F4F6F8] p-2 gap-1">
      <div className="flex justify-between items-center">
        <div className="flex w-9 h-9 justify-center items-center">
          <PinIcon />
        </div>
        <div className="flex items-center gap-[14px]">
          <span className="text-xs text-[#919090]">10/16/24, 12:34</span>
          <div className="cursor-pointer">
            <MoreIcon width={18} height={18} color="#2B2929" />
          </div>
        </div>
      </div>
      <div className="text-sm text-[#2D396B] font-[500]">User Name</div>
      <div className="text-xs text-[#2B2929] font-[500]">
        Milestone 1-Milestone Name display here
      </div>
    </div>
  );
};

export default PinnedChatItem;
