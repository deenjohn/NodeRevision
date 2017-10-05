





# inside ""greet" folder there are 3 files : english.js , spanish.js , index.js

   ## english.js 
      
      ```javascript

   var greet = function() {
             console.log("hello");
         }

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
     

### // search for index.js or index.json file in greet folder by default 
but we can control this , all we need to do is add a package.json file in there and specify which file should be used to resolve this folder.
ex : learn-node $ echo '{ "name": "greet", "main": "start.js" }' > node_modules/find-me/package.json

.................................

# require.resolve

This behaves exactly the same as the main require function, but does not load the file.

```javascript
> require.resolve('find-me');
		
Output :	'/Users/samer/learn-node/node_modules/find-me/start.js'

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

require.extensions 

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


 
     
 # All modules will be cached
 doing require('file'); will load the file and run the code in it.
 

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
