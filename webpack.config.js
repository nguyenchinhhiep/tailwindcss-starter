const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let production = process.env.NODE_ENV === "production";

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
        postcssOptions: {
          plugins: [["postcss-preset-env", {}]],
        },
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
  test: /\.(png|svg|jpg|jpeg|gif)$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name][ext]",
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

const ts = {
  test: /\.ts$/,
  exclude: /node_modules/,
  use: {
    loader: "ts-loader",
  },
};

const imageAssets = {
  test: /\.(png|svg|jpg|jpeg|gif)$/,
  type: "asset/resource",
  generator: {
    filename: "images/[name][ext]",
  },
};

const config = {
  entry: [
    // "babel-polyfill",
    "./src/ts/index.ts",
    "./src/styles/__styles-dir.scss",
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [ts, scss, images, fonts],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "./dist"),
    },
  },
  mode: "development",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".js"],
  },
};

if (production) {
  config.mode = "production";
  config.devtool = "inline-source-map";
}

module.exports = config;
