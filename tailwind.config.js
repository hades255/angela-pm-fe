/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "chat-send-button":
          "linear-gradient(108.54deg, #5F5F5F 6.56%, #000000 95.2%)",
      },
      keyframes: {
        "right-modal-in": {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "right-modal-out": {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(100%)", opacity: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        "right-modal-in": "right-modal-in 0.3s ease-out forwards",
        "right-modal-out": "right-modal-out 0.3s ease-out forwards",
        fadeIn: "fadeIn 0.3s ease-out forwards",
        fadeOut: "fadeOut 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
