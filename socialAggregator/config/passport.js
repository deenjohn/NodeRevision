var passport = require('passport');


module.exports = function (app) {

    console.log("config/passport.js")

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user)
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    
    require('./strategies/google.strategy')();
    require('./strategies/twitter.strategy')();
    require('./strategies/facebook.strategy')();

};