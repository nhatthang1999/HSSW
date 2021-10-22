module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss')('./src/assets/css/tailwind.config.js'),
        require('autoprefixer')
      ],
    },
  },
};