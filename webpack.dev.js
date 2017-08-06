const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const entryPoints = ['manifest', 'polyfills', 'vendor', 'main'];

module.exports = Merge(commonConfig, {
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      require.resolve('./src/polyfills'),
      './src/index.dev.jsx',
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      }, {
        test: /.(s?)css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[hash:8]',
          },
        }, 'sass-loader'],
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      chunksSortMode(left, right) {
        const leftIndex = entryPoints.indexOf(left.names[0]);
        const rightIndex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightIndex) {
          return 1;
        }
        if (leftIndex < rightIndex) {
          return -1;
        }
        return 0;
      }
    }),
  ],
});

