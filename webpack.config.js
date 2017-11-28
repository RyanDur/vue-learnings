const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
};

module.exports = {
    entry: path.join(paths.SRC, 'main.js'),
    output: {
        path: paths.DIST,
        filename: '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('[name].css'),
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
            sourceMap: true
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
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    module: {
        rules: [
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                enabled: false
                            },
                            optipng: {
                                enabled: false
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                enabled: false
                            },
                            svgo: {
                                plugins: [
                                    {removeTitle: true},
                                    {convertColors: {shorthex: false}},
                                    {convertPathData: false}
                                ]
                            },
                            webp: {
                                quality: 75
                            }
                        },
                    },
                    'file-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    postcss: [
                        require('postcss-cssnext')({
                            browsers: ['last 2 versions', 'ie >= 9'],
                            compress: true
                        })
                    ],
                    loaders: {
                        scss: ExtractTextPlugin.extract({
                            use: 'css-loader!sass-loader',
                            fallback: 'vue-style-loader'
                        }),
                        sass: ExtractTextPlugin.extract({
                            use: 'css-loader!sass-loader?indentedSyntax',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: paths.DIST,
        compress: true
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
};