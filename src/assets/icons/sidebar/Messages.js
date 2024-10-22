import React from "react";

const MessagesIcon = ({ width = 24, height = 25, color = "#64748B" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.8701 22.1743C17.5601 22.1743 17.2501 22.0943 16.9701 21.9243L12.9601 19.5443C12.5401 19.5343 12.1201 19.5044 11.7201 19.4444C11.4501 19.4044 11.2201 19.2243 11.1201 18.9643C11.0201 18.7043 11.0701 18.4243 11.2501 18.2143C11.9101 17.4443 12.2501 16.5243 12.2501 15.5443C12.2501 13.1243 10.1201 11.1543 7.50008 11.1543C6.52008 11.1543 5.58007 11.4244 4.79007 11.9444C4.57007 12.0844 4.30007 12.1044 4.06007 11.9944C3.83007 11.8844 3.66008 11.6643 3.63008 11.4043C3.60008 11.1243 3.58008 10.8444 3.58008 10.5544C3.58008 5.59435 7.88008 1.56436 13.1601 1.56436C18.4401 1.56436 22.7401 5.59435 22.7401 10.5544C22.7401 13.2744 21.4801 15.7743 19.2601 17.4843L19.6001 20.2044C19.6801 20.8844 19.3801 21.5244 18.8101 21.8944C18.5301 22.0744 18.2001 22.1743 17.8701 22.1743ZM13.1501 18.0343C13.2901 18.0243 13.4301 18.0644 13.5501 18.1444L17.7401 20.6344C17.8501 20.7044 17.9401 20.6744 18.0001 20.6344C18.0501 20.6044 18.1301 20.5244 18.1101 20.3844L17.7201 17.2243C17.6901 16.9443 17.8101 16.6744 18.0301 16.5144C20.0701 15.0844 21.2401 12.9043 21.2401 10.5343C21.2401 6.40433 17.6201 3.04434 13.1601 3.04434C8.87008 3.04434 5.35007 6.16438 5.09007 10.0844C5.84007 9.79438 6.65008 9.63437 7.49008 9.63437C10.9401 9.63437 13.7401 12.2743 13.7401 15.5243C13.7501 16.4043 13.5401 17.2543 13.1501 18.0343Z"
        fill={color}
      />
      <path
        d="M4.57977 23.0544C4.31977 23.0544 4.06977 22.9844 3.83977 22.8344C3.38977 22.5444 3.14978 22.0444 3.20978 21.5144L3.40977 19.9744C2.05977 18.8744 1.25977 17.2444 1.25977 15.5344C1.25977 13.5844 2.27978 11.7644 3.98978 10.6744C5.01978 10.0044 6.23977 9.64444 7.50977 9.64444C10.9598 9.64444 13.7598 12.2844 13.7598 15.5344C13.7598 16.8544 13.2798 18.1544 12.3998 19.1844C11.2698 20.5544 9.57977 21.3544 7.71977 21.4144L5.27977 22.8644C5.05977 22.9944 4.81977 23.0544 4.57977 23.0544ZM7.49977 11.1444C6.51977 11.1444 5.57976 11.4144 4.78976 11.9344C3.50976 12.7544 2.74977 14.0944 2.74977 15.5344C2.74977 16.9244 3.42978 18.1944 4.62978 19.0144C4.85978 19.1744 4.97977 19.4444 4.94977 19.7244L4.72977 21.4344L7.11977 20.0144C7.23977 19.9444 7.36977 19.9044 7.49977 19.9044C8.96977 19.9044 10.3598 19.2744 11.2398 18.2044C11.8998 17.4244 12.2498 16.5044 12.2498 15.5244C12.2498 13.1144 10.1198 11.1444 7.49977 11.1444Z"
        fill={color}
      />
    </svg>
  );
};

export default MessagesIcon;