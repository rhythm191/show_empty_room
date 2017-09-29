import webpack from 'webpack'

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/build/',
    publicPath: '../build/',
    filename: 'index.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query:{
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
};
