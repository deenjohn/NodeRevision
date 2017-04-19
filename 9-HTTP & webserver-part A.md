# http parser
 is a c file that parse the http request and responses.
 
 # http.js use 
  # _http_server.js 
      which wraps the http_parser
           https://nodejs.org/api/http.html#http_class_http_server

           #const HTTPParser = process.binding('http_parser').HTTPParser;
           
          #function writeHead(statusCode, reason, obj) {

            ex : res.writeHead(200, {'Content-Type': 'text/plain'}
  
   
   #_http_server.js has , ServerResponse.prototype.writeHead 
  
     has statusLine
  
  
  #_http_server.js 
  has events like :
   1)clientError
   2)close : Emitted when the server closes.
   3) connect 
   4) connection : When a new TCP stream is established
  
  #http.js
 function createServer(requestListener) {  
  return new Server(requestListener);
}
ex : http.createServer(cb)
When this server emit an event : server.emit('request', req, res) , the callback is passed 2 params req,res and this callback runs.

reference :
    myEmitter.on('event', function(a, b) {
      console.log(a, b, this);
      // Prints:
      //   a b MyEmitter {
      //     domain: null,
      //     _events: { event: [Function] },
      //     _eventsCount: 1,
      //     _maxListeners: undefined }
    });
    myEmitter.emit('event', 'a', 'b');
    
   http parser wrapped inside javascript code will give me back req,res object  
    
  
