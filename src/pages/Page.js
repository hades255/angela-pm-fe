import SearchIcon from "@icons/Search";
import clsx from "clsx";
import React, { useCallback, useState } from "react";

const Page = () => {
  return (
    <div className="h-screen min-h-screen max-h-screen w-screen p-1 sm:pl-[78px] pt-[78px]">
      <div className="w-full h-full bg-[#F5F5F5] flex flex-col rounded-2xl">
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
          <button className="w-8 h-8 flex justify-center items-center bg-white rounded-lg shadow-[0_0_8px_#0004]">
            X
          </button>
        </div>
        <div className="h-full flex justify-center pb-4 px-2">
          <div className="bg-white container rounded-2xl shadow-[0_0_8px_#0001] flex">
            <div className="w-[340px] min-w-[340px] shadow-[4px_0_8px_#00000008] rounded-e-lg p-9 flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center font-semibold text-[22px]">
                    AI Knowledge
                  </div>
                  <button className="flex justify-center border border-gray-400 px-3 py-1 rounded-lg">
                    Learn
                  </button>
                </div>
                <Sidebar />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 flex justify-center items-center border border-black rounded-full">
                    ?
                  </div>
                  <div className="text-[22px] text-[#22272d] font-semibold">
                    Model usage
                  </div>
                </div>
                <div className="flex flex-col p-6 rounded-2xl bg-[#F5F5F5]">
                  <div className="flex items-baseline gap-1">
                    <div className="text-[40px] font-bold">0</div>
                    <div className="text-sm">of 5000</div>
                  </div>
                  <div className="font-semibold">Used content sources</div>
                </div>
              </div>
            </div>
            <div className="w-full h-full">
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-[380px] flex flex-col gap-4">
                  <div className="flex justify-center">
                    <div className="w-40 h-40 rounded-full bg-black"></div>
                  </div>
                  <div className="font-semibold text-center text-[22px]">
                    No content added
                  </div>
                  <div className="text-center text-[#59687b]">
                    Scrap or add content, which AI Assist can use to respond to
                    your customers' queries.
                  </div>
                  <div className="flex justify-center gap-4">
                    <button className="px-4 py-1 text-[#0e1013] border border-[#22272d] rounded-lg">
                      How it works
                    </button>
                    <button className="px-4 py-1 bg-[#22272d] text-white rounded-lg">
                      + Add content
                    </button>
                  </div>
                </div>
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
    { title: "Websites", count: 0, disabled: false, note: "" },
    { title: "Articles", count: 0, disabled: false, note: "" },
    { title: "KnowledgeBase", count: 0, disabled: false, note: "" },
    { title: "Zendesk", count: 0, disabled: false, note: "" },
    { title: "Files", count: 0, disabled: true, note: "soon" },
  ];

  const [active, setActive] = useState(0);

  const handleClick = useCallback((param) => setActive(param), []);

  return (
    <>
      {menus.map((item, index) => (
        <SidebarItem
          key={index}
          {...item}
          active={active}
          index={index}
          onClick={handleClick}
        />
      ))}
    </>
  );
};

const SidebarItem = ({
  active,
  index,
  title,
  count,
  disabled,
  note,
  onClick,
}) => {
  const handleClick = useCallback(() => onClick(index), [index, onClick]);

  return (
    <div
      className={clsx("pl-6 pr-4 py-2 flex justify-between rounded-xl", {
        "bg-[#F5F5F5] text-[#006cff]": active === index,
        "text-[#919ead]": disabled,
        "cursor-pointer hover:bg-[#F5F5F5] transition-all": !disabled,
      })}
      onClick={handleClick}
    >
      <div>{title}</div>
      <div>
        {disabled && note && (
          <div className="bg-[#f6f6f6] p-1 text-xs uppercase">{note}</div>
        )}
        {!disabled && <div className="text-[#919ead]">{count}</div>}
      </div>
    </div>
  );
};
