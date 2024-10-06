import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      colors: {
        black: "var(--black)",
        purple: "var(--purple)",
        white: "var(--white)",
        lightGrey: "var(--lightGrey)",
        grey: "var(--grey)",
        line: "var(--line)",
        red: "var(--red)",
      },
  },
  plugins: [],
};
export default config;
