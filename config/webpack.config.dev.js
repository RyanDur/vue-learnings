const path = require('path');
const merge = require('webpack-merge');
const base = require("./webpack.config.base");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (paths, env) => merge(base(paths, env), {
  output: {
    sourceMapFilename: "[file].map"
  },
  devtool: "source-map",
  devServer: {
    contentBase: paths.DIST,
    port: 8080,
    quiet: false,
    noInfo: false,
    historyApiFallback: true,
    hot: false,
    stats: {
      colors: true
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(paths.SRC, 'index.html'),
      minify: {
        removeComments: true
      }
    })
  ]
});