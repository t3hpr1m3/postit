'use strict';

var defer = require('config/defer').deferConfig;
var path = require('path');

exports = module.exports = {
  port: 3000,
  env: "development",
  distRoot: defer(function(cfg) {
    return path.resolve(__dirname, '..', 'dist', cfg.env);
  })
};
