var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpack_config = [{
  context: path.join(__dirname, 'src'),
  entry: {
    content_scripts: './content_scripts.js',
    popup: './popup.js',
    popup_style: './popup.sass'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query:{
          presets: ['es2015']
        }
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
}];


if (process.env.NODE_ENV === 'production') {
  webpack_config.each(function(config) {
    config.devtool = false
    config.plugins.push(new webpack.optimize.UglifyJsPlugin())
  });
}

module.exports = webpack_config
