var http = require('http');

//create a server object:
http.createServer(function(request, response) {
    console.log(request);
    console.log(response);

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(request.url);

    console.log(request.url);
    console.log("Received Something");

    response.end();
}).listen(8080); // Server Object will listen on port 8080