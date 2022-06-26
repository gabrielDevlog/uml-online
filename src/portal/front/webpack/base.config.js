const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DotenvPlugin = require("webpack-dotenv-extended-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new DotenvPlugin({
      encoding: "utf8",
      silent: true,
      path: ".env",
      defaults: ".env.defaults",
      schema: ".env.schema",
      errorOnMissing: true,
      errorOnExtra: false,
      errorOnRegex: false,
      includeProcessEnv: true,
      assignToProcessEnv: true,
      overrideProcessEnv: false
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "uml front",
      template: "./src/index.html"
    })
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "..", "dist"),
    publicPath: "/"
  }
};
