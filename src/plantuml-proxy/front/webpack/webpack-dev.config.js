const baseConfig = require("./base.config");

module.exports = {
  ...baseConfig,
  mode: "development",
  devServer: {
    port: 8081,
    contentBase: "./dist",
    historyApiFallback: {
      index: "/"
    }
  }
};
