https://medium.freecodecamp.org/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8

When Node invokes that require() function with a local file path as the function’s only argument, Node goes through the following sequence of steps:

* Resolving: To find the absolute path of the file.
* Loading: To determine the type of the file content.
* Wrapping: To give the file its private scope. This is what makes both the require and module objects local to every file we require.
* Evaluating: This is what the VM eventually does with the loaded code.
* Caching: So that when we require this file again, we don’t go over all the steps another time.

# inside ""greet" folder there are 3 files : english.js , spanish.js , index.js

   ## english.js 
   
 ```javascript
var greet = function() {
  console.log("hello");
}; //

```
      
  
 ## spanish.js
   
   ```javascript
   
var greet = function() {
	console.log("hola");
}

```



   ## index.js
   
   ```javascript
   
   var english = require('./english');
    var spanish = require('./spanish');

    console.log("index file");

    module.exports = {
	english: english,
	spanish: spanish	
    };

```
     
....................................

## app.js.

```javascript
var greet = require('./greet'); 
     greet.english();
     greet.spanish();
     
```
     

###  search for index.js or index.json file in greet folder by default 

but we can control this , all we need to do is add a package.json file in there and specify which file should be used to resolve this folder.
ex :
package.json in greet folder
{
  "name": "find-me-folder",
  "main": "start.js"
}

in app.js

var greet = require('./greet'); 

this will search for start.js file

.................................

# require.resolve

If you want to only resolve the module and not execute it, you can use the require.resolve function

This behaves exactly the same as the main require function, but does not load the file.
 It will still throw an error if the file does not exist and it will return the full path to the file when found.
 
 This can be used, for example, to check whether an optional package is installed or not and only use it when it’s available.
 
```javascript
> var c = require.resolve("./start");
console.log(c) ;
		
Output :e:\Course\.1- Udemy Learn and Understand NodeJS\code files\F11-Pipes\F11_Pipes\Finished\greet\start.js

> require.resolve('not-there');
Output :	Error: Cannot find module 'not-there'

```

.................................


# exports variable inside each module is just a reference to module.exports which manages the exported properties. When we reassign the exports variable, that reference is lost and we would be introducing a new variable instead of changing the module.exports object.
## Parent-child relation between files

## Require vs Readfile
require will read the file only once. Subsequent calls to require for the same file will return a cached copy. Not a good idea if you want to read a .json file that is continuously updated.
require is synchronous. If you have a very big JSON file, it will choke your event loop. You really need to use JSON.parse with fs.readFile.
http://stackoverflow.com/questions/5726729/how-to-parse-json-using-node-js?rq=1


 # circular modular dependency is allowed in Node.
 Partially loaded is used.
 
   	#loaded attribute on every module
	The module module uses the loaded attribute to track which modules have been loaded (true value) and which modules are still being loaded (false value).

.................................

### require.extensions 

require.extensions['.js'].toString();

require.extensions['.json'].toString();




................................................
# Requiring JSON files

config.json file:

{
  "host": "localhost",
  "port": 8080
}


const { host, port } = require('./config');  // no need to mention .json extension
console.log(`Server will run at http://${host}:${port}`);


........................................
### require.main

can be helpful to determine if the script is being required or run directly.

Say, for example, that we have this simple printInFrame function in print-in-frame.js:
// In print-in-frame.js

```javascript
const printInFrame = (size, header) => {
  console.log('*'.repeat(size));
  console.log(header);
  console.log('*'.repeat(size));
};
```

The function takes a numeric argument size and a string argument header and it prints that
header in a frame of stars controlled by the size we specify.

We want to use this file in two ways:
From the command line directly like this:

~/learn-node $ node print-in-frame 8 Hello

Passing 8 and Hello as command line arguments to print “Hello” in a frame of 8 stars.

2. With require. Assuming the required module will export the printInFrame function and we can just call it:

```javascript
const print = require('./print-in-frame');
print(5, 'Hey');

```


To print the header “Hey” in a frame of 5 stars.

Those are two different usages. We need a way to determine if the file is being run as a stand-alone script
or if it is being required by other scripts.

This is where we can use this simple if statement:

if (require.main === module) {
  // The file is being executed directly (not with require)
}
So we can use this condition to satisfy the usage requirements above by invoking the printInFrame function differently:
// In print-in-frame.js

```javascript
const printInFrame = (size, header) => {
  console.log('*'.repeat(size));
  console.log(header);
  console.log('*'.repeat(size));
};
if (require.main === module) {
  printInFrame(process.argv[2], process.argv[3]);
} else {
  module.exports = printInFrame;
}
```

When the file is not being required, we just call the printInFrame function with process.argv elements. Otherwise, we just change the module.exports object to be the printInFrame function itself.

..................................................
     
 # All modules will be cached
 
 
 doing require('./file');
 will load the file and run the code in it.
 
 
 require('./file');
 require('./file'); // won't load again.already cached
 
 we can see this cache by :
 
 put this code in file.js
 
 console.log(require.cache) 
 
 we can delete the cache entry 
 
 delete require.cache(value of cache path )
 
 ex :
 require('./greet');
delete require.cache[require.resolve('./greet')]
require('./greet');

 
 ........................................

index.js
	var c = "deen"
	//exports.variable = c;
	console.log(c);

app.js
	console.log(new Date().getSeconds());
	require('./index.js');  //load the index file
	console.log(new Date().getSeconds());

node app.js > deen 





.................................
