'use strict'

//
// We'll run both configs in parallel
//
var clientConfig = require('./webpack/client'),
    serverConfig = require('./webpack/server');

exports = module.exports = [serverConfig, clientConfig]
