https://pugjs.org/language/attributes.html






var express = require('express');
var app = express();

# app.set to set the view engine template
	res.render to render the template
  

app.set('view engine', 'ejs'); // ejs is the file extension

## By default , Express look into views folder but we can change the default location by app.set like : 
app.set("views", "./views");
..................................

# person.ejs 
<html>
	<head>
		<link href="/assets/style.css" type="text/css" rel="stylesheet" />
	</head>
	<body>
  
		<h1>Person: <%= ID %> </h1>  // res.render('person', { ID: req.params.id })
	  
    //<%= ID %> is the data given to views
    
  </body>
</html>

app.get('/person/:id', function(req, res) {
	res.render('person', { ID: req.params.id });  // we render the template person.ejs 
});

localhost:3000/person/1
            // '/person/:id'
    ...............................
    
 
 # Jade
 
 ## Template Inheritance
 
 https://pugjs.org/language/inheritance.html
 
...........................................
 
 # Passing data to template 
 app.js
 
 app.get('/', function (req, res) {
    res.render("index", { title: "Home"});
});
 
 var rooms = require("./data/rooms.json");
 
 app.get('/admin/rooms', function (req, res) {
    res.render("rooms", {
        title: "Admin Rooms",
        rooms: rooms
    });
});
















