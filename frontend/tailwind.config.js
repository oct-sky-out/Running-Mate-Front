module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    borderColor: (theme) => ({
      purple: '#8b8bf5',
    }),
    textColor: (theme) => ({
      purple: '#8b8bf5',
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
