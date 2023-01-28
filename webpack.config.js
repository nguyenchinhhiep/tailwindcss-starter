const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const pug = {
//   test: /\.pug$/,
//   use: ["pug-loader"],
// };

const scss = {
  test: /\.s[ac]ss$/i,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        sourceMap: true,
      },
    },
    {
      loader: "postcss-loader",
      options: {
        sourceMap: true,
      },
    },
    {
      loader: "sass-loader",
      options: {
        sourceMap: true,
      },
    },
  ],
};

const images = {
  test: /\.(png|svg|jpg|gif)$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        outputPath: "images/",
        publicPath: "images/",
      },
    },
  ],
};

const fonts = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        outputPath: "fonts/",
        publicPath: "fonts/",
      },
    },
  ],
};

const js = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
    },
  },
};

module.exports = {
  entry: [
    "babel-polyfill",
    "./src/js/index.js",
    "./src/styles/__styles-dir.scss",
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [js, scss, images, fonts],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "./dist"),
    },
  },
  mode: 'development'
};
