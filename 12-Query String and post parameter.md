
http://localhost:3000/person/deen?qstr=123

     qstr=123 is the query string


# Bodyparser middleware to json data pasted or form posted.
(https://expressjs.com/en/resources/middleware/body-parser.html)

### npm install body-parser --save
var bodyParser = require('body-parser');
The bodyParser object exposes various factories to create middlewares. All middlewares will populate the req.body property with the parsed body, or an empty object ({}) if there was no body to parse (or an error was returned).


## bodyParser.urlencoded(options)
    var urlencodedParser = bodyParser.urlencoded({ extended: false });

## bodyParser.json()
    var jsonParser = bodyParser.json(); 
### parses json . A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
		```javascript
		app.post('/person', urlencodedParser, function(req, res) {
			res.send('Thank you!');
			console.log(req.body.firstname);
			console.log(req.body.lastname);
		});
		```


when it's http post and '/person' , then run urlencodedParser before the callback function 
req.body will be added by this middleware 

.....................................................
jsonParser

```javascript
app.post('/personjson', jsonParser, function(req, res) {
	res.send('Thank you for the JSON data!');
	console.log(req.body.firstname);
	console.log(req.body.lastname);
});
```



..........................................................


# User param :

```javascript
var express = require('express');
var app = express();

app.get('/blocks', function(req, res) {
  var blocks = ['Fixed', 'Movable', 'Rotating'];

  res.json(blocks);
});

app.listen(3000);
```


### This returns all the blocks.
  What if i want to limit this ?
### Limiting the number of Blocks returned

 #### app.js 
 
 ```javascript
var express = require('express');
var app = express();

app.get('/blocks', function(req, res) {
  var blocks = ['Fixed', 'Movable', 'Rotating'];

  
  if(req.query.limit > 0){
      
      res.json(blocks.slice(0 , req.query.limit) );

  }else{
    res.json(blocks);
  }
  
});

app.listen(3000);


http://localhost:3000/blocks?limit=1  Returns : ['Fixed']

 console.log(req.query) : 
     (limit= '1') 
     
```



# Dynamic routes

### ex : app.get('/blocks/:name' , callback);
:name makes it dynnamic routes
This also creates name property on request.params 





# Route parameters
Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.

```javascript
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }

```


To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.

```javascript
app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})
```


Since the hyphen (-) and the dot (.) are interpreted literally, they can be used along with route parameters for useful purposes.

```javascript
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }

```



# Response methods
The methods on the response object (res) in the following table can send a response to the client, and terminate the request-response cycle. If none of these methods are called from a route handler, the client request will be left hanging.

### Method	Description
res.download()	Prompt a file to be downloaded.
res.end()	End the response process.
res.json()	Send a JSON response.
res.jsonp()	Send a JSON response with JSONP support.
res.redirect()	Redirect a request.
res.render()	Render a view template.
res.send()	Send a response of various types.
res.sendFile()	Send a file as an octet stream.
res.sendStatus()	Set the response status code and send its string representation as the response body.


# Anatomy of an HTTP Transaction

###  Request object 









