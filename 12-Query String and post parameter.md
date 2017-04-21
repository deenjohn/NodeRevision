
http://localhost:3000/person/deen?qstr=123

qstr=123 is the query string


Bodyparser middleware to json data pasted or form posted.

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

app.post('/person', urlencodedParser, function(req, res) {
	res.send('Thank you!');
	console.log(req.body.firstname);
	console.log(req.body.lastname);
});

when it's http post and '/person' , then run urlencodedParser before the callback function 
req.body will be added by this middleware 

.....................................................
jsonParser

app.post('/personjson', jsonParser, function(req, res) {
	res.send('Thank you for the JSON data!');
	console.log(req.body.firstname);
	console.log(req.body.lastname);
});

..........................................................





















