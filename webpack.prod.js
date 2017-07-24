var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');
var entries = require(__dirname+'/entries');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

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

  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['main'],
      minChunks: module => /node_modules/.test(module.resource)
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.UglifyJsPlugin()
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