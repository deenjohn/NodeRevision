# http://passportjs.org/docs

# http://stackoverflow.com/questions/16781294/passport-js-passport-initialize-middleware-not-in-use




npm install --save passport

npm install --save passport-local

var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var users = require("./data/users.json");
var _ = require("lodash");

passport.use(new LocalStrategy(function(username, password, done){
      /*if(username ==='deen' && password ==='test'){
        done(null, true);
        return;
      }
      */
  
  var user = _.find(users, u => u.name === username); //search in json file

  if(!user || user.password !== password){
    done(null, false);
    return;
  }

  done(null, user); //cache the user object for session 
}));

passport.serializeUser(function (user, done) {  
  done(null, user);  //serialize this object in session
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


..........................................
app.use(require('express-session')({
  secret: 'keyboard cat', resave: false, saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


























