/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./client/pages/**/*.html', './client/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily:{
        'montserrat': ['Montserrat Alternates', 'sans-serif']
      },
      colors: {
        google: {
          'text-gray': '#3c4043',
          'button-blue': '#1a73e8',
          'button-blue-hover': '#5195ee',
          'button-dark': '#202124',
          'button-dark-hover': '#555658',
          'button-border-light': '#dadce0',
          'logo-blue': '#4285f4',
          'logo-green': '#34a853',
          'logo-yellow': '#fbbc05',
          'logo-red': '#ea4335',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("@designbycode/tailwindcss-text-stroke"),
    require('@tailwindcss/aspect-ratio')
  ],
};




