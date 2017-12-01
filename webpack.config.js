const path = require('path');
const prod = require('./config/webpack.config.prod');
const dev = require('./config/webpack.config.dev');

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    ROOT: path.resolve(__dirname, '')
};

module.exports = ({production = false, development = false}) =>
    (production ? prod : dev)(paths, {production, development});