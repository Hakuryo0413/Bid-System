/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        logo: ["FontSpring Demo Priego"],
        sans: ["Open Sans", "Roboto", "Arial", "sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: [
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      colors: {
        foundItBg: "#f7f2fa",
        footerBg: "#1d1934",
        limeGreen: "#0AD20A",
        buttonBlue: "#C4DDFF",
        bgBlue: "#82b4f8",
        background: "#f4f7ff",
        loginText: "#39147B",
        activeButton: "#007aff",
        h6: "#6A7785",
        headline: "#302C42",
        button: "#7339AB",
        buttonbg: "#0E0F18",
        textColor: "#0E0F18"
      },
    },
    plugins: [require("tailwind-scrollbar"), require("@tailwindcss/forms")],
  },
});
