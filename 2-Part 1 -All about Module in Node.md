# How modules really works ?

## Step 1 : in Node module.js module
### require function takes a path :

#### greet.js

var greet = function() {
	console.log('Hello!');
};

module.exports = greet;

#### app.js

var greet = require('./greet'); //debugger , calls module.js
greet();

................
#### module.js

function makeRequireFunction(mod) {
  const Module = mod.constructor;

  function require(path) {  // path is "./greet"
    try {
      exports.requireDepth += 1;
      return mod.require(path);    //calls Module.require
    } finally {
      exports.requireDepth -= 1;
    }
  }

    
 ## Step 2:
 Module.require
 This function calls real require function : 
 
 Module.prototype.require = function(path) {
  assert(path, 'missing path');

## Step 3: Loading : return Module._load(path, this, /* isMain */ false);


Module.prototype.require = function(path) {
  assert(path, 'missing path');
  assert(typeof path === 'string', 'path must be a string');
  return Module._load(path, this, /* isMain */ false);
};

Module.load

## Step 4 : Module._load = function(request, parent, isMain) {
  if (parent) {
    debug('Module._load REQUEST %s parent: %s', request, parent.id);
  }
  
  ## Step 5 : caching 
  
  
  
  var cachedModule = Module._cache[filename];
  Module._load = function(request, parent, isMain) {
  // 1. Check Module._cache for the cached module.
  // 2. Create a new Module instance if cache is empty. //var module = new Module(filename, parent);
  // 3. Save it to the cache.
  // 4. Call module.load() with your the given filename.
  //    This will call module.compile() after reading the file contents.
  // 5. If there was an error loading/parsing the file,
  //    delete the bad module from the cache
  // 6. return module.exports
};
  
  ## Step 6 :Loading  : var extension = path.extname(filename) || '.js';
  
	  Module.prototype.load = function(filename) {
	  debug('load %j for module %j', filename, this.id);

	  assert(!this.loaded);
	  this.filename = filename;
	  this.paths = Module._nodeModulePaths(path.dirname(filename));

	  var extension = path.extname(filename) || '.js';
	  if (!Module._extensions[extension]) extension = '.js';
	  Module._extensions[extension](this, filename);
	  this.loaded = true;
	};
	
## Step 7 :Read the content of the file - var content = fs.readFileSync(filename, 'utf8');
		/ Native extension for .js
		Module._extensions['.js'] = function(module, filename) {
		  var content = fs.readFileSync(filename, 'utf8');
		  module._compile(internalModule.stripBOM(content), filename);
		};


## Step 8: Run the contents of the file
	var wrapper = Module.wrap(content);
	NativeModule.wrap = function(script) {
	  return NativeModule.wrapper[0] + script + NativeModule.wrapper[1];
	};

	NativeModule.wrapper = [
	  '(function (exports, require, module, __filename, __dirname) { ',
	  '\n});'
	];



## Run the contents in a IIFE 


### Once require is ready, the entire loaded source code is wrapped in a new function, which takes in require, module, exports, and all other exposed variables as arguments. This creates a new functional scope just for that module so that there is no pollution of the rest of the Node.js environment.

(function (exports, require, module, __filename, __dirname) {
  // YOUR CODE INJECTED HERE!
});


# Note :
[1] The module._compile method is only used for running JavaScript files. JSON files are simply parsed and returned via JSON.parse()


................................................................................

# every module object has id , exports , parent ,filename , loaded .. properties.

## When you require , this module object is created using below function constructor.So every module 

function Module(id, parent) {
  this.id = id;
  this.exports = {};
  this.parent = parent;
  // ...
var module = new Module(filename, parent);
.................................................................................
# Variables local to the module will be private, because the module is wrapped in a function by Node.js (see module wrapper).This function has arguments like __dirname , filename , exports - an empty object initially,module pointing to Module object, require.
#module.js
(function (exports, require, module, __filename, __dirname) {


#
The (.js) file extension is optional. Node.js will add it for you when attempting to load the file. It will also attempt to load the given module as a directory with an index file (index.js) or a package description (package.json).

#
module is an  empty obj .
module = {};
require returns a module.exports  , not "exports"

............................................................


# Resources :
1)Learn & understand node.js Tony alecia course
2)Samer byna :
  https://medium.freecodecamp.com/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8
3)Secrets of Javascript ninja : 
      chapter 5 "techniques for memoizing function" - essential for understanding "wrapping" and "caching" done by modules and require function
 
4) http://fredkschott.com/post/2014/06/require-and-the-module-system/
5) https://nodejs.org/api/modules.html













