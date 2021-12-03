module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      height: { withOutHeader: 'calc(100vh - 96px)' },
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
