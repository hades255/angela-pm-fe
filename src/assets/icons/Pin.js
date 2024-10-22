import React from "react";

const PinIcon = ({ width = 17, height = 17, color = "#2B2929" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 12.1317L0.5 16.1317M8 15.6323C8 15.1323 8.3 13.7323 9.5 12.1323C10.7 10.5323 12.6667 9.29841 14 8.63174C16 7.63174 16.5 7.49902 12.5 3.63143C9.69258 0.916952 9 0.13231 8 2.13231C7 4.13231 6 7.13247 3.5 7.63239C1.5 8.03233 0.666667 8.13231 0.5 8.13231L8 15.6323Z"
        stroke={color}
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PinIcon;
