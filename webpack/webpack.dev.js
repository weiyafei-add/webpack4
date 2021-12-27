const { merge } = require("webpack-merge");
const webpack = require("webpack");
// 单独的一个线程检查ts类型
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// react有状态刷新
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  devServer: {
    port: 8888,
    hot: true,
    // 为每个静态文件启动gzip 压缩
    compress: true,
    proxy: {
      // http://47.98.159.95/m-api/banner
      "/m-api": {
        target: "http://47.98.159.95",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    //   除非有定义 process.env.NODE_ENV，否则就使用 'development'
    new webpack.EnvironmentPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // 开发模式下使用fork-ts-checker-webpack-plugin进行ts类型检查
    new ForkTsCheckerWebpackPlugin(),
    // react 组件有状态刷新
    new ReactRefreshWebpackPlugin(),
  ],
});
