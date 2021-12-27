const path = require("path");
const svgToMiniDataURI = require("mini-svg-data-uri");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const loaders = require("./styleLoader");

const dev = process.env.NODE_ENV === "development";
const pro = process.env.NODE_ENV === "production";

const styleLoaders = loaders.styleLoaders(process.env.NODE_ENV);

module.exports = {
  mode: "development",

  entry: {
    main: path.resolve(__dirname, "../src/index.tsx"),
  },

  devtool: "source-map",

  output: {
    //filename 指列在 entry 中，打包后输出的文件的名称。
    filename: "js/[name].js",
    // chunkFilename 指未列在 entry 中，却又需要被打包出来的文件的名称。
    chunkFilename: "js/[name].chunk.js",
    //将你的 library 暴露为所有的模块定义下都可运行的方式。它将在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量。
    libraryTarget: "umd",
    // 输出目录
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },

  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      // url-loader已经集成了file-loader的功能
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "url-loader",
        options: {
          limit: 8192,
          outputPath: "assets/images",
          name: "[name].[ext]",
        },
      },
      {
        test: /\.mp3$/i,
        loader: "file-loader",
      },
      //   SVG 可以被压缩至体积更小，尽量避免使用 base64
      {
        test: /\.svg$/i,
        loader: "url-loader",
        options: {
          generator: (content) => svgToMiniDataURI(content.toString()),
        },
      },
      //   加载字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader",
      },
      // ts, tsx,
      {
        // babel-loader来处理js兼容性
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              // babel预设
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: ["last 2 version", "> 1%"],
                    // usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加
                    useBuiltIns: "usage",
                    // 指定corejs的版本
                    corejs: "3",
                  },
                ],
              ],
              // babel插件
              plugins: [
                [
                  "import",
                  {
                    libraryName: "antd",
                    // 默认值 lib，为「lib」会导致vendors~main.js打包过大，改为「es」则符合预期
                    libraryDirectory: "es",
                    // style: true 会加载 less 文件
                    style: "css",
                  },
                ],
                // 添加svg可作为react组件使用的插件
                [
                  require.resolve("babel-plugin-named-asset-import"),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          "@svgr/webpack?-svgo,+titleProp,+ref![path]",
                      },
                    },
                  },
                ],
                "@babel/plugin-transform-runtime",
                dev && "react-refresh/babel",
              ].filter(Boolean),
            },
          },
          {
            loader: "ts-loader",
            options: {
              // 关闭类型检测，由fork-ts-checker-webpack-plugin完成
              transpileOnly: true,
            },
          },
        ],
      },
      // css
      {
        test: /\.css$/i,
        use: [...styleLoaders].filter(Boolean),
      },
      // scss
      {
        test: /\.scss$/i,
        use: [...styleLoaders, "sass-loader"].filter(Boolean),
      },
      // less
      {
        test: /\.less$/i,
        use: [
          ...styleLoaders,
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
            },
          },
        ].filter(Boolean),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    /**
     * mini-css-extract-plugin：将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
     * https://v4.webpack.docschina.org/plugins/mini-css-extract-plugin/
     */
    pro &&
      new MiniCssExtractPlugin({
        /**
         * 类似于 webpackOptions.output 中的选项
         * 所有选项都是可选的
         * 使用 filename: "[contenthash].css" 启动长期缓存。根据需要添加 [name]。
         */
        filename: pro ? "css/[name].[contenthash].css" : "css/[name].css",
        chunkFilename: pro ? "css/[id].[contenthash].css" : "css/[id].css",
      }),
  ].filter(Boolean),
};
