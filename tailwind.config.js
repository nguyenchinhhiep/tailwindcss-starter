const colors = require("tailwindcss/colors");
const path = require("path");

/**
 * Themes
 */
const themes = {
  // Default theme is required for theming system to work correctly
  default: {
    primary: {
      ...colors.blue,
    },
    accent: {
      ...colors.rose,
    },
    success: {
      ...colors.green,
    },
    info: {
      ...colors.sky,
    },
    warn: {
      ...colors.yellow,
    },
    danger: {
      ...colors.red,
    },
  },
};

module.exports = {
  content: ["./src/**/*.{html,scss,ts}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    require(path.resolve(__dirname, "src/tailwind/plugins/icon-size")),
    require(path.resolve(__dirname, "src/tailwind/plugins/utils")),
    require(path.resolve(__dirname, "src/tailwind/plugins/theming"))({
      themes,
    }),
  ],
  corePlugins: {},
};
