const baseConfig = require("./base.config");

module.exports = {
  ...baseConfig,
  mode: "development",
  devServer: {
    port: 8082,
    contentBase: "./dist"
  }
};
