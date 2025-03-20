/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
          // primary
          "primary": {
            '50': '#faf9f0',
            '100': '#f0ecd5',
            '200': '#d9d199',
            '300': '#cec07b',
            '400': '#c2ae5d',
            '500': '#b79649',
            '600': '#a17a3e',
            '700': '#875f36',
            '800': '#6f4d31',
            '900': '#5c412b',
            '950': '#342114',
        },
        
      }
    },
  },
  plugins: [],
}