#process

process.argv  : The process.argv property returns an array containing the command line arguments passed when the Node.js process was launched. The first element will be process.execPath .The second element will be the path to the JavaScript file being executed.
The remaining elements will be any additional command line arguments.

#YARGs - library for parsing arguments 
var argv = require('yargs').argv;



#Listener functions must only perform synchronous operations. The Node.js process will exit immediately after calling the 'exit' event listeners causing any additional work still queued in the event loop to be abandoned. In the following example, for instance, the timeout will never occur:

process.on('exit', (code) => {
  setTimeout(() => {
    console.log('This will not run');
  }, 0);
});
