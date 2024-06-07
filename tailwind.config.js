/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sixty: "#121212",
        thirty: "#333333",
        ten: "#1ABC9C",
      },
    },
  },
  plugins: [],
};
