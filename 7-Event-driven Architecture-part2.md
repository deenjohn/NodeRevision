const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
 
//myEmitter.on(events , listner)  this listner is pushed in the array associated with the name of event passed

myEmitter.emit('event');


.......................................................................

#Class: EventEmitter

The EventEmitter class is defined and exposed by the events module:

const EventEmitter = require('events') 

#Event: 'newListener'
The EventEmitter instance will emit its own 'newListener' event before a listener is added to its internal array of listeners.

#V imp : The fact that the event is triggered before adding the listener has a subtle but important "side effect":
any additional listeners registered to the same name within the 'newListener' callback will be inserted before the listener that is in the process of being added.

        const myEmitter = new MyEmitter();
           // Only do this once so we don't loop forever
        myEmitter.once('newListener', (event, listener) => {
          if (event === 'event') {  // only run if event name is 'event'
            // Insert a new listener in front
            myEmitter.on('event', () => {
              console.log('B');
            });
          }
        });
        
        myEmitter.on('event', () => {
          console.log('A');
        });
        myEmitter.emit('event');
# myEmitter.on : Returns a reference to the EventEmitter, so that calls can be chained        


#Event: 'removeListener'

#EventEmitter.defaultMaxListeners

By default, a maximum of 10 listeners can be registered for any single event.
To change it : emitter.setMaxListeners(emitter.getMaxListeners() + 1);

#emitter.eventNames()

#emitter.listenerCount(eventName)

#emitter.prependListener() 
  method can be used as an alternative to add the event listener to the beginning of the listeners array.


#emitter.once(eventName, listener)

Adds a one time listener function for the event named eventName.
The next time eventName is triggered, this listener is removed and then invoked.



#inheriting from EventEmitter
    var EventEmitter = require('events');
    var util = require('util');

    function Greetr() {
      this.greeting = 'Hello world!';
    }

    util.inherits(Greetr, EventEmitter);



#watch Learn and understand node.js section 5 , inheriting from event emitter videos

#util.inherits 
    util.inherits(Greetr, EventEmitter);
    only adds the properties on prototype of Eventemitter , 
    #util.js
    Object.setPrototypeOf(ctor.prototype, superCtor.prototype)
    not the properties on Eventemitter object.
    So you need to use  .call(this)  inside the function constructor of Greetr


 



