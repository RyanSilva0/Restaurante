// tailwind.config.js
module.exports = {
  content: ["./**/*.{html,js}"],

  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        home: "url('./assets/bg.png')",
      },
    },
  },

  plugins: [],
}
