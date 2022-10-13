/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '*.html',
    './src/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
    fontFamily: {
      'sans' : ['ScandiaWeb', 'sans-serif']
    }
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  }
}
