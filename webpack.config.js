const webpack = require('webpack');
const path = require('path');

const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { CommonsChunkPlugin } = require('webpack').optimize;

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
  entry: {
    polyfills: require('./src/polyfills'),
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/index.js'
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
  output: {
    fileName: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: ['eslint-loader'],
        exclude: /node_modules/, 
        enforce: 'pre',
      }, {
        test: /.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/, 
      }, {
        test: /.html$/,
        use: ['html-loader'],
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
      chunks: 'main',
    }),
    new webpack({
      name: 'manifest'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
  ]
})
