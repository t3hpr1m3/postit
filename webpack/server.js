'use strict'

var config = require('config');
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./base');

function nodeModules() {
  return fs.readdirSync(path.resolve(__dirname, '..', 'node_modules'))
    .filter(function(x) {
      return ['bin'].indexOf(x) === -1
    })
    .concat([
      'react-dom/server'
    ])
    .reduce(function(ext, mod) {
      ext[mod] = 'commonjs ' + mod
      return ext
    }, {});
}

var serverConfig = {
  entry: [
    'babel-polyfill',
    path.join(baseConfig.sourceRoot, 'server', 'index.js')
  ],
  output: {
    path: path.join(baseConfig.outputRoot, 'server'),
    filename: 'app.js'
  },
  devtool: baseConfig.devtool,
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  externals: nodeModules(),
  plugins: baseConfig.plugins(),
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

if (config.get('env') === 'development') {
  serverConfig.output.libraryTarget = 'commonjs2';
}

exports = module.exports = serverConfig;
