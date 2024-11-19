import SearchIcon from "@icons/Search";
import clsx from "clsx";
import React, { useState } from "react";

const Page = () => {
  return (
    <div className="h-screen min-h-screen max-h-screen w-screen p-2 sm:pl-[82px] pt-[82px]">
      <div className="w-full h-full bg-[#F6F6F6] flex flex-col rounded-2xl">
        <div className="flex justify-between items-center px-8 py-3">
          <div className="text-lg text-[#22272d] font-bold">Untitled</div>
          <div className="relative">
            <input
              placeholder="Search"
              className="w-[460px] bg-white rounded-lg pl-12 py-3"
            />
            <span className="absolute top-0 left-4 h-full flex items-center">
              <SearchIcon />
            </span>
          </div>
          <div className="w-8 h-8 flex justify-center items-center bg-white rounded-lg shadow-[0_0_8px_#0004]">
            X
          </div>
        </div>
        <div className="h-full flex justify-center pb-4">
          <div className="bg-white container rounded-2xl shadow-[0_0_8px_#0001] flex">
            <div className="w-[340px] shadow-[4px_0_8px_#00000008] rounded-e-lg p-9 flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center font-semibold text-[22px]">
                    AI Knowledge
                  </div>
                  <div className="flex justify-center border border-gray-400 px-3 py-1 rounded-lg">
                    Learn
                  </div>
                </div>
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

const Sidebar = () => {
  const menus = [
    { title: "Websites", count: 0, disabled: false },
    { title: "Articles", count: 0, disabled: false },
    { title: "KnowledgeBase", count: 0, disabled: false },
    { title: "Zendesk", count: 0, disabled: false },
    { title: "Files", count: 0, disabled: true },
  ];

  const [active, setActive] = useState(0);

  return (
    <>
      {menus.map((item, index) => (
        <SidebarItem key={index} {...item} active={active} index={index} />
      ))}
    </>
  );
};

const SidebarItem = ({ active, index, title, count, disabled }) => {
  return (
    <div
      className={clsx("pl-6 py-3 flex justify-between rounded-xl", {
        "bg-[#F6F6F6]": active === index,
      })}
    >
      <div>{title}</div>
    </div>
  );
};
