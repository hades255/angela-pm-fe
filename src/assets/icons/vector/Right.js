import React from "react";

const DownVectorIcon = ({ width = 6, height = 9, color = "#94A3B8" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 6 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L5 5L1 8.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownVectorIcon;
