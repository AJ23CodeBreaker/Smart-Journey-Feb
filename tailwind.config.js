/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Rubik"', '"Noto Sans HK"', '"Noto Sans SC"', 'sans-serif'],
        hand: ['"Patrick Hand"', '"Noto Sans HK"', '"Noto Sans SC"', 'cursive'],
      },
      colors: {
        brand: {
          50: '#fff0f1',
          100: '#ffe1e3',
          200: '#ffc4c9',
          300: '#ffa5ad',
          400: '#fe7a86',
          500: '#e63946', /* Deep Red - Academic & Prestigious */
          600: '#cc1f2e',
          700: '#a6121f',
          800: '#850d18',
          900: '#690812',
          950: '#4a040b',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [],
}