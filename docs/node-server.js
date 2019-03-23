// HTTP Server on port 8000, args[0] being the folder to serve
// node node-server.js 

var http = require('http');

var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var path = process.argv.length > 2? process.argv[2] :  "./";
var serve = serveStatic(path);


var server = http.createServer(function(req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
});

server.listen(8000);
