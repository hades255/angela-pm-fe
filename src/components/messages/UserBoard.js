import React, { useCallback, useMemo, useState } from "react";
import ContactItem from "./ContactItem";
import SearchIcon from "../../assets/icons/Search";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { setUserSelect } from "../../redux/messageSlice";
import { UserAvatar } from "./Message";
import { useWebSocket } from "../../WebSocketContext";

const UserBoard = ({ show }) => {
  return (
    <div
      className={classNames(
        "border-0 w-0 xl:w-[408px] xl:min-w-[408px] h-full rounded-s-[12px] xl:border border-[#E0E5F2] xl:flex xl:flex-col overflow-x-hidden transition-all",
        {
          "w-full min-w-[408px] !border flex flex-col rounded-[12px]": show,
        }
      )}
    >
      <div className="flex justify-between items-center px-5 pt-4 pb-2 gap-2 flex-wrap">
        <div className="text-lg text-[#2B2929] font-bold text-nowrap">
          Online Users
        </div>
        <div className="text-[#47548C] font-[500] text-center cursor-pointer hover:underline">
          +Add new contact
        </div>
      </div>
      <div className="flex flex-wrap items-center px-5 py-2 gap-4">
        <OnlineUsers />
      </div>
      <AllUsers />
    </div>
  );
};

export default UserBoard;

const AllUsers = () => {
  const dispatch = useDispatch();
  const { socket } = useWebSocket();
  const { users, selectedUser } = useSelector((state) => state.message);
  const [search, setSearch] = useState("");

  const handleSearchChange = useCallback(
    ({ target: { value } }) => setSearch(value),
    []
  );

  const handleSelect = useCallback(
    (selected) => {
      dispatch(setUserSelect(selected));
      socket.send(
        JSON.stringify({
          room: selected.room,
          type: "select",
          data: selectedUser ? selectedUser.room : "",
        })
      );
    },
    [dispatch, socket, selectedUser]
  );

  const filteredUsers = useMemo(() => {
    if (users && users.length) {
      let filtered = users.filter(
        (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
      return filtered;
    }
    return [];
  }, [search, users]);

  return (
    <>
      <div className="min-h-[50px] h-[50px] flex justify-center items-end text-lg font-bold text-[#2B2929]">
        Messages
      </div>
      <div className="min-h-[84px] h-[84px] flex justify-center items-center px-5">
        <div className="w-full h-[44px] relative">
          <input
            className="w-full h-full border border-[#A3AED0] bg-[#F6F8FD] text-xs text-[#919090] rounded-lg pl-11 pe-4 py-3"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
          />
          <div className="absolute top-0 left-4 h-full flex items-center cursor-pointer">
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col overflow-y-scroll">
        {filteredUsers.length > 0 &&
          filteredUsers.map((item) => (
            <ContactItem
              user={item}
              key={item.id}
              onClick={handleSelect}
              active={selectedUser && selectedUser.id === item.id}
            />
          ))}
      </div>
    </>
  );
};

const OnlineUsers = () => {
  const { socket } = useWebSocket();
  const dispatch = useDispatch();
  const { users, selectedUser } = useSelector((state) => state.message);

  const handleSelect = useCallback(
    (selected) => {
      dispatch(setUserSelect(selected));
      socket.send(
        JSON.stringify({
          room: selected.room,
          type: "select",
          data: selectedUser ? selectedUser.room : "",
        })
      );
    },
    [dispatch, socket, selectedUser]
  );

  return (
    <>
      {users.length > 0 &&
        users
          .filter((item) => item.status !== 2 && item.status !== 1)
          .map((item) => (
            <OnlineUserItem user={item} key={item.id} onClick={handleSelect} />
          ))}
    </>
  );
};

const OnlineUserItem = ({ user, onClick }) => {
  const handleClick = useCallback(() => onClick(user), [onClick, user]);

  return (
    <UserAvatar
      onClick={handleClick}
      avatar={user.avatar}
      status={user.status}
      width={58}
      height={58}
      class1="w-[58px] min-w-[58px] h-[58px] min-h-[58px]"
      class2="w-[11px] h-[11px]"
    />
  );
};
