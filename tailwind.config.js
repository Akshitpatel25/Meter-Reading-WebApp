/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/public/meter-reading-management-1.png')",
      },
      screens: {
        'max-450': {'max': '450px'},
      },
      colors: {
        customcol1: '#303030',
      },
    },
  },
  plugins: [],
}