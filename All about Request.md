
https://nodejs.org/api/http.html
https://expressjs.com/en/api.html


## Request QueryString

#### req.params
     http://localhost:3000/api/Books?genre=Science Fiction

#### "genre=Science Fiction" : is the queery string

#### req.baseUrl
The URL path on which a router instance was mounted.

#### req.body
Contains key-value pairs of data submitted in the request body. By default, it is undefined, 
and is populated when you use body-parsing middleware such as body-parser and multer.

#### req.cookies
When using cookie-parser middleware, this property is an object that contains cookies sent by the request. 
If the request contains no cookies, it defaults to {}.

#### req.path
Contains the path part of the request URL.

// example.com/users?sort=desc

#### req.path
// => "/users"

#### req.query
This property is an object containing a property for each query string parameter in the route. If there is no query string, it is the empty object, {}.

// GET /search?q=tobi+ferret
req.query.q
// => "tobi ferret"

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order
// => "desc"

req.query.shoe.color
// => "blue"

req.query.shoe.type






// => "converse"
