import React from "react";
import Mp4Icon from "../../../assets/icons/media/Mp4";
import DocumentIcon from "../../../assets/icons/media/Document";

const ChatFilesPanel = () => {
  return (
    <>
      <div className="mt-5 flex justify-between">
        <span className="text-lg text-[#2B2929] font-bold">Chat Files</span>
        <span className="text-[#47548C] font-[500]">View All</span>
      </div>
      <div>
        <ChatFileItem
          type={"mp4"}
          title={"File Name.mp4"}
          size={"480KB"}
          createdAt={"18 Sep 2024"}
        />
        <ChatFileItem
          type={"doc"}
          title={"File Name.docx"}
          size={"480KB"}
          createdAt={"18 Sep 2024"}
        />
        <ChatFileItem
          type={"doc"}
          title={"File Name.pdf"}
          size={"480KB"}
          createdAt={"18 Sep 2024"}
        />
      </div>
    </>
  );
};

export default ChatFilesPanel;

const ChatFileItem = ({ type, title, size, createdAt }) => {
  return (
    <div className="h-[64px] flex items-center px-3 gap-3">
      <div className="w-12 h-12 rounded-[24px] bg-[#F1F5F9] flex justify-center items-center">
        {type === "mp4" && <Mp4Icon />}
        {type === "doc" && <DocumentIcon />}
      </div>
      <div className="flex flex-col">
        <div className="text-sm text-[#34335B] font-bold">{title}</div>
        <div className="flex">
          <span className="text-xs text-[#34335B] min-w-14">{size}</span>
          <span className="text-xs text-[#34335B] ">{createdAt}</span>
        </div>
      </div>
    </div>
  );
};
