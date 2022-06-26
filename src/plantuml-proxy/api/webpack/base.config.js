const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DotenvPlugin = require("webpack-dotenv-extended-plugin");
const { IgnorePlugin } = require("webpack");
const WebpackWatchedGlobEntries = require("webpack-watched-glob-entries-plugin");

/**
 * Following stuff is to transpile & copy directory src/db into dist
 * So typeorm can use it for migration management
 */
const entriesFromDb = WebpackWatchedGlobEntries.getEntries([
  "./src/db/**/*.ts"
])();

const entriesForDbOutput = {};
Object.keys(entriesFromDb).forEach(key => {
  const pathInDbDirectory = "db/" + key;
  entriesForDbOutput[pathInDbDirectory] = entriesFromDb[key];
});

module.exports = {
  entry: {
    index: "./src/index.ts",
    ...entriesForDbOutput
  },
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
    new CleanWebpackPlugin(),
    // Fix build for nestJs: https://github.com/nestjs/nest/issues/1706#issuecomment-540315239
    // Also set mode to 'development' to avoid minification wich breaks dependency injection
    new IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          "@nestjs/microservices",
          "@nestjs/microservices/microservices-module",
          "@nestjs/websockets",
          "@nestjs/websockets/socket-module",
          "@nestjs/platform-express",
          "cache-manager",
          "pg-native"
        ];

        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource);
        } catch (err) {
          return true;
        }
        return false;
      }
    }),
    new WebpackWatchedGlobEntries()
  ],
  target: "node",
  // About __dirname in webpack, see https://github.com/webpack/webpack/issues/1599
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "..", "dist"),
    publicPath: path.resolve(__dirname, "..", "dist"),
    libraryTarget: "commonjs"
  }
};
