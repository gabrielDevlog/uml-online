const baseConfig = require("./base.config");

module.exports = {
  ...baseConfig,
  mode: "production",
  entry: "./src/index.ts",
  target: "node",
  output: {
    ...baseConfig.output,
    library: "uml-parser",
    libraryTarget: "umd"
  }
};
