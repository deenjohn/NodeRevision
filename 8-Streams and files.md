

#What is a stream 
  Data moving


#Stream
What is a stream ?
Data flow.Use memory effeciently.

#Files :

require('fs');
#readFile : If no encoding is specified, then the raw buffer is returned.

#fs.appendFile(file, data[, options], callback)
    options <Object> | <string>
    encoding <string> | <null> default = 'utf8'
    mode <integer> default = 0o666
    flag <string> default = 'a'

Asynchronously append data to a file, creating the file if it does not yet exist. data can be a string or a buffer.

Events on Readable Stream: close , open,error,data, readable
Events on Writable Stream : close , drain, finish,pipe ,unpipe

#fs.createReadStream(path[, options])
     is a : 
      function(path, options) {
        return new ReadStream(path, options);
      };
      
    options <string> | <Object>
    flags <string>
    encoding <string>
    fd <integer>
    mode <integer>
    autoClose <boolean>
    start <integer>
    end <integer>
 
 ex : { encoding: 'utf8', highWaterMark: 16 * 1024 }
 
Asynchronous

#fs.writeFile(file, data[, options], callback)
Event : close , open ,data
Asynchronously writes data to a file, replacing the file if it already exists. data can be a string or a buffer.

ex : fs.writeFile('message.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

"Hello Node.js"  is the data written to file


#readFile vs readStream

http://stackoverflow.com/questions/4589732/what-are-the-pros-and-cons-of-fs-createreadstream-vs-fs-readfile-in-node-js


#eventNames()
Since readFile and readStream inherit from EventEmitter , we can use method .eventNames()


#pipe change the mode from "resume" to "flow"
























 
 
 
    
