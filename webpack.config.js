// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = MiniCssExtractPlugin.loader;
const config = {
  entry: {
    page1: './src/main.ts',
  },
  output: {
    filename: 'board.js',
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[name].[hash].css"
    }),
  ],
  module: {
    rules: [{
      test: /\.html$/i,
      loader: 'html-loader',
      options: {
        minimize: true,
        sources: false
      }
    },
    {
      test: /.js$/i,
      use: {
        loader: 'babel-loader',
        options: {
          // 处理jsx
          presets: [
            '@babel/preset-env',
          ]
        }
      }
    },
    {
      test: /.ts$/i,
      use: {
        loader: 'babel-loader',
        options: {
          // 先处理ts,再处理jsx
          presets: [
            '@babel/preset-env',
            '@babel/preset-typescript'
          ]
        }
      }
    },
    {
      test: /\.less$/i,
      use: [
        'css-loader',
        'less-loader',
      ],
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
      type: "asset",
    },],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      '@containers': path.resolve(__dirname, './src/containers'),
      '@style': path.resolve(__dirname, './src/style'),
      '@class': path.resolve(__dirname, './src/class'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@type': path.resolve(__dirname, './src/type'),
    }
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
