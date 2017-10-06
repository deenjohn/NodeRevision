
http://jade-lang.com/reference

```javascript

app.set("views", "./views");
app.set('view engine', 'jade');

```


One of the major benefit of using view engine is inheritance :

http://jade-lang.com/reference/inheritance

Two pages that have some common data , can share that common data via inheritance



```javascript

var express = require("express");
var app = express();
var rooms = require("./data/rooms.json");

app.set("views", "./views");
app.set('view engine', 'jade');

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));

app.get('/', function (req, res) {
    res.render("index", { title: "Home"});
});

app.get('/admin/rooms', function (req, res) {
    res.render("rooms", {
        title: "Admin Rooms",
        rooms: rooms
    });
});

app.listen(3000, function () {
    console.log('Chat app listening on port 3000!');
});




```

```javascript

GET : http://localhost:3000/

views 
   index.jade
   layout.jade
   rooms.jade
  
GET : http://localhost:3000/
app.set("views", "./views");
app.get('/', function (req, res) {
    res.render("index", { title: "Home"});
})

index.jade is rendered


GET : http://localhost:3000/admin/rooms

index.jade ,  has link : a(href='/admin/rooms') Chat Rooms

clicking on this link sends a GET request : http://localhost:3000/admin/rooms

app.get('/admin/rooms', function (req, res) {
    res.render("rooms", {
        title: "Admin Rooms",
        rooms: rooms
    });
});


```
















