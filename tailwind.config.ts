import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    letterSpacing: {
      // 	tightest: '-.2em',
      tighter: "-.25px",
      // 	tight: '-.33em',
      // 	normal: '0',
    },
    colors: {
      blue: {
        100: "#62bcfa",
        200: "#4661E6",
      },
      dark: {
        100: "#647196",
        200: "#3A4374",
        300: "#373F68",
      },
      gray: {
        100: "#F2F4FE",
        200: "#F7F8FD",
        300: "#F2F4FF",
        400: "#CDD2EE",
        500: "#CFD7FF",
      },

      violet: "#AD1FEA",
      orange: {
        100: "#F49F85",
        200: "#D73737",
      },
      white: "#FFFFFF",
      black: "#000000",
    },
    extend: {
      fontSize: {
        13: "0.8125rem",
        15: "0.9375rem",
        18: "1.125rem",
      },
      borderRadius: {
        5: "5px",
        10: "10px",
      },
      backgroundImage: {
        topgrad:
          "radial-gradient(166.82% 166.82% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%)",
      },
      boxShadow: {
        custom_1: "0px 10px 40px -7px rgba(55, 63, 104, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
