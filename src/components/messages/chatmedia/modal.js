import React, { useCallback, useState } from "react";
import SearchIcon from "../../../assets/icons/Search";
import DownloadIcon from "../../../assets/icons/media/Download";
import MoreIcon from "../../../assets/icons/More";
import classNames from "classnames";
import LeftVectorIcon from "../../../assets/icons/vector/Left";

const ChatMediaModal = ({ show, onClose }) => {
  const [close, setClose] = useState(false);

  const handleClickClose = useCallback(() => {
    setClose(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  return (
    <>
      <div
        className={classNames(
          "fixed top-0 left-0 w-screen h-screen bg-[#535353C8] z-30",
          {
            "animate-fadeIn": show,
            "animate-fadeOut": close,
          }
        )}
        onClick={handleClickClose}
      ></div>
      <div
        className={classNames(
          "fixed right-0 top-0 w-full max-w-[540px] h-screen bg-white z-30",
          {
            "animate-right-modal-in": show,
            "animate-right-modal-out": close,
          }
        )}
      >
        <div className="min-h-[50px] h-[50px] text-2xl font-bold text-[#2B2929] px-10 mt-16 flex items-center">
          <span
            onClick={handleClickClose}
            className="md:hidden cursor-pointer px-2 mr-2"
          >
            <LeftVectorIcon width={12} height={18} />
          </span>
          Chat Media
        </div>
        <div className="px-10 min-h-[84px] h-[84px] flex items-center gap-5">
          <div className="w-full h-[44px] relative">
            <input
              className="w-full h-full border border-[#A3AED0] bg-[#F6F8FD] text-xs text-[#919090] rounded-lg pl-11 pe-4 py-3"
              placeholder="Search Files"
            />
            <div className="absolute top-0 left-4 h-full flex items-center cursor-pointer">
              <SearchIcon />
            </div>
          </div>
          <div className="w-[44px] min-w-[44px] h-[44px] min-h-[44px] flex justify-center items-center cursor-pointer bg-[#F1F5F9] rounded-lg">
            <DownloadIcon />
          </div>
        </div>
        <div className="px-10 py-5 flex flex-wrap h-[calc(100%_-_240px)] overflow-y-scroll">
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
        </div>
      </div>
    </>
  );
};

export default ChatMediaModal;

const MediaItem = () => {
  return (
    <div className="w-1/3 p-2 gap-[15px] relative">
      <div className="flex flex-col gap-[15px]">
        <div>
          <img
            alt="file"
            src="/avatars/user1.png"
            width={132}
            height={132}
            className="rounded-xl"
          />
        </div>
        <div>
          <div className="text-[#34335B] font-bold">File Name.pdf</div>
          <span className="text-xs text-[#34335B90]">18 Sep, 2024</span>
        </div>
      </div>
      <div className="absolute top-2 right-2 cursor-pointer">
        <MoreIcon />
      </div>
    </div>
  );
};
