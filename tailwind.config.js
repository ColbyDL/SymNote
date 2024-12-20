/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class', 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg:'976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwindcss-animated'),
  ],
  daisyui: {
    themes: ["light", "dark", "luxury", "cupcake", "synthwave", "aqua", "coffee", "valentine"],
  },
};
