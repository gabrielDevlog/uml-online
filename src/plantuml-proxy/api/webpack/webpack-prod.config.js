const baseConfig = require("./base.config");

module.exports = {
  ...baseConfig,
  mode: "development" // Do not minify as it break dependency injection
};
