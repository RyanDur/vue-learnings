const path = require("path");
const base = require("./webpack.config.base");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = function (paths) {

    return merge(base(paths), {
        plugins: [
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/,
                cssProcessorOptions: {discardComments: {removeAll: true}}
            }),
            new UglifyJSPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false
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
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributese: true,
                    useShortDoctype: true
                }
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify("production")
                }
            }),
            new webpack.optimize.AggressiveMergingPlugin()
        ],
    })
};