import React from "react";

const OpenSidebarIcon = ({ width = 15, height = 72, color = "#E2E8F0" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0L15 9.66443V62.3356L0 72V0Z" fill={color} />
      <path
        d="M6 31L10 35L6 38.5"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default OpenSidebarIcon;
