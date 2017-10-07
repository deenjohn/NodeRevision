
https://expressjs.com/en/4x/api.html#router

### app.js

```javascript

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("views", "./views");               // set the views folder
app.set('view engine', 'jade');

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(bodyParser.urlencoded({ extended:   true }));

app.get('/', function (req, res) {
    res.render("index", { title: "Home"});
});


var adminRouter = require("./admin");                       //adminRouter in admin.js
app.use("/admin", adminRouter);



```



send all the request associated with '/admin' to adminRouter

 ### admin.js


```javascript

var uuid = require("node-uuid");
var _ = require("lodash");
var express = require("express");
var rooms = require("./data/rooms.json");

var router = express.Router();
module.exports = router;

router.get('/rooms', function (req, res) {
  res.render("rooms", {
    title: "Admin Rooms",
    rooms: rooms
  });
});

router.route('/rooms/add')               //You can create chainable route handlers for a route path by using router.route()
  .get(function (req, res) {
    res.render("add");
  })
  .post(function (req, res) {
    var room = {
      name: req.body.name,
      id: uuid.v4()
    };

    rooms.push(room);

    res.redirect(req.baseUrl + "/rooms");
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

```





