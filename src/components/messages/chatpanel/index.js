import React, { useEffect, useMemo, useRef } from "react";
import ChatInput from "./ChatInput";
import MoreIcon from "../../../assets/icons/More";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useAuth } from "../../../contexts/AuthContext";
import moment from "moment";

const ChatPanel = ({ hide }) => {
  const user = useAuth();
  const { messages, selectedUser } = useSelector((state) => state.message);

  const lastShow = useRef(null);

  const displayingMessages = useMemo(() => {
    let result = [];
    let dt = "";
    let _messages = [];
    if (user.isAdmin)
      _messages = messages.filter((item) => item.room === selectedUser.room);
    else _messages = messages;
    _messages.forEach((item) => {
      const date = new Date(item.updated_at).toLocaleDateString();
      if (dt !== date) {
        dt = date;
        result.push({
          type: "day",
          item: { id: `${date}-${item.id}`, text: date },
        });
      }
      result.push({ type: "message", item });
    });
    return result;
  }, [messages, selectedUser, user]);

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
                mine={user.id.toString() === item.from.toString()}
                message={item}
                me={user}
                oppo={selectedUser}
              />
            ) : (
              <DayDivider date={item} key={item.id} />
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

const ChatItem = ({ message, mine, me, oppo }) => {
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
                    src={`/avatars/${oppo.avatar}`}
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
                    src={`/avatars/${me.avatar}`}
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
      <div className="text-[#34335BA0] font-[500] text-nowrap mx-4">
        {moment(date.text).format("MMMM D, YYYY")}
      </div>
      <div className="border-t-2 border-[#34335B10] w-full"></div>
    </div>
  );
};
