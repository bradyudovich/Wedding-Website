/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      colors: {
        'wedding-bg': '#F9F8F6',
        'wedding-secondary': '#F0F4F7',
        'wedding-accent': '#E1E8ED',
      },
    },
  },
  plugins: [],
}
