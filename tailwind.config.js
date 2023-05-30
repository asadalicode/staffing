/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],

  theme: {

    fontSize: {
      xs: ['8.6px', '10px'],
      sm: [ '12px', '14px' ],
      '2sm': ['15px', '23px'],
      base: '1rem',
      xl: [ '18px', '27px' ],
      '2xl': ['20px', '25px'],
      '3xl': [ '30px', '33px' ],
      '4xl': ['36px', '40px'],
      '5xl': ['42px', '48px'],
      '6xl': ['48px', '52px'],
      '7xl': [ '56px', '62px'],
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
      'sm': '567px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
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
        'xs': {'min': '375px', 'max': '567px'}
      },
      fontFamily: {
        'montserrat': [ 'Montserrat', 'sans-serif' ],
        'roboto': [ 'Roboto', 'sans-serif' ],
      },

      colors: {
        transparent: 'transparent',
        black: {
          202020: '#202020',
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
}

