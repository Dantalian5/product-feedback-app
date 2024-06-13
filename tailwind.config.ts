import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "before:bg-violet-200",
    "before:bg-orange-100",
    "before:bg-blue-100",
    "border-b-violet-200",
    "border-b-orange-100",
    "border-b-blue-100",
  ],
  theme: {
    fontSize: {
      4: "0.25rem",
      8: "0.5rem",
      10: "0.625rem",
      xs: "0.8125rem",
      sm: "0.875rem",
      md: "0.9375rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2.5rem",
      "4xl": "3.5rem",
    },
    letterSpacing: {
      tighter: "-.25px",
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      dark: {
        100: "#F2F4FE",
        200: "#F7F8FD",
        300: "#F2F4FF",
        400: "#CDD2EE",
        500: "#CFD7FF",
        600: "#647196", // 100
        700: "#3A4374", // 200
        800: "#373F68", // 300
      },
      blue: {
        100: "#62bcfa",
        200: "#4661E6",
      },
      violet: {
        100: "#C75AF6",
        200: "#AD1FEA",
      },
      orange: {
        100: "#F49F85",
        200: "#D73737",
      },
    },
    extend: {
      spacing: {
        smp: "max(24px, 5%)",
        lmp: "min(165px, 11.5%)",
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
