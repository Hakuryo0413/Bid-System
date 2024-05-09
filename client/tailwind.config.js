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
        background: "#111A29",
        loginText: "#39147B",
        signupText: "#4EAD8B",
        activeButton: "#4DA979",
        h6: "#6A7785",
        headline: "#302C42",
        button: "#7339AB",
        buttonbg: "#0E0F18",
        textColor: "#ffffff",
        currentText: "#ffd600",
        card: "#1F2A3A",
        buttonOrigin: "#4A5567",
        note: "#1e2a3b",
        dialog: "#000000e0",
        border: "#27364B",
        textTable: "#94a3b8",
        primary: "#111A29",
        bgDefault: "rgb(15,26,42)",
      },
    },
    plugins: [require("tailwind-scrollbar"), require("@tailwindcss/forms")],
  },
});
