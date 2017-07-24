var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');
var entries = require(__dirname+'/entries');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('prod')
};

module.exports = {
  devtool: 'source-map',
  entry: entries,
  output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: "[name]-bundle.js"
  },
  target: 'web',

  plugins: [
    new OptimizeJsPlugin({
        sourceMap: false
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin(GLOBALS),
    new UglifyJsPlugin({
        beautify: false, //prod
        output: {
          comments: false
        }, //prod
        mangle: {
          screw_ie8: true
        }, //prod
        compress: {
          screw_ie8: true,
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false // we need this for lazy v8
        }
      }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader']},
      {test: /\.(njk|nunjucks)$/,loader: 'nunjucks-loader'},
      {test: /(\.css)$/, loader: ExtractTextPlugin.extract("css-loader?sourceMap")},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.png(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=image/png'}
    ]
  }
};