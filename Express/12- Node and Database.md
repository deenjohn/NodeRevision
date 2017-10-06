


MySql 

var mysql = require('mysql');

Use below middleware for '/' 

app.use('/', function (req, res, next) {
    console.log('Request Url:' + req.url);

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "codeschool"
    });

    con.query('SELECT *  FROM Movies',
      function(err, rows) {
        if(err) throw err;
        console.log(rows[0].Title);
      }
    );

    next();
});


.........................................................

Mongoose 


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://');
//mongodb://<dbuser>:<dbpassword>@ds157980.mlab.com:57980/addressnode

.................................
Mongo Schema 

var Schema = mongoose.Schema;

var personSchema = new Schema({
	firstname: String,
	lastname: String,
	address: String
});

var Person = mongoose.model('Person', personSchema);

var john = Person({
  firstname: 'John',
  lastname: 'Doe',
  address: '555 Main St.'
});

// save the user
john.save(function(err) {
  if (err) {
		console.log('got error');
		throw err;
	}
  console.log('person saved!');
});

var jane = Person({
  firstname: 'Jane',
  lastname: 'Doe',
  address: '555 Main St.'
});

// save the user
jane.save(function(err) {
  if (err) throw err;

  console.log('person saved!');
});

Apply below Middleware on '/'

app.use('/', function (req, res, next) {
	console.log('Request Url:' + req.url);
	
	// get all the users
	Person.find({}, function(err, users) {
		if (err) throw err;
		
		// object of all the users
		console.log(users);
	});
	
	next();
});














 
