const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash].js",
  },
  resolve: {
    extensions: [".png", ".css", "..."]
  },
  entry: ["@babel/polyfill", "./index"],
  mode: "development",
  plugins: [
    new htmlWebpackPlugin({ template: "./index.html" }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg|webp)$/i,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "./images",
            publicPath: "assets",
            name: "[name].[ext]",
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "file-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      }
    ],
  },
};
