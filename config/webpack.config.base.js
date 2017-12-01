const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function (paths) {
    return {
        entry: path.join(paths.SRC, 'main.js'),
        output: {
            path: paths.DIST,
            filename: "[name].js",
            publicPath: ""
        },
        module: {
            rules: [
                {
                    test: /.*\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {enabled: false},
                                optipng: {enabled: false},
                                gifsicle: {enabled: false},
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4
                                },
                                svgo: {
                                    plugins: [
                                        {removeTitle: true},
                                        {convertColors: {shorthex: true}},
                                        {convertPathData: true}
                                    ]
                                },
                                webp: {quality: 75}
                            },
                        },
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name]-[hash].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            ]
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            },
            extensions: ['.js']
        },
        plugins: [
            new CleanWebpackPlugin(['dist'], {root: paths.ROOT}),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: path.join(paths.SRC, 'index.html'),
                minify: {
                    removeComments: true
                }
            }),
            new ExtractTextPlugin('[name].css')
        ]
    }
};