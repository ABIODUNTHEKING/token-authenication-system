/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    textColor:{
      blue: {
        1: "#93b0d5",
        
      },
      white: "#fff"
    },
    backgroundColor:{
      blue:{
        2: "#0060fe"
      }
    },
    extend: {},
  },
  plugins: [],
}

