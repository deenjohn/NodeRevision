

https://expressjs.com/en/guide/using-middleware.html
https://expressjs.com/en/api.html#res.locals

# Request is passthrough every middleware , ( app.use ) ,  until it is responsed back with response.


GET :http://localhost:3000/

This GET request is passed to every middleware until response came back

```javascript


var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
require("./passport-init");

app.set("views", "./views");
app.set("view engine", "jade");

app.use(require("./logging.js"));   // can you serve this GET :http://localhost:3000/ ? No 

app.use(express.static("public"));    // can you serve this GET :http://localhost:3000/ ? No 
app.use(express.static("node_modules/bootstrap/dist"));  // can you serve this GET :http://localhost:3000/ ? No 
app.use(express.static("node_modules/jquery/dist"));  // can you serve this GET :http://localhost:3000/ ? No 

app.use(function(req, res, next) {    // can you serve this GET :http://localhost:3000/ ? No 
    console.log('req.user1 ',req.user);
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));   // can you serve this GET :http://localhost:3000/ ? No 
app.use(bodyParser.json());

app.use(function(req, res, next) {     // can you serve this GET :http://localhost:3000/ ? No 
    console.log('req.user2 ',req.user);
    next();
});

app.use(                             // can you serve this GET :http://localhost:3000/ ? No 
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());    // can you serve this GET :http://localhost:3000/ ? No 
app.use(passport.session());       // can you serve this GET :http://localhost:3000/ ? No 

app.use(function(req, res, next) {     // can you serve this GET :http://localhost:3000/ ? No 
    console.log('req.user3 ',req.user);
    next();
});

var authRouter = require("./auth");    // can you serve this GET :http://localhost:3000/ ? Yes 

                 In auth.js >   router.get("/login", function (req, res) {
                    console.log('login');
                    res.render("login");   // stop , no request forwarding to any other middleware 
                                           // login page is served
                  });
                  

app.use(authRouter);

app.use(function(req, res, next) {
  if (req.isAuthenticated()) {
      console.log('req.user req.isAuthenticated() ',req.user);
    res.locals.user = req.user;
    next();
    return;
  }
  console.log('redirect to login');
  res.redirect("/login");
});

app.use(function(req, res, next) {
    console.log('req.user4 ',req.user);
    next();
});
app.get("/", function(req, res) {
    console.log(req.user);
  res.render("home", { title: "Home" });
});

var adminRouter = require("./admin");
app.use("/admin", adminRouter);

var apiRouter = require("./api");
app.use("/api", apiRouter);

app.use(function(req, res, next) {
    console.log('req.user5 ',req.user);
    next();
});

app.listen(3000, function() {
  console.log("Chat app listening on port 3000!");
});


```



```javascript


router.route('/rooms/edit/:id')
  .all(function(req, res, next){   // this middleware runs for all GET , POST request at this url /rooms/edit/:id
    var roomId = req.params.id;

    var room = _.find(rooms, r => r.id === roomId);
    if (!room) {
      res.sendStatus(404);
      return;
    }
    res.locals.room = room;
    next()
  })
  .get(function (req, res) {
    res.render("edit");             // here you forward the room object which was set via 'res.locals.room' to edit.jade
  })
  .post(function (req, res) {
    res.locals.room.name = req.body.name;

    res.redirect(req.baseUrl + "/rooms");
  });

```


## A middleware flows 

```javascript

app.use("/admin", function(req, res, next) {
  console.log("admin request");
  //  res.send("admin room");        // next() won't be called as request is terminated by responding 
  next();                        // if req is not terminated and next() is not called , 
                                 // then browser will keep spinning 
});


```

#### As the request came for http://localhost:3000/admin/rooms which is not responded back by above middleware ,
this request should be forwarded to other middleware like below 'adminRouter'

app.use("/admin", adminRouter); 

 

## Error handler middleware :

1) by sending 404 
2) by using next("oh no room found");
3) by using sending stack trace (use in production mode only) : next(new Error())


```javascript

.route("/rooms/edit/:id")
  .all(function(req, res, next) {
    var roomId = req.params.id;

    var room = _.find(rooms, r => r.id === roomId);
    if (!room) {
      //res.sendStatus(404);
      //or
      next("oh no room found");
      return;
    }
    res.locals.room = room;
    next();
  })

```








