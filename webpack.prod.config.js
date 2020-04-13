'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var webpack = require('webpack');
var path = require('path');

// currently, this is for bower
var config = {
  devtool: 'sourcemap',
  entry: {
<<<<<<< HEAD
    index: './index-hooks.js'
=======
    index: './lib/index.js'
>>>>>>> c639d6321f8348a989b2d7edfd95c5c5565d43f5
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: 'build/',
    filename: 'index.js',
    sourceMapFilename: 'index.map',
    library: 'ReactNodeGraph',
    libraryTarget: 'umd'
  },
  module: {
<<<<<<< HEAD
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx']
=======
    loaders: [{
      test: /\.(js|jsx)/,
      loader: 'babel'
    }]
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.jsx']
>>>>>>> c639d6321f8348a989b2d7edfd95c5c5565d43f5
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
};

module.exports = config;
