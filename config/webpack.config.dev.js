const merge = require('webpack-merge');
const base = require("./webpack.config.base");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function (paths) {
    return merge(base(paths), {
        output : {
            sourceMapFilename: "[file].map"
        },
        devtool: "source-map",
        module: {
            rules: [
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
                                use: [{
                                    loader: "css-loader",
                                    options: {
                                        sourceMap: true
                                    }
                                }, {
                                    loader: "sass-loader",
                                    options: {
                                        sourceMap: true
                                    }
                                }],
                                fallback: 'vue-style-loader'
                            })
                        }
                    }
                }
            ]
        },
        devServer: {
            contentBase: paths.DIST,
            port: 8080,
            quiet: false,
            noInfo: false,
            historyApiFallback: true,
            hot: true,
            stats: {
                colors: true
            }
        },
        performance: {
            hints: false
        }
    })
};