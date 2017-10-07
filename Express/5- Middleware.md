

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
