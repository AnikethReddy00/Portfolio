/** @type {import('tailwindcss').Config} */
module.exports = {
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
      fontFamily: {
        display: ['var(--font-outfit)', 'sans-serif'],
        sans: ['var(--font-jakarta)', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tightest: '-0.06em',
      }
    },
  },
  plugins: [],
};
