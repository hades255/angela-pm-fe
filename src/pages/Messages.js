import React, { useCallback, useEffect, useState } from "react";
import UserBoard from "../components/messages/UserBoard";
import AdminMessage from "../components/messages/AdminMessage";
import { useAuth } from "../contexts/AuthContext";
import classNames from "classnames";
import { useSelector } from "react-redux";
import Message from "../components/messages/Message";

const AdminMessages = () => {
  const { isAdmin } = useAuth();
  const selectedUser = useSelector((state) => state.message.selectedUser);
  const [showUsersPanel, setShowUsersPanel] = useState(false);

  const handleClickUsersPanelView = useCallback(
    () => setShowUsersPanel(!showUsersPanel),
    [showUsersPanel]
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) setShowUsersPanel(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen min-h-screen max-h-screen w-screen relative sm:pl-[74px] pt-[74px] flex justify-center">
      <div
        className={classNames("h-full w-full flex px-10 justify-center", {
          "flex-col": isAdmin,
        })}
      >
        {isAdmin && (
          <div className="my-4 text-[24px] font-bold text-[#1D1C1C]">
            Messages
          </div>
        )}
        <div
          className={classNames({
            "w-full h-[calc(100vh_-_172px)] flex": isAdmin,
            "h-full w-full max-w-[1024px] py-4": !isAdmin,
          })}
        >
          {isAdmin && <UserBoard show={showUsersPanel} />}
          {isAdmin && (
            <div
              className={classNames(
                "flex-grow h-full w-full flex flex-col border rounded-e-[12px]",
                {
                  "w-[calc(100vw_-_508px)] overflow-hidden border rounded-[12px]":
                    showUsersPanel,
                }
              )}
            >
              {selectedUser && (
                <AdminMessage
                  hide={showUsersPanel}
                  setShowUsersPanel={handleClickUsersPanelView}
                />
              )}
            </div>
          )}
          {!isAdmin && <Message />}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
