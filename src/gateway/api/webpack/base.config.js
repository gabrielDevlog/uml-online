const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DotenvPlugin = require("webpack-dotenv-extended-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
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
    new CleanWebpackPlugin()
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "..", "dist")
  }
};
