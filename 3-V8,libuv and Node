#V8 Feature groups :
  1)Shipping : default 
  2)Staged : can be used by --harmony flag to enable 
      ex : node --harmony -p "node".padEnd(8, '*') "
      node****
   3)In progress : node --v8-options | grep "in progress" 
   
 #Node v8 options
      node --v8-options | less
 #v8 module
 const v8 = require('v8');
 
 https://nodejs.org/api/v8.html
 
 
 #libuv 
 https://nikhilm.github.io/uvbook/basics.html
 https://github.com/libuv/libuv/releases/tag/v1.11.0
 
 is a c library used for node high performance evented I/O library.
 libuv enforces an asynchronous, event-driven style of programming. Its core job is to provide an event loop and callback based notifications of I/O and other activities. libuv offers core utilities like timers, non-blocking networking support, asynchronous file system access, child processes and more.

#Event loops

In event-driven programming, an application expresses interest in certain events and respond to them when they occur. The responsibility of gathering events from the operating system or monitoring other sources of events is handled by libuv, and the user can register callbacks to be invoked when an event occurs. The event-loop usually keeps running forever. In pseudocode:

Note :The event-loop  is provided by libuv 
while there are still events to process:
    e = get the next event
    if there is a callback associated with e:
        call the callback
Some examples of events are:

File is ready for writing
A socket has data ready to be read

#Node has http-parser written in C , c ares , Open ssl , Zlib 


# global variable 

we can make a varibale 

#util.js
global.answer = 42;

#index.js

require('./util'); // this makes answer availablea globally 

 console.log(answer);
 
 #PROCESS 
 
 events : exit , uncaughtexception , 
 
 process.on('uncaughtException' (err) => {
   // should always exit from this otherwise it won't exit this code
   // use process.exit(1) 
 })
 














# REPL 
https://nodejs.org/api/repl.html
https://www.tutorialspoint.com/nodejs/nodejs_repl_terminal.htm

const repl = require('repl');





















