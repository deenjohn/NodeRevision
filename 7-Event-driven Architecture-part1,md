Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects
(called "emitters") periodically emit named events that cause Function objects ("listeners") to be called.

All objects that emit events are instances of the EventEmitter class
........................................................
#emitter.js

      function Emitter() {
        this.events = {};  // object
      }

      Emitter.prototype.on = function(type, listener) {
        this.events[type] = this.events[type] || [];  //objectName["property"]       //events[da] returns the array associated with this key
         //create a key of type as passed and value an empty array .Don't create this empty array if already created.
         events[type] returns the 
        this.events[type].push(listener);  //https://www.w3schools.com/jsref/jsref_push.asp
        // push the listner in the 
      }


      Emitter.prototype.emit = function(type) {
        if (this.events[type]) {
          this.events[type].forEach(function(listener) {
            listener();
          });
        }
      }

      module.exports = Emitter;


............................................
Above code explained with a simple example :
 var arr = {};
arr['da'] =[];
arr['da'].push(1);
arr['da'].push(2);

console.log(arr);
.......................................

References :
            Accessing JavaScript Properties
            The syntax for accessing the property of an object is:

            objectName.property          // person.age
            or

            objectName["property"]       // person["age"]
            or

            objectName[expression]       // x = "age"; person[x]
            The expression must evaluate to a property name.
