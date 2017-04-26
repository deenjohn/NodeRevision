# App1
var express = require("express");
var app = express();

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));

app.listen(3000, function () {
    console.log('Chat app listening on port 3000!');
});


index.html
<ul class="nav navbar-nav">
                <li class="active"><a href="/">Home</a></li>
                <li><a href="/admin/rooms">Chat Rooms</a></li>
                <li><a href="/admin/users">Users</a></li>
            </ul>
            
            
http://localhost:3000/ 
Sends 3 request :
1 request for index.html in public folder 
2 request for bootstrap.css and style.css in node_modules/bootstrap/dist

note : <li class="active"><a href="/">Home</a></li> 
clicking on home will send a request to route '/' , which is handled by app.use(express.static("public"));


....................................................................

 

# App 2

var express = require("express");
var app = express();
var rooms = require("./data/rooms.json");

app.set("views", "./views");  
#### the directory where the template files are located.setting the default lookup folder for .jade files

app.set('view engine', 'jade');

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));

app.get('/', function (req, res) {
    res.render("index", { title: "Home"}); ### render the view 
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

......................................................

# App 3

var rooms = require("./data/rooms.json");

app.get('/', function (req, res) {
    res.render("index", { title: "Home"});
});

app.get('/admin/rooms', function (req, res) {
    res.render("rooms", {
        title: "Admin Rooms",
        rooms: rooms
    });
});

app.get('/admin/rooms/add', function (req, res) {
    res.render("add");
});

app.post('/admin/rooms/add', function (req, res) {
    var room = {
        name: req.body.name,
        id: uuid.v4()  //var uuid = require("node-uuid");
    };

    rooms.push(room);  //var rooms = require("./data/rooms.json");
   

    res.redirect("/admin/rooms");
});

app.get('/admin/rooms/edit/:id', function(req, res){
    var roomId = req.params.id;

    var room = _.find(rooms, r => r.id === roomId);
    if(!room){
        res.sendStatus(404);
        return;
    }

    res.render("edit", { room });
});

app.post('/admin/rooms/edit/:id', function (req, res) {
    var roomId = req.params.id;

    var room = _.find(rooms, r => r.id === roomId);
    if(!room){
        res.sendStatus(404);
        return;
    }

    room.name = req.body.name;

    res.redirect("/admin/rooms");
});

app.get('/admin/rooms/delete/:id', function(req, res){
    var roomId = req.params.id;

    rooms = rooms.filter(r => r.id !== roomId); 

    res.redirect("/admin/rooms");  // after adding the room , redirect to admin/rooms page
}); 



................................

# App4

router.js 

var uuid = require("node-uuid");
var _ = require("lodash");
var express = require("express");
var rooms = require("./data/rooms.json");

var router = express.Router();
module.exports = router;      ###export this module as router

router.get('/rooms', function (req, res) {
  res.render("rooms", {
    title: "Admin Rooms",
    rooms: rooms
  });
});

router.route('/rooms/add')
  .get(function (req, res) {
    res.render("add");
  })
  .post(function (req, res) {
    var room = {
      name: req.body.name,
      id: uuid.v4()
    };

    rooms.push(room);

    res.redirect(req.baseUrl + "/rooms");  #### req.baseUrl is '/admin' . we can also use  res.redirect('.'); . is root dir which is /rooms/add
  });

router.route('/rooms/edit/:id')
  .get(function (req, res) {
    var roomId = req.params.id;

    var room = _.find(rooms, r => r.id === roomId);
    if (!room) {
      res.sendStatus(404);
      return;
    }

    res.render("edit", {room});
  })
  .post(function (req, res) {
    var roomId = req.params.id;

    var room = _.find(rooms, r => r.id === roomId);
    if (!room) {
      res.sendStatus(404);
      return;
    }

    room.name = req.body.name;

    res.redirect(req.baseUrl + "/rooms");
  });

router.get('/rooms/delete/:id', function (req, res) {
  var roomId = req.params.id;

  rooms = rooms.filter(r => r.id !== roomId);

  res.redirect(req.baseUrl + "/rooms");
});

.........................................

# App 5














