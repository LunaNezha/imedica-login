import defaultTheme from "tailwindcss/defaultTheme.js";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  important: true,
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
        iranyekan: ['"Iranyekan"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
