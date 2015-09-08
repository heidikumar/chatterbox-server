/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray

  // console.logs in your code.
  // request.url = "https://api.parse.com/1/classes/chatterbox/";

  console.log("Serving request type " + request.method + " for url " + request.url);


  //https://api.parse.com/1/classes/chatterbox/ <- note to self: current chatterbox server
  var statusCode = 200;
  // The outgoing status.
  //var messages = [];

  // console.log(request);
  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = "JSON";

  if (request.method === "GET"){
    var sendBackToClient;
    if (messages.hasOwnProperty(request.url)){
      statusCode = 200;
      sendBackToClient = JSON.stringify({"results":messages[request.url]});
    } else {
      statusCode = 404;
    }
      response.writeHead(statusCode, headers);
      response.end(sendBackToClient);
  } else if (request.method === "POST") {
    if (!messages.hasOwnProperty(request.url)){
      messages[request.url] = [];
    }
    statusCode = 201;
    var message = "";
    request.on('data', function(data){
      message += data.toString();
    });
    request.on('end', function(){
      // console.log(messages);
      message = JSON.parse(message);
      messages[request.url].push(message);
      // console.log(messages);
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({"results":messages[request.url]}));
    });
    
  } else if (request.method === "PUT") {
    statusCode = 201 } else if (request.method === "DELETE") {
    statusCode = 201;
  } else if (request.method === "OPTIONS") {
    statusCode = 201;
  }

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  


  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

  //will store objects that are messages (each one)
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

var messages = {
  '/classes/room1': [],
  '/classes/room': [], 
  '/classes/messages' :[],
  'http://127.0.0.1:3000/classes/messages': []
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;
