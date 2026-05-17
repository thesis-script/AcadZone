/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        secondary: "#4A90E2",
        dark: "#1E1E2F",
        light: "#F5F7FB",
        acadtext: "#333333",
      },
      fontFamily: {
        arabic: ["Noto Kufi Arabic", "sans-serif"],
        display: ["Playfair Display", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}
