import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        "noto-sans": ["Noto-Sans", "sans-serif"],
      },
      animation: {
        "spin-extraSlow": "spin 15s linear infinite",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["black", "night", "forest"],
  },
};
export default config;
