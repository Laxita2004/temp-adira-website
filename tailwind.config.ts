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
        primary: "#7A0309",       // text, button
        secondary: "#8E8D8E",     // accent text(dark grey) 
        light: "#F7F1EE",         // background
        muted: "#EFE6E2",         // block sections
        footer: "#F7F1EE",        // footer bg
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/aspect-ratio'),
  ],
  
} satisfies Config;
