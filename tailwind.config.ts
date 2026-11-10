import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Growth Garden Aesthetic
        primary: {
          green: {
            DEFAULT: "#4CAF50",
            light: "#66BB6A",
          },
        },
        earth: {
          DEFAULT: "#8D6E63",
          light: "#A1887F",
        },
        warm: {
          DEFAULT: "#FFB74D",
          light: "#FFA726",
        },
        background: {
          DEFAULT: "#F5F5F5",
          light: "#FAFAFA",
        },
        text: {
          DEFAULT: "#424242",
          light: "#616161",
        },
        // NS design system neutrals
        iron: {
          25: "#FCFBFC",
          50: "#F9F9F9",
          100: "#F4F4F5",
          200: "#E4E4E7",
          300: "#D1D1D6",
          400: "#A0A0AB",
          500: "#70707B",
          600: "#51525C",
          700: "#3F3F46",
          800: "#26272B",
          900: "#1A1A1E",
        },
      },
      boxShadow: {
        skeuomorphic:
          "0px -4px 0px 0px rgba(0, 0, 0, .30) inset, 0px 2px 0px 0px rgba(255, 255, 255, .12) inset",
        "skeuomorphic-xs":
          "0px 1px 2px 0px rgba(10, 13, 18, 0.05), 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset",
      },
      fontFamily: {
        heading: ["Nunito", "Poppins", "sans-serif"],
        body: ["Inter", "Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

