const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (paths, {development = false}) => {
  return {
    entry: ['babel-polyfill', path.join(paths.SRC, 'main.js')],
    output: {
      path: paths.DIST,
      filename: '[name].js',
      publicPath: ''
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
            presets: [['@babel/preset-env', {
              "targets": {
                "node": "current"
              }
            }]]
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
                use: [{
                  loader: 'css-loader',
                  options: {
                    sourceMap: development
                  }
                }, {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: development
                  }
                }],
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
      new CleanWebpackPlugin(['dist'], {root: paths.ROOT})
    ]
  }
};