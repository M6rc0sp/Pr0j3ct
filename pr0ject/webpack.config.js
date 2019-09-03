var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: {
    main: './src/index.js',
    manager: './src/components/manager/manager.js',
    login: './src/components/signin/login.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
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