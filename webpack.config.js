const webpack = require('webpack');
const path = require('path');

const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { CommonsChunkPlugin } = require('webpack').optimize;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const entryPoints = ['manifest', 'polyfills', 'vendor', 'main']

module.exports = () => ({
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      require.resolve('./src/polyfills'),
      './src/index.jsx',
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
      }, {
        test: /.css$/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
      chunks: 'main',
    }),
    new CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.NamedModulesPlugin(),
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
    new ProgressPlugin(),
  ]
})

