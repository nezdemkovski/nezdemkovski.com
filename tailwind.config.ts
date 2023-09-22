import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
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
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
