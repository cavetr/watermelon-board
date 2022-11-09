// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;
const pageNames = ['page1', 'page2'];
const config = {
  entry: {
    page1: './src/pages/page1/index.js',
    page2: './src/pages/page2/index.js'
  },
  output: {
    filename: '[name]-[chunkhash:8].js',
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    // new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['dist'] }),
    ...pageNames.map(name => (
      new HtmlWebpackPlugin({
        filename: `${name}/index.html`,
        template: `./src/pages/${name}/index.html`,
        inject: true,
        chunks: [name],
        hot: true,
      })
    )),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[name].[hash].css"
    }),
  ],
  module: {
    // hot: true,
    rules: [
      {
        test: /.(js|jsx)$/i,
        use: {
          loader: 'babel-loader',
          options: {
            // 处理jsx
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ]
          }
        }
      },
      {
        test: /.(ts|tsx)$/i,
        use: {
          loader: 'babel-loader',
          options: {
            // 先处理ts,再处理jsx
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.less$/i,
        use: [
          stylesHandler,
          "@teamsupercell/typings-for-css-modules-loader",
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: "[name]-[local]-[chunkhash:8]",
              },
            },
          },
          "postcss-loader",
          "less-loader"
        ],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      '@containers': path.resolve(__dirname, './src/containers'),
    }
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
    config.devServer = {
      hot: true, //热更新
      open: true,
      port: 2508,
      historyApiFallback: {
        rewrites: [
          {
            from: /^\/.*$/,
            to: function (context) {
              console.log(context.parsedUrl);
              console.log(context.parsedUrl.pathname.split(/(?=\/)/)[0] + '/index.html' + (context.parsedUrl.search ?? '') + (context.parsedUrl.hash ?? ''));
              return context.parsedUrl.pathname.split(/(?=\/)/)[0] + '/index.html' + (context.parsedUrl.search ?? '') + (context.parsedUrl.hash ?? '');
            }
          }
        ]
      },
    };
  }
  // console.log(config.mode);
  return config;
};
