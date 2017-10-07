

https://expressjs.com/en/guide/using-middleware.html
https://expressjs.com/en/api.html#res.locals

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








