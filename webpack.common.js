var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var entries = require(__dirname+'/entries');

//Add Hot Reloading script
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
for(var k in entries){
  entries[k].push(hotMiddlewareScript);
}

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('local')
};

module.exports = {
  //amd?, bail?, cache?, context?, dependencies?, devServer?, devtool?, entry, externals?, loader?, module?, name?, node?, output?, performance?, plugins?, profile?, recordsInputPath?, recordsOutputPath?, recordsPath?, resolve?, resolveLoader?, stats?, target?, watch?, watchOptions?

  devtool: 'cheap-module-eval-source-map',
  entry: entries,
  target: 'web',
  stats: 'errors-only',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: "[name]-bundle.js"
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS)
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loader: 'babel-loader'},
      {test: /\.(njk|nunjucks)$/,loader: 'nunjucks-loader'},
      {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.png(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=image/png'}
    ]
  }
};