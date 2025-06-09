import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#830D0F",       // text, button
        secondary: "#8E8D8E",     // accent text(dark grey) 
        light: "#F4F2F3",         // background
        muted: "#E8E2E2",         // block sections
        footer: "#F4F2F3",        // footer bg
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
} satisfies Config;
