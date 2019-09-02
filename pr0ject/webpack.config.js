var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: "bundle.js"
  },
  mode: 'production',
  module: {
    rules : [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },{
        test: /\.css$/,
        use: ['css-loader'],
      },
      {
        test: /\.(svg|gif|png|jpe?g)$/,
        loader: 'url-loader',
        options: {
          limit: 100,
          fallback: 'file-loader',
          publicPath: '/img',
          outputPath: '/img',
        },
      },
    ]
  },
};