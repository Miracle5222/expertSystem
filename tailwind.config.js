const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Neue: ["Bebas Neue", "sans-serif"],
        Play: ["Playfair Display", "serif"],
        Mons: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
});
