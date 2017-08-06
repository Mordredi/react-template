const Merge = require('webpack-merge');
const prodConfig = require('./webpack.prod');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = Merge(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});

