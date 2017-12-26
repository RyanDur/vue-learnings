const path = require("path");
const base = require("./webpack.config.base");
const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (paths, env) => merge(base(paths, env), {
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessorOptions: {discardComments: {removeAll: true}}
    }),
    new webpack.optimize.UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          sequences: true,
          booleans: true,
          loops: true,
          unused: true,
          warnings: false,
          drop_console: true,
          unsafe: true
        },
        include: /\.js$/
      },
      extractComments: true,
      sourceMap: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
      cache: false,
      minify: {
        html5: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        removeComments: true,
        useShortDoctype: true
      },
      xhtml: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
});