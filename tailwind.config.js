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
        'lora': ['Lora', 'serif'],
        'bodoni': ['Bodoni Moda', 'serif'],
        'manrope': ['Manrope', 'sans-serif'],
      },
      colors: {
        'wedding-bg': '#F9F8F6',
        'wedding-secondary': '#F0F4F7',
        'wedding-accent': '#E1E8ED',
        'pumice': '#F9F7F2',
        'onyx': '#353935',
        'burnished-copper': '#6184C0',
        'off-white': '#FAF9F6',
      },
    },
  },
  plugins: [],
}
