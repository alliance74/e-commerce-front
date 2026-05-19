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
        peach: '#F2C4A0',
        'peach-light': '#FAF7F2',
        orange: '#D4621A',
        'orange-light': '#F0874A',
        espresso: '#1C1009',
        'warm-gray': '#8C7B6E',
        cream: '#FDF8F3',
        gold: '#C9A84C',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        ui: ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
