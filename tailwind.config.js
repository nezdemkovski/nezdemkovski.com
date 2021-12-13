const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        'lionandhare-light': ['LionandHare-Light'],
        'lionandhare-light-italic': ['LionandHare-LightItalic'],
        'lionandhare-regular': ['LionandHare-Regular'],
        'lionandhare-italic': ['LionandHare-Italic'],
        'lionandhare-bold': ['LionandHare-Bold'],
        'lionandhare-bold-italic': ['LionandHare-BoldItalic'],
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
