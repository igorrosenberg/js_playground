// HTTP Server on port 8000, args[0] being the folder to serve
// node node-server.js

const http = require('http');

const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

const path = process.argv.length > 2 ? process.argv[2] : './';
const serve = serveStatic(path);

const server = http.createServer(function (req, res) {
    const done = finalhandler(req, res);
    serve(req, res, done);
});

server.listen(8000);
