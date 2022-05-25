const path = require("path")
const webpack = require("webpack")
const TerserPlugin = require("terser-webpack-plugin")
const { getBanner } = require("./src/meta")
// const { TampermonkeyWritePlugin } = require("./plugins")

module.exports = (env) => {
  console.log(env)
  return {
    mode: env.production ? "production" : "development",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: env.production ? "prod.js" : "dev.js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|mjs)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    corejs: {
                      version: 3,
                    },
                    useBuiltIns: "usage",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
          include: [path.resolve(__dirname, "src")],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
          include: /node_modules/,
        },
        {
          test: /\.less$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: 4,
          terserOptions: {
            output: {
              comments:
                /==\/?UserScript==|^[ ]?@|eslint-disable|spell-checker/i,
            },
            compress: {
              warnings: true,
              drop_debugger: true,
              drop_console: true,
            },
          },
          extractComments: false,
        }),
      ],
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    // devtool: env.production ? false : "source-map",
    plugins: [
      new webpack.BannerPlugin({
        banner: getBanner(env.production),
        raw: true,
        entryOnly: true,
      }),
      ...(env.production
        ? []
        : [
            // new TampermonkeyWritePlugin({
            //   banner: getBanner(env.production),
            // }),
          ]),
    ],
    devServer: {
      hot: true,
      compress: true,
      open: true,
      static: {
        directory: path.join(__dirname, "dist"),
      },
    },
  }
}
