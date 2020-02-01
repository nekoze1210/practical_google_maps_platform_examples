const Dotenv = require('dotenv-webpack')

const path = require('path')

const outputPath = path.resolve(__dirname, 'dist')

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    filename: 'build.js',
    path: outputPath
  },
  plugins: [new Dotenv()],
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
              configFile: '.eslintrc.js'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    inline: true,
    hot: true,
    port: 5000,
    open: true
  }
}
