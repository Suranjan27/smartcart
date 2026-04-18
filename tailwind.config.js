export default {
  darkMode: "selector", // Use 'selector' instead of 'class'
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Added ts/tsx just in case
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: "#1A1A2E",
        accentDark: "#FFB400",
        primaryLight: "#EED36D",
        accentLight: "#194F70",
      },
    },
  },
  plugins: [],
};