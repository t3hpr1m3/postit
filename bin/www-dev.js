'use strict'

var config = require('config'),
    path = require('path'),
    serverConfig = require('../webpack/server'),
    clientConfig = require('../webpack/client'),
    webpack = require('webpack'),
    webpackMiddleware = require('webpack-dev-middleware');

// Shamelessly borrowed from http://www.reactjunkie.com/universal-hot-reload/
function watchServerChanges(serverPath) {
  var httpServerObject = null;
  var serverCompiler = webpack(serverConfig);
  var clientCompiler = webpack(clientConfig);

  var devMiddleware = webpackMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: { colors: true },
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    }
  });

  return serverCompiler.watch({}, function onServerChange(err, stats) {
    if (err) {
      console.log('Server bundling error: ', JSON.stringify(err));
      return;
    }

    clearCache(serverPath);

    if (httpServerObject === null) {
      httpServerObject = initHttpServer(serverPath, devMiddleware);
    } else {
      httpServerObject.httpServer.close(function() {
        httpServerObject = initHttpServer(serverPath, devMiddleware);
        console.log('Server restarted ' + new Date());
      });

      var ids = Object.keys(httpServerObject.sockets);
      for (var i = 0; i < ids.length; i++) {
        httpServerObject.sockets[ids[i]].destroy();
      }
    }
  });
}

function clearCache(serverPath) {
  var cacheIds = Object.keys(require.cache);
  for (var i = 0; i < cacheIds.length; i++) {
    if (cacheIds[i] === serverPath) {
      delete require.cache[cacheIds[i]];
      return;
    }
  }
}

function initHttpServer(serverPath, middleware) {
  try {
    var createServer = require(serverPath).default;
    var server = createServer(middleware).server;

  } catch (ex) {
    console.log('an error occurred during reload: ', ex);
    return null;
  }
  var sockets = {};

  var nextSocketId = 0;

  server.on('connection', function(socket) {
    var socketId = nextSocketId++;
    sockets[socketId] = socket;

    socket.on('close', function() {
      delete sockets[socketId];
    });
  });

  return { httpServer: server, sockets: sockets };
}

exports = module.exports = function(serverDistPath) {
  return watchServerChanges(serverDistPath);
};
