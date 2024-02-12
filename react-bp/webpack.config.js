const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotenvFlow = require("dotenv-flow-webpack");

module.exports = (env) => {
  return {
    mode: env.production ? "production" : "development",
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "/bundle"),
      filename: "index_bundle.js",
      publicPath: "/",
    },
    devServer: {
      // inline: true,
      port: 3000,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.(css|scss)$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      modules: ["node_modules"],
      extensions: [".*", ".js", ".jsx"],
      aliasFields: ["browser"],
      alias: {
        Components: path.resolve(__dirname, "./src/components"),
        Assets: path.resolve(__dirname, "./src/assets"),
        Config: path.resolve(__dirname, "./src/config"),
        Ducks: path.resolve(__dirname, "./src/ducks"),
        Pages: path.resolve(__dirname, "./src/pages"),
        Utilities: path.resolve(__dirname, "./src/utilities"),
        Images: path.resolve(__dirname, "./src/assets/images"),
        Constants: path.resolve(__dirname, "./src/config/constants.js"),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      new DotenvFlow({
        node_env: env.production ? "production" : "development",
      }),
    ],
  };
};
