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
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]?[hash]'
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
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            },
            extensions: ['.js']
        },
        plugins: [
            new ExtractTextPlugin('[name].css'),
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: path.join(paths.SRC, 'index.html'),
                minify: {
                    removeComments: true
                }
            })
        ]
    }
};