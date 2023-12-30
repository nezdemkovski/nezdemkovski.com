import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        iawriterquattro: ['var(--font-iawriterquattro)'],
        unbounded: ['var(--font-unbounded)'],
      },
      colors: {
        woodsmoke: '#14161B',
        whisper: '#F1EDF7',
        'mulled-wine': '#4D3D57',
      },
      typography: {},
    },
    screens: {
      sm: '43rem',
      md: '50rem',
      lg: '65rem',
      xl: '80rem',
      '2xl': '96rem',
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
} satisfies Config;
