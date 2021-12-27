const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const styleLoaders = (env) => {
  const pro = env === "production";
  const dev = env === "development";

  return [
    dev && "style-loader", // 开发模式下建议使用style-loader,
    // 生产模式下使用MiniCssExtractPlugin,
    pro && {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: (resourcePath, context) => {
          console.log(resourcePath, context);
          return path.relative(path.dirname(resourcePath), context) + "/";
        },
      },
    },
    {
      loader: "css-loader",
      options: {
        sourceMap: true,
        modules: false,
      },
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [["postcss-preset-env"]],
        },
      },
    },
  ];
};

module.exports = { styleLoaders };
