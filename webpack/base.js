'use strict'

var config = require('config');
var path = require('path');
var webpack = require('webpack');

var baseConfig = {
  sourceRoot: path.resolve(__dirname, '..', 'src'),
  outputRoot: path.resolve(__dirname, '..', 'dist', config.get('env')),
  devtool: config.get('env') === 'development' ? '#cheap-module-source-map' : false,
  plugins: function() {
    return [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(config.get('env'))
        }
      })
    ];
  }
};

exports = module.exports = baseConfig;
