/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {},
    fontFamily: {
      'title': ['Anton'],
      'content': ['Manrope'],
    }, 
    colors: {
      'yellow1': '#FFD15B',
      'black1' : '#1b1b1b',
      'white' : '#ffffff',
      'grey1' : '#ededed',
      'grey2' : '#7a7a7a',
    }
  },
  plugins: [],
}