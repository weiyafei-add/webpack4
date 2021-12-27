const { merge } = require("webpack-merge");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  // 在第一个错误出现时抛出失败结果，而不是容忍它。
  mode: "production",
  output: {
    filename: "js/[name].[contenthash].js",
  },
  bail: true,
  // 优化项
  optimization: {
    // 最小化
    minimize: true,
    splitChunks: {
      /**
       * https://v4.webpack.docschina.org/plugins/split-chunks-plugin/#splitchunks-chunks
       * all：把动态和非动态模块同时进行优化打包；所有模块都扔到 vendors.bundle.js 里面。
       * initial：把非动态模块打包进 vendor，动态模块优化打包
       * async：把动态模块打包进 vendor，非动态模块保持原样（不优化）
       */
      chunks: "all",
      cacheGroups: {
        runtimeChunk: "single",
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
        },
        /**
         * 将react和react-dom包，打包为：react-vendor.chunk.js
         */
        reactVendors: {
          name: "react-vendor",
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          chunks: "all",
        },
      },
    },
    minimizer: [
      // 压缩js
      new TerserPlugin(),
      // 压缩css
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
    }),
    //   清楚上次打包后的文件
    new CleanWebpackPlugin(),
  ],
});
