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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'custom-blue': '0px 0px 7px 1.5px rgba(100, 149, 255, 0.59)',
      },
    },
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'tablet': '850px', // 👈 custom breakpoint
      'lg': '1024px',
      'xl': '1280px',
    },  
    fontFamily: {
        lato: ['Lato', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
  },
  plugins: [],
} satisfies Config;
