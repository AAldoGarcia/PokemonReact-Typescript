/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Esto es para que encuentre clases en tus componentes React/TS
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}