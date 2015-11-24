var express = require('express'),
    read = require('fs').readFileSync,
    library = './node_modules/multiplay/',
    clientSource = read(require.resolve('./client.js'), 'utf-8'),
    clientUrl = '/multiplay/client.js';

require = require('amdrequire');

//var config = {};

var ServerFactory = function(amdPath, server, config) {
  require.config(config);

  var io = require('socket.io').listen(server);

  this.attachServe(server);
  var output = null;

  require([amdPath], function(Module) {

    output = new Module(io);
  });
  return output;
};

/**
 * Attach service so client's can download multiplay client.
 * Note: This is heavily based on the model used in socket.io
 * @param server {http.Server} Server to add the route to
 */
ServerFactory.prototype.attachServe = function(server) {
  var that = this;
  server.on('request', function(req, res) {
    if (req.url === clientUrl) {
      that.serve(req, res);
    }
  });
};

/**
 * Send the client the multiplay/client.js.
 * Based on what socket.io does.
 * @param req
 * @param res
 */
ServerFactory.prototype.serve = function(req, res) {
  res.setHeader('Content-Type', 'application/javascript');
  res.writeHead(200);
  res.end(clientSource);
};

module.exports = ServerFactory;
