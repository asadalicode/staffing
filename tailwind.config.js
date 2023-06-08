/** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/html/utils/withMT");

import withMT  from '@material-tailwind/html/utils/withMT';
module.exports = withMT({
  content: [
    "./src/**/*.{html,ts}",
  ],

  theme: {

    fontSize: {
      xs: [ '8.69px', '11px' ],
      sm: [ '12px', '14px' ],
      'sm14': [ '14px', '17px' ],
      '2sm': [ '15px', '23px' ],
      base: '1rem',
      xl: [ '18px', '27px' ],
      '2xl': [ '20px', '25px' ],
      '3xl': [ '30px', '33px' ],
      '4xl': [ '36px', '40px' ],
      '5xl': [ '42px', '48px' ],
      '6xl': [ '48px', '52px' ],
      '7xl': [ '56px', '62px' ],
      '24': [ '24px', '29.26px' ]
    },

    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
    },

    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '770px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },


    extend: {

      screens: {
        // 'xs': {'min': '375px', 'max': '530px'}
        'xs': '530px',
        'xxs': '375px'
      },
      fontFamily: {
        'montserrat': [ 'Montserrat', 'sans-serif' ],
        'roboto': [ 'Roboto', 'sans-serif' ],
      },

      dropShadow: {
        'light': '0px 4px 12px rgba(0, 0, 0, 0.04)',
      },

      colors: {
        transparent: 'transparent',
        black: {
          202020: '#202020',
        },
        light: {
          100: '#F4F2F3',
          200: '#F0F2FA',
          201: '#F3F4F6',
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#93969E',
          600: '#F9FAFB'
        },
        primary: {
          light: '#FDEFED',
          DEFAULT: '#E2888C',
          dark: '#AA1D35',
        },
        secondary: {
          light: '#5E5E5E',
          DEFAULT: '#020202',
          dark: '#202020',
        },
        green: {
          light: '#D9FCDD',
          DEFAULT: '#15803d',
          dark: '#166534',
        }
      },
    },
  },
  plugins: [],
})

