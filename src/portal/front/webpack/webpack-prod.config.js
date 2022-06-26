const baseConfig = require("./base.config");

module.exports = {
  ...baseConfig,
  mode: "production",
  entry: "./src/index.ts",
  output: {
    ...baseConfig.output,
    libraryTarget: "umd",
  },
};
