https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js

require function always returns module.exports

Setting module.exports allows the database_module function to be called like a function when required. Simply setting exports wouldn't allow the function to be exported because node exports the object module.exports references. The following code wouldn't allow the user to call the function.

module.js

The following won't work.

exports = nano = function database_module(cfg) {return;}
The following will work if module.exports is set.

module.exports = exports = nano = function database_module(cfg) {return;}
console

var func = require('./module.js');
// the following line will **work** with module.exports
func();
Basically node.js doesn't export the object that exports currently references, but exports the properties of what exports originally references. Although Node.js does export the object module.exports references, allowing you to call it like a function.

2nd least important reason

They set both module.exports and exports to ensure exports isn't referencing the prior exported object. By setting both you use exports as a shorthand and avoid potential bugs later on down the road.

Using exports.prop = true instead of module.exports.prop = true saves characters and avoids confusion.

................................


Basically the answer lies in what really happens when a module is required via require statement. 
Assuming this is the first time the module is being required.

For example:

var x = require('file1.js');
contents of file1.js:

module.exports = '123';
When the above statement is executed, a Module object is created. Its constructor function is:

function Module(id, parent) {
    this.id = id;
    this.exports = {};
    this.parent = parent;
    if (parent && parent.children) {
        parent.children.push(this);
    }

    this.filename = null;
    this.loaded = false;
    this.children = [];
}
As you see each module object has a property with name exports. This is what is eventually returned as part of require.

Next step of require is to wrap the contents of file1.js into an anonymous function like below:

(function (exports, require, module, __filename, __dirname) { 
    //contents from file1.js
    module.exports = '123;
});
And this anonymous function is invoked the following way, module here refers to the Module Object created earlier.

(function (exports, require, module, __filename, __dirname) { 
    //contents from file1.js
    module.exports = '123;
}) (module.exports,require, module, "path_to_file1.js","directory of the file1.js");
As we can see inside the function, exports formal argument refers to module.exports. 
In essence it's a convenience provided to the module programmer.

However this convenience need to be exercised with care. 
In any case if trying to assign a new object to exports ensure we do it this way.

exports = module.exports = {};
If we do it following way wrong way, module.exports will still be pointing to the object created as part of module instance.

exports = {};
As as result adding anything to the above exports object will have no effect to
module.exports object and nothing will be exported or returned as part of require.


















