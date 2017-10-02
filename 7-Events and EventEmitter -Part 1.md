### app.js

```javascript
var Emitter = require('./emitter');

var emtr = new Emitter();

emtr.on('greet', function() {
	console.log('Somewhere, someone said hello.');
});

emtr.on('greet', function() {
	console.log('A greeting occurred!');
});

console.log('Hello!');
emtr.emit('greet');         // emit event 
 
```
.................
Emitter.js

```javascript

function Emitter() {
	this.events = {};
}

Emitter.prototype.on = function(type, listener) {
	this.events[type] = this.events[type] || [];     //create an array if not exist yet
	this.events[type].push(listener);
}

Emitter.prototype.emit = function(type) {
	if (this.events[type]) {
		this.events[type].forEach(function(listener) {      //run each listner for this event type
			listener();
		});
	}
}

module.exports = Emitter;

```
