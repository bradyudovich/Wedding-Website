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
        'wedding-secondary': '#E9EEE6',
        'wedding-accent': '#D4DDCF',
        'pumice': '#F9F7F2',
        'onyx': '#353935',
        'burnished-copper': '#4F6650',
        'burnished-copper-hover': '#3E523F',
        'off-white': '#FAF9F6',
      },
    },
  },
  plugins: [],
}
