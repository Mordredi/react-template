const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { CommonsChunkPlugin } = require('webpack').optimize;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: ['eslint-loader'],
        exclude: /node_modules/,
        enforce: 'pre',
      }, {
        test: /.html$/,
        use: ['html-loader'],
      }, {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      },
    ],
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
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets'),
        to: 'assets',
      },
    ]),
    new ProgressPlugin(),
  ],
};
