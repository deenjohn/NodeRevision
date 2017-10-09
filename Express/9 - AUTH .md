http://passportjs.org/docs

```javascript
## app.js

  // (below line) Before asking Passport to authenticate a request, the strategy (or strategies) 
 // used by an application must be configured.
 
require("./passport-init");  //load passport-init.js file

app.use(passport.initialize());  // middleware to authenticate 
ap.use(passport.session());      // middleware to maintain session byw subsequent requests

var authRouter = require("./auth");
app.use(authRouter);

//all the requests are passed via this middleware

app.use(function(req, res, next) {
  if (req.isAuthenticated()) {       // req.isAuthenticated() is available only due to Passport
    res.locals.user = req.user;
    next();
    return;
  }
  res.redirect("/login");
});


## auth.js

var express = require("express");
var passport = require("passport");
var users = require("./data/users.json");
var _ = require("lodash");

var router = express.Router();
module.exports = router;

router.get("/login", function (req, res) {
  console.log('login');
  res.render("login");
});

.. the post request will be passed via passport.authenticate

router.post("/login", passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));



## passport-init.js

var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var users = require("./data/users.json");
var _ = require("lodash");

// The verify callback for local authentication accepts username and password arguments, 
// which are submitted to the application via a login form.

passport.use(new LocalStrategy(function(username, password, done){
  var user = _.find(users, u => u.name === username);

  if(!user || user.password !== password){
    done(null, false);
    return;
  }

  done(null, user);
}));

// session info is stored here

passport.serializeUser(function (user, done) {
  done(null, user);
});

// deseralize session info
passport.deserializeUser(function (user, done) {
  // after successfull authentication  , each subsequent request goes through this
  done(null, user);
});


```

You can prevent any non -admin to visit the admin route    

## admin.js

### app.js

var adminRouter = require("./admin");
app.use("/admin", adminRouter);

### admin.js

//allow only if request has admin property
//req.user.admin

router.use(function (req, res, next) {
  if (req.user.admin) {
    next();
    return;
  }
  res.redirect("/login");
});

### put "admin": true in users.json

 {
    "name": "test",
    "id": "44f885e8-87e9-4911-973c-4074188f408a",
    "password": "test",
    "admin": true
  }
  
  
  
  









