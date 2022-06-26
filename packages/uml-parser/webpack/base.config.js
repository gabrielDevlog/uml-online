const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [new CleanWebpackPlugin()],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "..", "dist"),
    globalObject: "this" // https://github.com/webpack/webpack/issues/6784
  }
};
