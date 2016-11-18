module.exports = {
  entry: {
    'ext': ['babel-polyfill', './src/index.js']
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};
