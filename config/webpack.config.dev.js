const merge = require('webpack-merge');
const WriteFilePlugin = require("write-file-webpack-plugin");
const base = require("./webpack.config.base");

module.exports = function (paths) {

    return merge(base(paths), {
        output : {
            sourceMapFilename: "[file].map"
        },
        devtool: "source-map",
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