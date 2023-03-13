const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        'lionandhare-bold': ['var(--font-lionandhare-bold)'],
        'lionandhare-bold-italic': ['var(--font-lionandhare-bold-italic)'],
      },
      colors: {
        woodsmoke: '#14161B',
        whisper: '#F1EDF7',
        'mulled-wine': '#4D3D57',
      },
      typography: {
        DEFAULT: {
          css: {
            strong: { color: 'unset' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
