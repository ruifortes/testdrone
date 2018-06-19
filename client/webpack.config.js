var Path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')

console.log('NODE_ENV = ' + process.env.NODE_ENV)
const mode = process.env.NODE_ENV || 'development'

const rootPath = process.cwd()
const devRoot = Path.resolve(rootPath, '../../')

module.exports = {
  target: 'web',
  mode: mode,
  entry: {
    client: './index'
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
      },
      // { test: /\.css$/,
      //   // loader: ExtractTextPlugin.extract('style', 'css?modules&sourcemap!postcss-loader'),
      //   loader: ExtractTextPlugin.extract('style', 'css?modules&sourcemap'),
      // },
      // { test: /\.module.less/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: 'css-loader?modules&sourcemap!less-loader?sourceMap'
      //   })
      //   // loader: ExtractTextPlugin.extract('style', 'css?modules&sourcemap!less-loader?sourceMap')
      // },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }
    ]
  },
  externals: { //key = pacjage name, value = global var name
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    extensions: ['.*', '.js', '.jsx', '.mjs', '.less'],
    modules: [
      Path.resolve('./'), //useful for less import from root
      'node_modules'
    ],
    // alias: {
    //   'common': devRoot + '/WIP/common',
    //   'handlebars': 'handlebars/dist/handlebars.min.js'
    // },
  },
  plugins: [
    // myDonePlugin,
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      title: 'Drone test',
      appMountId: 'root',
      template: './template.ejs'
    }),
    new FaviconsWebpackPlugin({
      logo: './logo.png',
      inject: true,
    })
  ]
}
