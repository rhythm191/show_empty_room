webpack = require('webpack')

webpack_config = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/build/',
    filename: 'index.js'
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
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: []
};


if (process.env.NODE_ENV === 'production') {
  webpack_config.devtool = false;
  webpack_config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = webpack_config
