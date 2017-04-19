https://github.com/kevinsimper/node-1/blob/master/doc/topics/the-event-loop-timers-and-nexttick.md
https://blog.risingstack.com/node-js-at-scale-understanding-node-js-event-loop/


#Cost of mutlithreading :
Context switching , memory hogging


#Event loop


V8 has heap & stack 
V8 call stack : can do one thing at a time. it's single threaded.


Libuv has eventloop.Libuv is responsible for the non- blocking behaviour of Node.


#What is an Eventloop ?
    Eventloop keeps track if there is any callback function in the event queue to be processed.
    If there is , it pushes that function to callstack once the call stack is empty.


setTimeout vs setImmediate  vs nextTick 

process.nextTick : the call inside this is put in a callback queue and runs before exiting the current cycle.
It runs before setImmediate.
Interleaving execution of a CPU intensive task with other events
Let's say we have a task compute() which needs to run almost continuously, and does some CPU intensive calculations. 
If we wanted to also handle other events, like serving HTTP requests in the same Node process, 
we can use process.nextTick() to interleave the execution of compute() with the processing of requests this way:

var http = require('http');

function compute() {
    // performs complicated calculations continuously
    // ...
    process.nextTick(compute);
}

http.createServer(function(req, res) {
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.end('Hello World');
}).listen(5000, '127.0.0.1');

compute();
In this model, instead of calling compute() recursively, we use process.nextTick() to delay the execution of compute() till the next tick
of the event loop. By doing so, we ensure that if any other HTTP requests are queued in the event loop, they will be processed before the next time compute() gets invoked. 
If we had not used process.nextTick() and had simply called compute() recursively, the program would not have been able to process any incoming HTTP requests.
Try it for yourself!

#setTimeout 

const slowAdd = (a,b) => {

    setTimeout(()  =>{
         console.log(a+b);
         } ,0);
         
  }
  
  
  slowAdd(3,3);
  
  slowAdd(4,4);
  
  
  callstack :
     setTimeout : pop from stack , goes to node 
     settimeout : 
     slowadd
     slowadd
     anonymous 
     
  
  
  
  
  What happened? Even though V8 is single-threaded, the underlying C++ API of Node isn't. It means that whenever we call something that is a non-blocking operation, Node will call some code that will run concurrently with our javascript code under the hood. 
  Once this hiding thread receives the value it awaits for or throws an error, the provided callback will be called with the necessary parameters.
  
  #Microtasks and Macrotasks
        we actually have more then one task queue. One for microtasks and another for macrotasks.

      examples of microtasks:

      process.nextTick
      promises
      Object.observe
      examples of macrotasks:

      setTimeout
      setInterval
      setImmediate
      I/O
  
  
  
  