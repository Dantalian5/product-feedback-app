import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // letterSpacing: {
    // 	tightest: '-.2em',
    // 	tighter: '-.25em',
    // 	tight: '-.33em',
    // 	normal: '0',
    // },
    extend: {
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
        },

        violet: "#AD1FEA",
        orange: {
          100: "#F49F85",
          200: "#D73737",
        },
        white: "#FFFFFF",
      },
      backgroundImage: {
        topgrad:
          "radial-gradient(166.82% 166.82% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
