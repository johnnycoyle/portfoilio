var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: ['./src/index.js'],
  output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/build/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        'babel-loader'
      ],
      exclude: /node_modules/,
    },
     {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
          }
        }
      ]
    }, 
    { 
      test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader", options: {
                sourceMap: true
            }
        }, {
            loader: "sass-loader", options: {
                sourceMap: true
            }
        }]
    }, {
      test: /\.(jpg|jpeg|png)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            limit: 8192,
          }
        }
      ],
    }]
  },
};
