const path = require("path");
const base = require("./webpack.config.base");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = (paths, env) =>
    merge(base(paths, env), {
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
                    decodeEntities: true,
                    keepClosingSlash: true,
                    quoteCharacter: '"',
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributese: true,
                    removeOptionalTags: true,
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
        ],
        performance: {
            hints: "warning"
        }
    });