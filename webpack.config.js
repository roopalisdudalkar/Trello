var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
    loaders: [{
      test: /\.html$/,
      loader: 'file-loader?name=[name].[ext]',
    }]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ],
  resolve: {
    extensions: ['.js', '.es6']
  }
};