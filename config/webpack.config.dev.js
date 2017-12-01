const merge = require('webpack-merge');
const base = require("./webpack.config.base");

module.exports = (paths, env) =>
    merge(base(paths, env), {
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
            hot: true,
            stats: {
                colors: true
            }
        },
        performance: {
            hints: false
        }
    });