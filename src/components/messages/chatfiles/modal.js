import React, { useCallback, useState } from "react";
import SearchIcon from "../../../assets/icons/Search";
import DownloadIcon from "../../../assets/icons/media/Download";
import MoreIcon from "../../../assets/icons/More";
import classNames from "classnames";

const ChatFilesModal = ({ show, onClose }) => {
  const [close, setClose] = useState(false);

  const handleClickClose = useCallback(() => {
    setClose(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onclose]);

  return (
    <>
      <div
        className={classNames(
          "absolute top-0 left-0 w-screen h-screen bg-[#535353C8] z-30",
          {
            "animate-fadeIn": show,
            "animate-fadeOut": close,
          }
        )}
        onClick={handleClickClose}
      ></div>
      <div
        className={classNames(
          "absolute right-0 top-0 w-full max-w-[540px] h-screen bg-white z-30",
          {
            "animate-right-modal-in": show,
            "animate-right-modal-out": close,
          }
        )}
      >
        <div className="min-h-[50px] h-[50px] text-2xl font-bold text-[#2B2929] px-10 mt-16">
          Chat Files
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
        <div className="p-[30px] flex flex-col gap-2 h-[calc(100%_-_240px)] overflow-y-scroll">
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
        </div>
      </div>
    </>
  );
};

export default ChatFilesModal;

const FileItem = () => {
  return (
    <div className="border border-[#B3B3B2] px-3 py-[11px] gap-[15px] rounded-xl flex">
      <div className="w-full flex items-center gap-[15px]">
        <div>
          <img
            alt="file"
            src="/avatars/user1.png"
            width={88}
            height={88}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-[#34335B] font-bold">File Name.pdf</div>
          <span className="text-xs text-[#34335B90]">18 Sep, 2024</span>
        </div>
      </div>
      <div className="flex items-start">
        <div className="cursor-pointer">
          <MoreIcon />
        </div>
      </div>
    </div>
  );
};
