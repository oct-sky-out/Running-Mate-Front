module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        '2xs': '7px',
      },
      width: {
        '100px': '100px',
        200: '200px',
        300: '300px',
        400: '400px',
        500: '500px',
        600: '600px',
        700: '700px',
        800: '800px',
        900: '900px',
        1000: '1000px',
      },
      height: {
        withOutHeader: 'calc(100vh - 96px)',
        '100px': '100px',
        200: '200px',
        300: '300px',
        400: '400px',
        500: '500px',
        600: '600px',
        700: '700px',
        800: '800px',
        900: '900px',
        1000: '1000px',
      },
      borderColor: (theme) => ({
        purple: '#8b8bf5',
      }),
      textColor: (theme) => ({
        purple: '#8b8bf5',
      }),
      zIndex: { 2: 2 },
    },
  },
  variants: {
    extend: { animation: ['motion-reduce'] },
  },
  plugins: [],
};
