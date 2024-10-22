import React from "react";

const SupportIcon = ({ width = 24, height = 24, color = "#64748B" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 18.86H17.24C16.44 18.86 15.68 19.17 15.12 19.73L13.41 21.42C12.63 22.19 11.36 22.19 10.58 21.42L8.87 19.73C8.31 19.17 7.54 18.86 6.75 18.86H5C3.34 18.86 2 17.53 2 15.89V4.97998C2 3.33998 3.34 2.01001 5 2.01001H19C20.66 2.01001 22 3.33998 22 4.97998V15.89C22 17.52 20.66 18.86 19 18.86Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask0_235_403"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x="4"
        y="2"
        width="17"
        height="18"
      >
        <path d="M21 2H4V20H21V2Z" fill={color} />
      </mask>
      <g mask="url(#mask0_235_403)">
        <path
          d="M15.3789 7.99221L12.6445 14.8672"
          stroke={color}
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.64 10.5703H19.4766L17.2099 15.7266"
          stroke={color}
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <mask
          id="mask1_235_403"
          style={{
            maskType: "luminance",
          }}
          maskUnits="userSpaceOnUse"
          x="3"
          y="3"
          width="18"
          height="15"
        >
          <path d="M3 3H21V18H3V3Z" fill="white" />
        </mask>
        <g mask="url(#mask1_235_403)">
          <path
            d="M12.4302 9.90793H9.19229C9.19229 9.90793 10.9066 6.80048 11.1896 6.45338C11.4756 6.10237 11.7465 6.32129 11.7723 6.63088C11.7981 6.94052 11.7594 11.4297 11.7594 11.4297"
            stroke={color}
            strokeWidth="1.2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.07505 11.4181C8.07505 11.4181 5.6145 11.449 5.49793 11.4102C5.38139 11.3713 5.6848 11.1661 7.29805 8.86112C7.59935 8.43062 7.76516 8.06745 7.83572 7.76319L7.86073 7.5676C7.86073 6.85286 7.28134 6.27351 6.56664 6.27351C5.93779 6.27351 5.41371 6.7221 5.29688 7.31675"
            stroke={color}
            strokeWidth="1.2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};

export default SupportIcon;
