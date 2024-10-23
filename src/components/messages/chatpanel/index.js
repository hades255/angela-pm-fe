import React, { useEffect, useMemo, useRef } from "react";
import ChatInput from "./ChatInput";
import MoreIcon from "../../../assets/icons/More";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useAuth } from "../../../contexts/AuthContext";
import moment from "moment";

const ChatPanel = ({ hide }) => {
  const userId = useAuth().id;
  const messages = useSelector((state) => state.message.messages);

  const lastShow = useRef(null);

  const displayingMessages = useMemo(() => {
    let result = [];
    let dt = "";
    messages.forEach((item) => {
      const date = item.updated_at.substring(0, 10);
      if (dt !== date) {
        dt = date;
        result.push({ type: "day", item: date });
      }
      result.push({ type: "message", item });
    });
    return result;
  }, [messages]);

  useEffect(() => {
    if (lastShow.current)
      lastShow.current.scrollIntoView({ behavior: "smooth" });
  }, [displayingMessages]);

  return (
    <>
      <div
        className={classNames(
          "w-full md:w-[calc(100%_-_284px)] h-full rounded-bl-[12px] rounded-br-[12px] md:rounded-br-none border border-[#E0E5F2] relative transition-all overflow-x-hidden",
          { "w-0 max-w-0 border-0": hide }
        )}
      >
        <div className="flex flex-col h-full overflow-y-scroll p-5 gap-6">
          {displayingMessages.map(({ type, item }) =>
            type === "message" ? (
              <ChatItem
                key={item.id}
                mine={userId === item.from.id}
                message={item}
              />
            ) : (
              <DayDivider date={item} key={item} />
            )
          )}
          <div className="invisible mt-16" ref={lastShow}></div>
        </div>
        <ChatInput />
      </div>
    </>
  );
};

export default ChatPanel;

const ChatItem = ({ message, mine }) => {
  const createMarkup = () => {
    return { __html: message.text || "" };
  };

  return (
    <div
      className={classNames("flex", {
        "justify-end": mine,
        "justify-start": !mine,
      })}
    >
      <div className="max-w-full sm:max-w-[75%]">
        <div className="flex justify-stretch">
          {mine && (
            <div className="min-w-8 flex justify-start items-start">
              <div className="cursor-pointer">
                <MoreIcon />
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <div className="flex">
              {!mine && (
                <div className="min-w-12 flex items-end">
                  <img
                    src={`/avatars/${message.from.avatar}`}
                    alt="user avatar"
                    className="w-9 h-9 min-w-9 rounded-3xl"
                  />
                </div>
              )}
              <div
                className={classNames(
                  "px-8 py-5 rounded-xl text-[#2B3674] text-sm",
                  {
                    "bg-chat-send-button text-white rounded-br-none": mine,
                    "bg-[#F6F8FD] text-[#2B3674] rounded-bl-none": !mine,
                  }
                )}
                dangerouslySetInnerHTML={createMarkup()}
              />
              {mine && (
                <div className="min-w-12 flex justify-end items-end">
                  <img
                    src={`/avatars/${message.from.avatar}`}
                    alt="user avatar"
                    className="w-9 h-9 min-w-9 rounded-3xl"
                  />
                </div>
              )}
            </div>
            <div
              className={classNames("text-sm text-[#34335B90]", {
                "flex justify-end": !mine,
              })}
            >
              {moment(message.updated_at).format("HH:mm")}
            </div>
          </div>
          {!mine && (
            <div className="min-w-8 flex justify-end items-start">
              <div className="cursor-pointer">
                <MoreIcon />
              </div>
            </div>
          )}
        </div>
        {message.attachments && (
          <div
            className={classNames("flex mt-2 gap-4 flex-wrap", {
              "justify-end mr-12": mine,
              "justify-start ml-12": !mine,
            })}
          >
            {message.attachments.map((item, index) => (
              <img
                key={index}
                src={`${item}`}
                width={63}
                height={63}
                alt="attached"
                className="rounded-[10px]"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const DayDivider = ({ date }) => {
  return (
    <div className="mt-2 mb-1 flex justify-stretch items-center">
      <div className="border-t-2 border-[#34335B10] w-full"></div>
      <div className="text-[#34335BA0] font-[500] text-nowrap mx-4">{date}</div>
      <div className="border-t-2 border-[#34335B10] w-full"></div>
    </div>
  );
};
