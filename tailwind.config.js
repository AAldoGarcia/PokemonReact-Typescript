/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Esto es para que encuentre clases en los componentes 
  ],
  theme: {
    extend: {
      colors: {
        'ultraball': {
          DEFAULT: '#FFDE00', // El amarillo principal
          'accent': '#333333', // El negro para el borde o acento
        },
      },
    },
  },
  plugins: [],
}