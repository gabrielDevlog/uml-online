const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./base.config");

module.exports = {
  ...baseConfig,
  mode: "development",
  entry: "./demo/demo.js",
  plugins: [
    ...baseConfig.plugins,
    new HtmlWebpackPlugin({
      title: "Development",
      template: "./demo/index.html"
    })
  ],
  devServer: {
    contentBase: "./dist"
  }
};
