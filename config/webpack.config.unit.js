module.exports = {
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
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js']
  }
};