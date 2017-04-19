Resources : 
  1) philip robert's video
  2) Learn and understand node.js


#callback pattern

        function greet(callback) {
          console.log('Hello!');
          var data = {
            name: 'John Doe'
          };

          callback(data);
        }

        greet(function(data) {
          console.log('The callback was invoked!');
          console.log(data);
        });

        greet(function(data) {
          console.log('A different callback was invoked!');
          console.log(data.name);
        });
        
 #fs.readFile(file[, options], callback) 
   options <string> | <Object>
 ex : fs.readFile = function(path, options, callback) {
 
    Asynchronously reads the entire contents of a file.
 
         var greet2 = fs.readFile(__dirname + '/greet.txt', 'utf8', function(err, data) {
          console.log(data);
        });

#If no encoding is specified, then the raw buffer is returned.

# fs.readFileSync(file[, options])

# inside fs.readFile call
      function ReadFileContext(callback, encoding) {
        this.fd = undefined;
        this.isUserFd = undefined;
        this.size = undefined;
        this.callback = callback;
        this.buffers = null;
        this.buffer = null;
        this.pos = 0;
        this.encoding = encoding;
        this.err = null;
      }

 
 
 #fs.appendFile(file, data[, options], callback)
 
 
 Asynchronously append data to a file, creating the file if it does not yet exist. data can be a string or a buffer.
   ex : fs.appendFile('message.txt', 'data to append', (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
      
 #fs.stat(path, callback)
 
 
Using fs.stat() to check for the existence of a file before calling fs.open(), fs.readFile() or fs.writeFile() is not recommended. Instead, user code should open/read/write the file directly and handle the error raised if the file is not available.

To check if a file exists without manipulating it afterwards, fs.access() is recommended


 
 
 
 
 
 
 
 
 
 
 
 







#RAM is fastest , Disk next then Network 


#libuv is used for io 

