const baseConfig = require("./base.config");

module.exports = {
  ...baseConfig,
  mode: "development",
  entry: "./src/index.ts",
  devServer: {
    contentBase: "./dist",
    historyApiFallback: {
      index: "/"
    }
  }
};
