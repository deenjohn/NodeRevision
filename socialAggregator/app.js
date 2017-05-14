var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

var mongoose = require('mongoose')

// all routes

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var app = express();

var db = mongoose.connect('mongodb://localhost/socialAgg');

                          
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

//for images , css etc
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'anything'}));

require('./config/passport')(app); //module.exports = function (app) {

/*var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');*/

app.use('/', routes); //index.js for '/'
app.use('/users', users); //users.js for '/users'
app.use('/auth', auth); //auth.js for '/auth'

/// middlewares catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
