/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        txtColor: '#7d8184', // You can name it whatever you like
        navColor: '#33393f', // You can name it whatever you like
        bgColor: '#282c33', // You can name it whatever you like
        btnColor: '#6c747d', // You can name it whatever you like
      },
    },
  },
  plugins: [],
  
}

