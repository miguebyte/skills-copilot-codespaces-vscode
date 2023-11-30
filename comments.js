// Create web server application with Node.js
// 1. Create server
// 2. Create route
// 3. Create request handler
// 4. Start server

var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

var comments = [];

var server = http.createServer(function(request, response) {
    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;

    if (resource == '/') {
        fs.readFile('index.html', 'utf-8', function(error, data) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    } else if (resource == '/comments') {
        if (request.method == 'GET') {
            var commentList = JSON.stringify(comments);
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(commentList);
        } else if (request.method == 'POST') {
            request.on('data', function(data) {
                var comment = qs.parse(data.toString());
                comments.push(comment);
            });
            request.on('end', function() {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end('Comment added');
            });
        } else {
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end('404 Not Found');
        }
    } else {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end('404 Not Found');
    }
});

server.listen(8080, function() {
    console.log('Server is running...');
});