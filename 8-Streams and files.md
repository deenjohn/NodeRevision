Reference : ch5 , Node.js Design patterns 2nd ed

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

................................
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
 ex : 
       var readStream = fs.createReadStream('./a.png')
        .on('open' , function(){

          console.log("open !!")

        })
        .on('end' , function(){
          readStream.close();
          console.log("finished !!")
        })
        .on('data' , function(chunk){
         console.log(chunk)
        });
 
 
 .............................
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


#pipe or 'data' event can change the mode from "resume" to "flow"


      var JSONStream = require('JSONStream');
      var readStream = fs.createReadStream('myfile.json');
      var parseStream = JSONStream.parse('rows.*.doc');
      parseStream.on('data', function (doc) {
        db.insert(doc); // pseudo-code for inserting doc into a pretend database.
      });
      readStream.pipe(parseStream);
     
     That's the verbose way to help you understand what's happening. Here is a more succinct way:

      var JSONStream = require('JSONStream');
      fs.createReadStream('myfile.json')
        .pipe(JSONStream.parse('rows.*.doc'))
        .on('data', function (doc) {
          db.insert(doc);
        });


#the writable stream is ended automatically when the readable stream emits an end event (unless we specify
{end: false} as options).

#Piping two streams together will create a suction which allows the data to flow
automatically to the writable stream, so there is no need to call read() or write();

#TRANSFORM stream
ReplaceStream is a transform stream

const ReplaceStream = require('./replaceStream');
process.stdin
.pipe(new ReplaceStream(process.argv[2], process.argv[3]))
.pipe(process.stdout);

The preceding program pipes the data that comes from the standard input into a
ReplaceStream and then back to the standard output. Now, to try this small application,
we can leverage a Unix pipe to redirect some data into its standard input, as shown in the
following example:
echo Hello World! | node replace World Node.js

This should produce the following output:
Hello Node.js


  
