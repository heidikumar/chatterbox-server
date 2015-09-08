/* Import node's http module: */
var http = require("http");
var fs = require('fs');
var express = require('express');
var requestHandlers = require('./request-handler');



var app = express();

//app.use(express.static(path.join(__dirname, '../client')));

// app.get('/', function(req, res){
//   res.sendfile('client/index.html')
// })

// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = "127.0.0.1";
var server = app.listen(port, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
}); 

// app.get('/', function(request, response){
//   var stubby = {
//     username: "JackSparrow",
//     text: "but the rum!",
//     roomname: "lobby"
//   }
//   response.send(JSON.stringify(stubby))
// })

app.get('/', requestHandlers.getHandler);
app.post('/', requestHandlers.postHandler);
app['options']('/', requestHandlers.optionsHandler);





















 














// fs.readFile('/Users/student/Desktop/2015-08-chatterbox-server/client/client/index.html', function(err, html){

//   var request_handler = require('./request-handler');
//   var handleRequest = request_handler.requestHandler;
//   // After creating the server, we will tell it to listen on the given port and IP. */
//   var server = http.createServer(handleRequest);
//   console.log("Listening on http://" + ip + ":" + port);
//   server.listen(port, ip);  
// // })

// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.


// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.

