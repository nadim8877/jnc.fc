/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./admin.html",
    "./app.js",
    "./admin.js",
  ],
  theme: {
    extend: {
      colors: {
        'indigo': {
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        scaleIn: 'scaleIn 0.5s ease-out',
        fadeInUp: 'fadeInUp 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}