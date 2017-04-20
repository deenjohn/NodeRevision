

var express = require('express');

under express folder in node_module , there is a file called "index.js" which has :
     module.exports = require('./lib/express');
so , the actual express file is under ./lib/express which is under express folder


#express.js :

var express = require('express');
above code returns require('./lib/express'); which in turn return returns require('./lib/express'); which export:
 exports = module.exports = createApplication;
 createApplication is a function , not a function constructor 
 
  function createApplication() {
    var app = function(req, res, next) {
      app.handle(req, res, next);
    };

    mixin(app, EventEmitter.prototype, false);
    mixin(app, proto, false);

    // expose the prototype that will get set on requests
    app.request = Object.create(req, {
      app: { configurable: true, enumerable: true, writable: true, value: app }
    })

    // expose the prototype that will get set on responses
    app.response = Object.create(res, {
      app: { configurable: true, enumerable: true, writable: true, value: app }
    })

    app.init();
    return app;
  }
 
 
 
 
 
var app = express() ; 
//app.listen(3000);
var port = process.env.PORT || 3000;
app.listen(port);

...................................
#from application.js under express/lib

    app.listen = function listen() {
      var server = http.createServer(this);
      return server.listen.apply(server, arguments);
    };
.........................................

process.env.PORT : for production environment


.................
app.get('/', function(req, res) {
	res.send('<html><head></head><body><h1>Hello world!</h1></body></html>');
});

We are not setting the content-type but Express takes care of it.



#middleware
https://expressjs.com/en/guide/using-middleware.html

app.use('/assets', express.static(__dirname + '/public'));
Everytime we see  '/assets' , go find path : __dirname + '/public' and look for that file after '/assets' in this folder and stream it 

using middleware :

you must mention next() in middleware function


<link href=assets/style.css

app.get('/', function(req, res) {
	res.send('<html><head><link href=assets/style.css type=text/css rel=stylesheet /></head><body><h1>Hello world!</h1>'+req.baseUrl+'</body></html>');
});


..............................
var express = require('express')
var app = express()

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger) : this middleware is used for both '/' or '/api'


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/api', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000)

...............................
Middleware function requestTime

var express = require('express')
var app = express()

var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
})

app.listen(3000)
...............................

Middleware for specefic request :

app.use('/assets', express.static(__dirname + '/public'));
Above middleware is invoked only if '/assets' is invoked in url


app.use('/', function (req, res, next) {
	console.log('Request Url:' + req.url);
	next();
})

This middleware is for all request on root path '/'  ex :  '/' , '/api' etc


More than one callback function can handle a route (make sure you specify the next object). For example:

app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})

Reference : https://expressjs.com/en/guide/routing.html

An array of callback functions can handle a route. For example:

var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])









app.route()

You can create chainable route handlers for a route path by using app.route(). Because the path is specified at a single location,
creating modular routes is helpful, as is reducing redundancy and typos. For more information about routes, see: Router() documentation.

Here is an example of chained route handlers that are defined by using app.route().

app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })


express.Router
Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

The following example creates a router as a module, loads a middleware function in it, defines some routes, and mounts the router module on a path in the main app.

Create a router file named birds.js in the app directory, with the following content:

birds.js
        var express = require('express')
        var router = express.Router()

        // middleware that is specific to this router
        router.use(function timeLog (req, res, next) {
          console.log('Time: ', Date.now())
          next()
        })
        // define the home page route
        router.get('/', function (req, res) {
          res.send('Birds home page')
        })
        // define the about route
        router.get('/about', function (req, res) {
          res.send('About birds')
        })

        module.exports = router


Then, load the router module in the app:

var birds = require('./birds');
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;


app.use('/birds', birds); : this is '/birds' +'/'
app.listen(3000);


The app will now be able to handle requests to /birds and /birds/about, ex : http://localhost:3000/birds ,http://localhost:3000/birds/about

as well as call the timeLog middleware function that is specific to the route.

Note : if you use : app.use(birds) instead of app.use('/birds', birds),  then this will http://localhost:3000 (route to same path as http://localhost:3000/birds )




























Reference : https://expressjs.com/en/guide/routing.html




