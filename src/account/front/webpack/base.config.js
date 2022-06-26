const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DotenvPlugin = require("webpack-dotenv-extended-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.tsx",
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
    extensions: [".ts", ".js", ".tsx"]
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
      errorOnExtra: true,
      errorOnRegex: false,
      includeProcessEnv: true,
      assignToProcessEnv: true,
      overrideProcessEnv: false
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "uml plantuml proxy - front",
      template: "./src/index.html"
    })
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "..", "dist"),
    libraryTarget: "system" // front-end services are imported using systemjs
  }
};
