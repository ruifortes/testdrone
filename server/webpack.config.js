var Path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')

console.log('NODE_ENV = ' + process.env.NODE_ENV)
const mode = process.env.NODE_ENV || 'development'

const rootPath = process.cwd()
const devRoot = Path.resolve(rootPath, '../../')

module.exports = {
  target: 'node',
  mode: mode,
  entry: {
    server: './index'
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.(jsx?|mjs)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.*', '.js', '.jsx', '.mjs', '.less'],
    modules: [
      Path.resolve('./'), //useful for less import from root
      'node_modules'
    ]
  }
}
