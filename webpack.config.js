const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //installed via npm
const webpack = require('webpack') //to access built-in plugins

module.exports = {
  mode: 'production',
  entry: ['./src/index.ts'],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },

  devtool: 'inline-source-map',
  target: 'web',

  node: {
    __dirname: false,
    __filename: false
  },

  plugins: [
    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      template: path.resolve(__dirname, 'src/index.html')
    })
  ],

  module: {
    rules: [
      {
        test: /\.(jpg|png|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.tsx?$/,
        loaders: ['ts-loader']
      }
    ]
  }
}
