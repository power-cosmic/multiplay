var express = require('express'),
    morgan = require('morgan'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    port = 8080,
    serverFactory = require('./node_modules/multiplay/lib/serverFactory');


//app.use(morgan('dev'));
app.use(express.static('./public'));

var demoServer = new serverFactory('demoServer', server, {
  basePath: __dirname + '/public/scripts',
  publicPath: __dirname + '/public',
  paths: {
    serverProgram: '../../node_modules/multiplay/lib/serverProgram'
  }
});

demoServer.start();

server.listen(port);
console.log('listening on port ' + port);
