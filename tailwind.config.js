const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  important: true,
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        rose: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519",
        },
        violet: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        blue: {
          50: "#eef6ff",
          100: "#d8eaff",
          200: "#bad9ff",
          300: "#8bc4ff",
          400: "#55a2ff",
          500: "#2d7dff",
          600: "#2666fa",
          700: "#0f45e6",
          800: "#1338ba",
          900: "#163592",
          950: "#122259",
        },
        ebony: {
          50: "#f0f7fe",
          100: "#deecfb",
          200: "#c4e0f9",
          300: "#9cccf4",
          400: "#6dafed",
          500: "#4b90e6",
          600: "#3674da",
          700: "#2d60c8",
          800: "#2a4fa3",
          900: "#274481",
          950: "#0f172a",
        },
        "big-stone": {
          50: "#f1f7fd",
          100: "#e0edf9",
          200: "#c8dff5",
          300: "#a2cbee",
          400: "#76aee4",
          500: "#5692db",
          600: "#4277ce",
          700: "#3864bd",
          800: "#33529a",
          900: "#2e477a",
          950: "#19233b",
        },
        white: {
          50: "#ffffff",
          100: "#efefef",
          200: "#dcdcdc",
          300: "#bdbdbd",
          400: "#989898",
          500: "#7c7c7c",
          600: "#656565",
          700: "#525252",
          800: "#464646",
          900: "#3d3d3d",
          950: "#292929",
        },
      },
      fontFamily: {
        montserrat: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
        iranyekan: ['"Iranyekan"', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        auto: "auto",
      },
      minWidth: {
        auto: "auto",
      },
      height: {
        1.25: "5px",
        18: "4.5rem",
      },
      dropShadow: {
        light: "0px 0px 50px rgba(0, 0, 0, 5%)",
      },
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "bounce-slow": {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(20%)" },
        },
      },
      animation: {
        gradient: "gradient 5s ease infinite",
        "spin-slow": "spin 3s linear infinite",
        "bounce-slow": "bounce 2s linear infinite",
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
      backgroundPosition: {
        "0%50%": "0% 50%",
        "100%50%": "100% 50%",
      },
    },
    minHeight: {
      auto: "auto",
      0: "0px",
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("partNative", "&::part(native)");
      addVariant("partArrow", "&::part(arrow)");
      addVariant("partBackground", "&::part(background)");
      addVariant("partText", "&::part(text)");
      addVariant("partContent", "&::part(content)");
      addVariant("partProgress", "&::part(progress)");
      addVariant("partStream", "&::part(stream)");
      addVariant("partTrack", "&::part(track)");
      addVariant("partContainer", "&::part(container)");
      addVariant("partScroll", "&::part(scroll)");
      addVariant("partSeparator", "&::part(separator)");
      addVariant("partIcon", "&::part(icon)");
      addVariant("partPlaceholder", "&::part(placeholder)");
      addVariant("partMark", "&::part(mark)");
      addVariant("partCollapsedIndicator", "&::part(collapsed-indicator)");
      addVariant("partHeader", "&::part(header)");
      addVariant("partLabel", "&::part(label)");
    }),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
          width: 0,
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          overflow: "-moz-scrollbars-none",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
